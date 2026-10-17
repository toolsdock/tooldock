const configured = process.env.NEXT_PUBLIC_RESIZER_SITE_URL;
export const site = {
	name: 'Leafsize',
	url: (configured || 'https://resize.example.com').replace(/\/$/, ''),
	isConfigured: Boolean(configured),
	title: 'Batch Image Resizer — Resize JPG, PNG & WebP Online | Leafsize',
	description:
		'Resize JPG, PNG and WebP images in bulk. Set exact dimensions or scale by percentage. Free, private and fully browser-based.',
} as const;
