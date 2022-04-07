const color = require("tailwindcss/colors");
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            width: {
                // '1/6vw':''
            },
            backgroundColor: {
                base: "var(--color-base)",
                "base-sub": "var(--color-base-sub)",
                "base-player": "var(--color-player)",
                "search-item": "var(--color-search-item)",
                "progress-whole": "var(--color-progress-whole)",
                "progress-current": "var(--color-progress-current)",
                btn: "var(--color-btn-bg)",
            },
            animation: {
                wiggle: "wiggle 3s linear infinite",
            },
            keyframes: {
                wiggle: {
                    "0%": { transform: "translateX(0px)" },
                    "100%": { transform: "tranlateX(-30px)" },
                },
            },
        },
        textColor: {
            base: "var(--color-text-base)",
            "base-sub": "var(--color-sub-text-base)",
            btn: "var(--color-btn)",
        },
        divideColor: {
            base: "var(--color-divide)",
        },
        color: {
            divide: "var(--color-divide)",
        },
    },

    plugins: [],
};
