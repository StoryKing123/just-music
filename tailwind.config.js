const color = require("tailwindcss/colors");
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        backgroundColor: {
            base: "var(--color-base)",
        },
        textColor: {
            base: "var(--color-text-base)",
        },
    },

    plugins: [],
};
