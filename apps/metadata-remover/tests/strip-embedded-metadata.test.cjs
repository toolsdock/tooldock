const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const ts = (() => {
	try {
		return require('typescript');
	} catch {
		return require('/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript');
	}
})();
const source = fs.readFileSync(
	path.join(
		__dirname,
		'../src/features/clean-image/lib/strip-embedded-metadata.ts',
	),
	'utf8',
);
const js = ts.transpileModule(source, {
	compilerOptions: {
		module: ts.ModuleKind.CommonJS,
		target: ts.ScriptTarget.ES2020,
	},
}).outputText;
const moduleObj = { exports: {} };
new Function('module', 'exports', js)(moduleObj, moduleObj.exports);
const { stripEmbeddedMetadata: strip } = moduleObj.exports;
function pngChunk(type, data = Buffer.alloc(0)) {
	const header = Buffer.alloc(8);
	header.writeUInt32BE(data.length);
	header.write(type, 4, 'ascii');
	return Buffer.concat([header, data, Buffer.alloc(4)]);
}
function riffChunk(type, data) {
	const h = Buffer.alloc(8);
	h.write(type, 0, 'ascii');
	h.writeUInt32LE(data.length, 4);
	return Buffer.concat([
		h,
		data,
		data.length % 2 ? Buffer.alloc(1) : Buffer.alloc(0),
	]);
}
test('JPEG strips APP1 EXIF, APP2 ICC and COM, keeps scan', () => {
	const jpeg = Buffer.from([
		255, 216, 255, 225, 0, 4, 1, 2, 255, 226, 0, 4, 3, 4, 255, 254, 0, 4, 5,
		6, 255, 218, 0, 2, 11, 12, 255, 217,
	]);
	const out = strip(jpeg, 'image/jpeg');
	assert.deepEqual(
		Buffer.from(out),
		Buffer.from([255, 216, 255, 218, 0, 2, 11, 12, 255, 217]),
	);
});
test('PNG strips textual and ICC chunks, preserves pixel chunks', () => {
	const input = Buffer.concat([
		Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
		pngChunk('IHDR'),
		pngChunk('tEXt', Buffer.from('Author')),
		pngChunk('iCCP', Buffer.from('Google')),
		pngChunk('IDAT', Buffer.from([1, 2])),
		pngChunk('IEND'),
	]);
	const out = Buffer.from(strip(input, 'image/png'));
	assert.ok(!out.includes(Buffer.from('Author')));
	assert.ok(!out.includes(Buffer.from('Google')));
	assert.ok(out.includes(Buffer.from('IDAT')));
});
test('WebP strips EXIF ICC XMP and updates RIFF and VP8X flags', () => {
	const vp8x = Buffer.alloc(10);
	vp8x[0] = 0x2c;
	const payload = Buffer.concat([
		riffChunk('VP8X', vp8x),
		riffChunk('EXIF', Buffer.from('gps')),
		riffChunk('ICCP', Buffer.from('Google')),
		riffChunk('XMP ', Buffer.from('name')),
		riffChunk('VP8 ', Buffer.from([1, 2])),
	]);
	const head = Buffer.alloc(12);
	head.write('RIFF');
	head.writeUInt32LE(payload.length + 4, 4);
	head.write('WEBP', 8);
	const out = Buffer.from(
		strip(Buffer.concat([head, payload]), 'image/webp'),
	);
	assert.equal(out.readUInt32LE(4) + 8, out.length);
	assert.equal(out[20] & 0x2c, 0);
	assert.ok(!out.includes(Buffer.from('gps')));
	assert.ok(!out.includes(Buffer.from('Google')));
	assert.ok(out.includes(Buffer.from('VP8 ')));
});
test('Malformed data is rejected', () => {
	assert.throws(() => strip(Buffer.from([1, 2, 3]), 'image/jpeg'));
});
