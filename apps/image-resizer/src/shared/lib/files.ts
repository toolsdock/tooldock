export const MAX_FILES = 20;
export function validateFiles(files: File[]): string | null {
	if (!files.length) return 'Select images to resize.';
	if (files.length > MAX_FILES) return `Select up to ${MAX_FILES} images.`;
	if (
		files.some(
			(f) => !['image/jpeg', 'image/png', 'image/webp'].includes(f.type),
		)
	)
		return 'Only JPG, PNG and WebP files are supported.';
	if (files.some((f) => f.size > 25 * 1024 * 1024))
		return 'Each image must be under 25 MB.';
	return null;
}
export function formatBytes(n: number) {
	return n < 1024
		? `${n} B`
		: n < 1048576
			? `${(n / 1024).toFixed(0)} KB`
			: `${(n / 1048576).toFixed(1)} MB`;
}
export function outputName(name: string, mime: string) {
	return (
		name.replace(/\.(jpe?g|png|webp)$/i, '') +
		'-resized.' +
		({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }[
			mime
		] || 'jpg')
	);
}
