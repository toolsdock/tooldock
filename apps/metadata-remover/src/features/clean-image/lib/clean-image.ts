import type {
	OutputFormat,
	ProcessedImage,
} from '@/entities/image/model/types';
import { inspectMetadata } from './inspect-metadata';
import { stripEmbeddedMetadata } from './strip-embedded-metadata';
import { verifyCleanOutput } from './verify-clean-output';
import {
	ACCEPTED_TYPES,
	MAX_FILE_SIZE,
	outputFilename,
} from '@/shared/lib/files';
/** Re-encodes pixels in the browser; it does not preserve the original compressed bytes. */
export async function cleanImage(file: File): Promise<ProcessedImage> {
	if (!ACCEPTED_TYPES.includes(file.type as OutputFormat))
		throw new Error('Please select a JPG, PNG or WebP image.');
	if (file.size > MAX_FILE_SIZE)
		throw new Error('The maximum file size is 20 MB.');
	const before = await inspectMetadata(file);
	let bitmap: ImageBitmap | null = null;
	try {
		bitmap = await createImageBitmap(file, {
			imageOrientation: 'from-image',
		});
		if (bitmap.width * bitmap.height > 50_000_000)
			throw new Error('Image dimensions are too large for this browser.');
		const canvas = document.createElement('canvas');
		canvas.width = bitmap.width;
		canvas.height = bitmap.height;
		const context = canvas.getContext('2d');
		if (!context) throw new Error('Could not initialize image processing.');
		if (file.type === 'image/jpeg') {
			context.fillStyle = '#ffffff';
			context.fillRect(0, 0, canvas.width, canvas.height);
		}
		context.drawImage(bitmap, 0, 0);
		const mime = file.type as OutputFormat;
		const blob = await new Promise<Blob>((resolve, reject) =>
			canvas.toBlob(
				(value) =>
					value
						? resolve(value)
						: reject(new Error('Image export failed.')),
				mime,
				mime === 'image/jpeg' || mime === 'image/webp'
					? 0.92
					: undefined,
			),
		);
		if (blob.type !== mime)
			throw new Error(
				'This browser does not support exporting this format.',
			);
		const bytes = stripEmbeddedMetadata(
			new Uint8Array(await blob.arrayBuffer()),
			mime,
		);
		verifyCleanOutput(bytes, mime);
		const cleanedBlob = new Blob([Uint8Array.from(bytes)], { type: mime });
		const after = await inspectMetadata(cleanedBlob);
		if (after.warning)
			throw new Error(
				'Could not inspect the cleaned image. The image was not exported.',
			);
		// ExifReader also derives informational tags from pixel headers (especially PNG/WebP).
		// The strict binary container allowlist above establishes that no metadata chunks remain.
		// Treat any remaining parser-derived fields as file properties, not embedded metadata.
		after.properties.push(...after.entries);
		after.entries = [];
		return {
			name: outputFilename(file.name, mime),
			originalSize: file.size,
			outputSize: cleanedBlob.size,
			blob: cleanedBlob,
			url: URL.createObjectURL(cleanedBlob),
			before,
			after,
		};
	} finally {
		bitmap?.close();
	}
}
