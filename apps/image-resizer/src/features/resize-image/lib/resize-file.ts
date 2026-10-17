import type { ResizeOptions } from '@/entities/image/model/types';

export function calculateTargetSize(
	width: number,
	height: number,
	options: ResizeOptions,
) {
	if (
		!Number.isSafeInteger(width) ||
		!Number.isSafeInteger(height) ||
		width <= 0 ||
		height <= 0
	) {
		throw new Error('Invalid source dimensions.');
	}
	const values = [options.width, options.height, options.percent];
	if (values.some((value) => !Number.isFinite(value) || value <= 0)) {
		throw new Error('Enter valid positive resize settings.');
	}
	let scale: number;
	switch (options.mode) {
		case 'width':
			scale = options.width / width;
			break;
		case 'height':
			scale = options.height / height;
			break;
		case 'percent':
			scale = options.percent / 100;
			break;
		case 'both':
			scale = Math.min(options.width / width, options.height / height);
			break;
	}
	if (!options.allowUpscale) scale = Math.min(scale, 1);
	if (!Number.isFinite(scale) || scale <= 0)
		throw new Error('Invalid target dimensions.');
	const target = {
		width: Math.max(1, Math.round(width * scale)),
		height: Math.max(1, Math.round(height * scale)),
	};
	if (
		target.width > 16384 ||
		target.height > 16384 ||
		target.width * target.height > 45_000_000
	) {
		throw new Error('Output dimensions exceed the safe browser limit.');
	}
	return target;
}

function encode(
	canvas: HTMLCanvasElement,
	format: ResizeOptions['format'],
	quality: number,
): Promise<Blob> {
	return new Promise((resolve, reject) => {
		canvas.toBlob(
			(blob) =>
				blob
					? resolve(blob)
					: reject(new Error('Image encoding failed.')),
			format,
			quality / 100,
		);
	});
}

/** Draw in stages when shrinking by more than half to reduce aliasing. */
function drawResampled(
	bitmap: ImageBitmap,
	width: number,
	height: number,
	format: ResizeOptions['format'],
) {
	let source: CanvasImageSource = bitmap;
	let sourceWidth = bitmap.width;
	let sourceHeight = bitmap.height;
	while (sourceWidth / width > 2 || sourceHeight / height > 2) {
		const nextWidth = Math.max(width, Math.ceil(sourceWidth / 2));
		const nextHeight = Math.max(height, Math.ceil(sourceHeight / 2));
		const stage = document.createElement('canvas');
		stage.width = nextWidth;
		stage.height = nextHeight;
		const context = stage.getContext('2d');
		if (!context) throw new Error('Canvas is not supported.');
		context.imageSmoothingEnabled = true;
		context.imageSmoothingQuality = 'high';
		context.drawImage(source, 0, 0, nextWidth, nextHeight);
		source = stage;
		sourceWidth = nextWidth;
		sourceHeight = nextHeight;
	}
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	const context = canvas.getContext('2d');
	if (!context) throw new Error('Canvas is not supported.');
	context.imageSmoothingEnabled = true;
	context.imageSmoothingQuality = 'high';
	if (format === 'image/jpeg') {
		context.fillStyle = '#ffffff';
		context.fillRect(0, 0, width, height);
	}
	context.drawImage(source, 0, 0, width, height);
	return canvas;
}

export async function resizeFile(
	file: File,
	options: ResizeOptions,
): Promise<{ blob: Blob; dimensions: { width: number; height: number } }> {
	const bitmap = await createImageBitmap(file, {
		imageOrientation: 'from-image',
	});
	try {
		const dimensions = calculateTargetSize(
			bitmap.width,
			bitmap.height,
			options,
		);
		const canvas = drawResampled(
			bitmap,
			dimensions.width,
			dimensions.height,
			options.format,
		);
		const blob = await encode(canvas, options.format, options.quality);
		if (blob.size === 0 || blob.type !== options.format)
			throw new Error('Browser did not encode the requested format.');
		let decoded: ImageBitmap;
		try {
			decoded = await createImageBitmap(blob);
		} catch {
			throw new Error('The exported image could not be decoded.');
		}
		try {
			if (
				decoded.width !== dimensions.width ||
				decoded.height !== dimensions.height
			) {
				throw new Error(
					'Exported image dimensions do not match the requested size.',
				);
			}
		} finally {
			decoded.close();
		}
		return { blob, dimensions };
	} finally {
		bitmap.close();
	}
}
