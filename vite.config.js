const { resolve } = require("path");
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, "index.html"),
                form: resolve(__dirname, "form.html"),
                process: resolve(__dirname, "process.html"),
            },
        },
    },
    server: {
        https: true,
    },
    plugins: [mkcert()],
});
