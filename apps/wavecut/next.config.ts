import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() || '';

const config: NextConfig = {
	basePath,
	output: 'standalone',
	outputFileTracingRoot: path.join(__dirname, '../..'),
	poweredByHeader: false,
	compress: false,
	reactStrictMode: true,
	transpilePackages: [
		'@tools/i18n',
		'@tools/theme',
		'@tools/network',
		'@tools/ads',
	],
};
export default config;
