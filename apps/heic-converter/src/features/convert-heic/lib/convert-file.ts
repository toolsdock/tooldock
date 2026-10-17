import type { OutputFormat } from '@/entities/conversion/model/types';
export async function convertFile(
	file: File,
	format: OutputFormat,
	quality: number,
): Promise<Blob> {
	const { default: heic2any } = await import('heic2any');
	const result = await heic2any({
		blob: file,
		toType: `image/${format}`,
		quality: quality / 100,
	});
	if (Array.isArray(result) && result.length !== 1)
		throw new Error(
			'Multi-image HEIC is not supported. Please choose a single-photo HEIC.',
		);
	const blob = Array.isArray(result) ? result[0] : result;
	if (!blob || blob.size === 0)
		throw new Error('The converter returned an empty image.');
	if (blob.type !== `image/${format}`)
		throw new Error('Unexpected output format.');
	const bitmap = await createImageBitmap(blob).catch(() => {
		throw new Error('Converted image could not be decoded.');
	});
	try {
		if (!bitmap.width || !bitmap.height)
			throw new Error('Converted image has invalid dimensions.');
	} finally {
		bitmap.close();
	}
	return blob;
}
