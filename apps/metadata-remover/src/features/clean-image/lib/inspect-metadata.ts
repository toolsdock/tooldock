import ExifReader from 'exifreader';
import type {
	MetadataEntry,
	MetadataReport,
} from '@/entities/image/model/types';

const FILE_PROPERTIES = new Set([
	'FileType',
	'FileTypeExtension',
	'MIMEType',
	'Image Width',
	'Image Height',
	'ImageWidth',
	'ImageHeight',
	'Color Components',
	'Bits Per Sample',
	'Subsampling',
	'EncodingProcess',
	'SamplesPerPixel',
]);
const STRUCTURAL_GROUPS = new Set(['FILE']);
/** ExifReader can report file characteristics and embedded tags in the same response. */
export async function inspectMetadata(file: Blob): Promise<MetadataReport> {
	try {
		const tags = await ExifReader.load(await file.arrayBuffer(), {
			expanded: true,
		});
		const entries: MetadataEntry[] = [];
		const properties: MetadataEntry[] = [];
		for (const [group, values] of Object.entries(tags)) {
			if (!values || typeof values !== 'object') continue;
			for (const [key, raw] of Object.entries(values)) {
				if (raw === undefined || raw === null) continue;
				const value = readableValue(raw);
				if (!value) continue;
				const entry = { group: group.toUpperCase(), key, value };
				(STRUCTURAL_GROUPS.has(entry.group) || FILE_PROPERTIES.has(key)
					? properties
					: entries
				).push(entry);
			}
		}
		const sort = (a: MetadataEntry, b: MetadataEntry) =>
			a.group.localeCompare(b.group) || a.key.localeCompare(b.key);
		return {
			entries: entries.sort(sort),
			properties: properties.sort(sort),
		};
	} catch (error) {
		return {
			entries: [],
			properties: [],
			warning: `Inspection failed: ${error instanceof Error ? error.message : 'unsupported data'}`,
		};
	}
}
function readableValue(value: unknown): string {
	const normalized =
		value && typeof value === 'object' && 'description' in value
			? (value as { description: unknown }).description
			: value && typeof value === 'object' && 'value' in value
				? (value as { value: unknown }).value
				: value;
	if (normalized == null) return '';
	if (typeof normalized === 'string') return normalized.slice(0, 500);
	if (typeof normalized === 'number' || typeof normalized === 'boolean')
		return String(normalized);
	if (ArrayBuffer.isView(normalized) || normalized instanceof ArrayBuffer)
		return '[binary data]';
	try {
		return (
			JSON.stringify(normalized, (_k, v) =>
				typeof v === 'bigint'
					? String(v)
					: ArrayBuffer.isView(v)
						? '[binary data]'
						: v,
			) ?? ''
		).slice(0, 500);
	} catch {
		return '[complex data]';
	}
}
