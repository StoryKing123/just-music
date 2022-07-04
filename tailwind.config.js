const color = require("tailwindcss/colors");
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            width: {
                // '1/6vw':''
            },
            minWidth: {
                "1/4": "25%",
            },
            maxWidht: {
                "1/4": "25%",
            },
            backgroundColor: {
                base: "var(--color-base)",
                nav: "var(--color-nav)",
                "base-sub": "var(--color-base-sub)",
                "base-player": "var(--color-player)",
                search: "var(--color-search)",
                "search-item": "var(--color-search-item)",
                "search-item-active": "var(--color-search-item-active)",
                "progress-whole": "var(--color-progress-whole)",
                "progress-current": "var(--color-progress-current)",
                btn: "var(--color-btn-bg)",
                "voice-bar-whole": "var(--color-voice-bar-whole)",
                "voice-bar-current": "var(--color-voice-bar-current)",
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
            active: "var(--color-text-active)",
            "in-active": "var(--color-text-in-active)",
        },
        divideColor: {
            base: "var(--color-divide)",
        },
        color: {
            divide: "var(--color-divide)",
        },
    },

    plugins: [require("@tailwindcss/line-clamp")],
};
