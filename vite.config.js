const { resolve } = require("path");
const fs = require("fs");
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, "index.html"),
                form: resolve(__dirname, "form.html"),
                process: resolve(__dirname, "process.html"),
                selectTable: resolve(__dirname, "select-table.html"),
            },
        },
    },
    server: {
        open: true,
        https: {
            key: fs.readFileSync("./localhost-key.pem"),
            cert: fs.readFileSync("./localhost.pem"),
        },
    },
});
