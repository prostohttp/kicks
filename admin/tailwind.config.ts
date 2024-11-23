import type { Config } from "tailwindcss";

export default <Partial<Config>>{
    theme: {
        extend: {
            screens: {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
                "2xl": "1650px",
            },
            aspectRatio: {
                auto: "auto",
                square: "1 / 1",
                video: "16 / 9",
            },
            colors: {
                blue: "#4A69E2",
                yellow: "#FFA52F",
                white: "#FFFFFF",
                "fa-white": "#FAFAFA",
                grey: "#E7E7E3",
                "gray-main": "#70706E",
                "dark-gray": "#232321",
                "dark-bg": "#101827",
                danger: "#e40000",
            },
            fontSize: {},
            fontFamily: {},
        },
    },
};
