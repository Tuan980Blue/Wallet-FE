import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig({
    plugins: [
        react(),
    ],
    build: {
        modulePreload: false,
        target: 'esnext',
        minify: true,
        cssCodeSplit: true,
        chunkSizeWarningLimit: 200,
    },
});
