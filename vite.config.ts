import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		host: 'localhost',
		port: 5173,
		proxy: {
			'/api': 'http://localhost:8000'
		}
	}
});
