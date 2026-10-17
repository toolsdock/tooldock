'use client';

import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import type { ConversionSettings } from '@/entities/audio/model/types';
import { FFMPEG_CORE_URL } from '@/shared/config/site';
import { fileExtension, fileStem } from '@/shared/lib/file-name';
import { buildConversionArgs, getFormatInfo } from './conversion-config';

let ffmpegPromise: Promise<FFmpeg> | null = null;

async function createFFmpeg(): Promise<FFmpeg> {
	const ffmpeg = new FFmpeg();
	await ffmpeg.load({
		coreURL: await toBlobURL(
			`${FFMPEG_CORE_URL}/ffmpeg-core.js`,
			'text/javascript',
		),
		wasmURL: await toBlobURL(
			`${FFMPEG_CORE_URL}/ffmpeg-core.wasm`,
			'application/wasm',
		),
	});
	return ffmpeg;
}

export async function getFFmpeg(): Promise<FFmpeg> {
	if (!ffmpegPromise) {
		ffmpegPromise = createFFmpeg().catch((error) => {
			ffmpegPromise = null;
			throw error;
		});
	}
	return ffmpegPromise;
}

export async function convertAudioFile(
	ffmpeg: FFmpeg,
	file: File,
	settings: ConversionSettings,
	token: string,
): Promise<{ blob: Blob; name: string }> {
	const sourceExtension = fileExtension(file.name);
	const format = getFormatInfo(settings.format);
	const inputName = `input-${token}.${sourceExtension}`;
	const outputName = `output-${token}.${format.extension}`;

	try {
		await ffmpeg.writeFile(inputName, await fetchFile(file));
		const exitCode = await ffmpeg.exec(
			buildConversionArgs(inputName, outputName, settings),
		);
		if (exitCode !== 0)
			throw new Error(`FFmpeg exited with code ${exitCode}`);

		const data = await ffmpeg.readFile(outputName);
		if (typeof data === 'string')
			throw new Error('Unexpected text output from converter');

		const bytes = new Uint8Array(data);
		if (bytes.byteLength === 0)
			throw new Error('Converter created an empty file');

		const blob = new Blob([bytes], { type: format.mimeType });
		return { blob, name: `${fileStem(file.name)}.${format.extension}` };
	} finally {
		await Promise.allSettled([
			ffmpeg.deleteFile(inputName),
			ffmpeg.deleteFile(outputName),
		]);
	}
}
