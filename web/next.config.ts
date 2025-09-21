import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
	reactStrictMode: true,
	// Produce a standalone server for slimmer Docker images
	output: "standalone",
	outputFileTracingRoot: __dirname,
	webpack: (config) => {
		config.cache = false; // Disable cache to avoid serialization issues
		return config;
	},
};
export default nextConfig;
