/** Verify the actual encoded container, not ExifReader's derived file properties. */
export function verifyCleanOutput(bytes: Uint8Array, mime: string): void {
	const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
	const tag = (start: number, len = 4) =>
		String.fromCharCode(...bytes.subarray(start, start + len));
	const fail = (): never => {
		throw new Error(
			'Could not verify that all embedded metadata was removed.',
		);
	};
	if (mime === 'image/png') {
		if (
			bytes.length < 20 ||
			![137, 80, 78, 71, 13, 10, 26, 10].every((v, i) => bytes[i] === v)
		)
			fail();
		const allowed = new Set(['IHDR', 'PLTE', 'IDAT', 'IEND', 'tRNS']);
		let offset = 8;
		let finished = false;
		while (offset + 12 <= bytes.length) {
			const size = view.getUint32(offset, false);
			const name = tag(offset + 4);
			const end = offset + 12 + size;
			if (!allowed.has(name) || end > bytes.length) fail();
			offset = end;
			if (name === 'IEND') {
				finished = true;
				break;
			}
		}
		if (!finished || offset !== bytes.length) fail();
		return;
	}
	if (mime === 'image/webp') {
		if (
			bytes.length < 20 ||
			tag(0) !== 'RIFF' ||
			tag(8) !== 'WEBP' ||
			view.getUint32(4, true) + 8 !== bytes.length
		)
			fail();
		const allowed = new Set([
			'VP8 ',
			'VP8L',
			'VP8X',
			'ALPH',
			'ANIM',
			'ANMF',
		]);
		let offset = 12;
		while (offset + 8 <= bytes.length) {
			const name = tag(offset);
			const size = view.getUint32(offset + 4, true);
			const end = offset + 8 + size + (size & 1);
			if (!allowed.has(name) || end > bytes.length) fail();
			if (
				name === 'VP8X' &&
				(size < 10 || (bytes[offset + 8] & (0x20 | 0x08 | 0x04)) !== 0)
			)
				fail();
			offset = end;
		}
		if (offset !== bytes.length) fail();
		return;
	}
	if (mime === 'image/jpeg') {
		if (bytes.length < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8) fail();
		let offset = 2;
		while (offset < bytes.length) {
			if (bytes[offset++] !== 0xff) fail();
			while (bytes[offset] === 0xff) offset++;
			const marker = bytes[offset++];
			if (marker === 0xda) return; // Entropy-coded scan follows, already preserved by stripper.
			if (marker === 0xd9) return;
			if (
				marker === undefined ||
				marker === 0xfe ||
				(marker >= 0xe0 && marker <= 0xef)
			)
				fail();
			if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
			if (offset + 2 > bytes.length) fail();
			const length = (bytes[offset] << 8) | bytes[offset + 1];
			if (length < 2 || offset + length > bytes.length) fail();
			offset += length;
		}
		fail();
	}
	fail();
}
