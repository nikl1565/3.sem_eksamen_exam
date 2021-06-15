const { resolve } = require("path");

module.exports = {
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, "index.html"),
                form: resolve(__dirname, "form.html"),
                process: resolve(__dirname, "process.html"),
            },
        },
    },
};
