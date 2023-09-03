import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [
        react(),
        laravel({
            input: ['resources/src/index.jsx'],
            refresh: true,
        }),
    ],
    server: {
        hmr: {
            host: 'localhost',
        },
    },
    build: {
        rollupOptions: {
            external: ['@splidejs/react-splide']
        }
    }
});
