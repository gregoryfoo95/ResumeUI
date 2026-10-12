/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        // System monospace stack (CSP only allows Google Fonts for webfonts).
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "Liberation Mono", "monospace"],
      },
      screens: {
        "3xs": "320px",
        "2xs": "375px",
        xs: "425px",
      },
      keyframes: {
        "slide-in-and-out": {
          "0%": { transform: "translateY(-100%)" },
          "15%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(0)" },
          "70%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(-100%)" },
        },
      },
      animation: {
        "slide-in-and-out": "slide-in-and-out 4s linear",
      },
    },
  },
  daisyui: {
    themes: [
      "forest",
      //"synthwave"
    ],
  },
  /* eslint-disable no-undef */
  plugins: [require("daisyui")],
};
