/** Remove ancillary metadata from browser-encoded images without changing pixel payloads. */
export function stripEmbeddedMetadata(
	data: Uint8Array,
	mime: string,
): Uint8Array {
	if (mime === 'image/jpeg') return stripJpeg(data);
	if (mime === 'image/png') return stripPng(data);
	if (mime === 'image/webp') return stripWebp(data);
	throw new Error('Unsupported output format.');
}
const read32 = (v: DataView, n: number) => v.getUint32(n, false);
const le32 = (v: DataView, n: number) => v.getUint32(n, true);
const ascii = (b: Uint8Array, a: number, z: number) =>
	String.fromCharCode(...b.subarray(a, z));
function join(parts: Uint8Array[]): Uint8Array {
	const result = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
	let offset = 0;
	for (const part of parts) {
		result.set(part, offset);
		offset += part.length;
	}
	return result;
}
function stripJpeg(b: Uint8Array): Uint8Array {
	if (b.length < 4 || b[0] !== 0xff || b[1] !== 0xd8)
		throw new Error('Invalid JPEG output.');
	const parts = [b.subarray(0, 2)];
	let i = 2;
	while (i < b.length) {
		const start = i;
		if (b[i++] !== 0xff) throw new Error('Invalid JPEG marker.');
		while (b[i] === 0xff) i++;
		const marker = b[i++];
		if (marker === undefined) throw new Error('Truncated JPEG marker.');
		if (marker === 0xda) {
			// SOS: entropy-coded scan follows; copy the remainder unchanged.
			if (i + 2 > b.length) throw new Error('Truncated JPEG scan.');
			parts.push(b.subarray(start));
			return join(parts);
		}
		if (marker === 0xd9) {
			parts.push(b.subarray(start, i));
			return join(parts);
		}
		if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
			parts.push(b.subarray(start, i));
			continue;
		}
		if (i + 2 > b.length) throw new Error('Truncated JPEG segment.');
		const length = (b[i] << 8) | b[i + 1];
		if (length < 2 || i + length > b.length)
			throw new Error('Invalid JPEG segment length.');
		i += length;
		// APP0..APP15 and COM may contain EXIF, ICC, XMP, IPTC, JFIF or other metadata.
		if (!((marker >= 0xe0 && marker <= 0xef) || marker === 0xfe))
			parts.push(b.subarray(start, i));
	}
	throw new Error('Incomplete JPEG output.');
}
function stripPng(b: Uint8Array): Uint8Array {
	const sig = [137, 80, 78, 71, 13, 10, 26, 10];
	if (!sig.every((v, i) => b[i] === v))
		throw new Error('Invalid PNG output.');
	const v = new DataView(b.buffer, b.byteOffset, b.byteLength);
	const parts = [b.subarray(0, 8)];
	let i = 8;
	let ended = false;
	const keep = new Set(['IHDR', 'PLTE', 'IDAT', 'IEND', 'tRNS']);
	while (i + 12 <= b.length) {
		const size = read32(v, i),
			type = ascii(b, i + 4, i + 8),
			end = i + 12 + size;
		if (end > b.length) throw new Error('Invalid PNG chunk.');
		if (keep.has(type)) parts.push(b.subarray(i, end));
		else if (type.charCodeAt(0) >= 65 && type.charCodeAt(0) <= 90)
			throw new Error(`Unsupported critical PNG chunk: ${type}`);
		i = end;
		if (type === 'IEND') {
			ended = true;
			break;
		}
	}
	if (!ended) throw new Error('Incomplete PNG output.');
	return join(parts);
}
function stripWebp(b: Uint8Array): Uint8Array {
	if (
		b.length < 20 ||
		ascii(b, 0, 4) !== 'RIFF' ||
		ascii(b, 8, 12) !== 'WEBP'
	)
		throw new Error('Invalid WebP output.');
	const v = new DataView(b.buffer, b.byteOffset, b.byteLength);
	if (le32(v, 4) + 8 !== b.length) throw new Error('Invalid WebP length.');
	const parts: Uint8Array[] = [b.subarray(0, 12)];
	let i = 12;
	while (i + 8 <= b.length) {
		const type = ascii(b, i, i + 4),
			size = le32(v, i + 4),
			end = i + 8 + size + (size & 1);
		if (end > b.length) throw new Error('Invalid WebP chunk.');
		if (type === 'VP8X') {
			if (size < 10) throw new Error('Invalid WebP extended header.');
			const copy = b.slice(i, end);
			copy[8] &= ~(0x20 | 0x08 | 0x04); // ICC, EXIF, XMP flags
			parts.push(copy);
		} else if (type !== 'ICCP' && type !== 'EXIF' && type !== 'XMP ') {
			parts.push(b.subarray(i, end));
		}
		i = end;
	}
	if (i !== b.length) throw new Error('Incomplete WebP output.');
	const output = join(parts);
	new DataView(output.buffer).setUint32(4, output.length - 8, true);
	return output;
}
