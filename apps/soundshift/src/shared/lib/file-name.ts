export function fileStem(name: string): string {
	const lastDot = name.lastIndexOf('.');
	const raw = lastDot > 0 ? name.slice(0, lastDot) : name;
	const sanitized = raw
		.trim()
		.replace(/[^\p{L}\p{N}._-]+/gu, '-')
		.replace(/^-+|-+$/g, '');
	return sanitized || 'audio';
}

export function fileExtension(name: string): string {
	const match = name.toLowerCase().match(/\.([a-z0-9]{1,8})$/);
	return match?.[1] ?? 'audio';
}
