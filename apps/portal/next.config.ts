import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(dirname, '../..'),
  poweredByHeader: false,
  compress: false, // Compression is applied by the Nginx gateway.
  reactStrictMode: true,
  transpilePackages: ['@tools/theme', '@tools/network'],
};

export default config;
