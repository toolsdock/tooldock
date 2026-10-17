export function formatTime(seconds: number) {
	if (!Number.isFinite(seconds)) return '0:00.00';
	const min = Math.floor(seconds / 60);
	const sec = (seconds - min * 60).toFixed(2).padStart(5, '0');
	return `${min}:${sec}`;
}
export function clamp(value: number, min: number, max: number) {
	return Math.max(min, Math.min(max, value));
}
