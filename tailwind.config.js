/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
      "./layout/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                gray: colors.neutral
            },
            fontFamily: {
                // to change, update font in _document.js
                sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
                serif: ["var(--font-lora)", ...defaultTheme.fontFamily.serif],
                stock: [defaultTheme.fontFamily.sans]
            },
            aspectRatio: {
                "4/3": "4 / 3",
                "3/2": "3 / 2",
                "2/3": "2 / 3",
                "9/16": "9 / 16"
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '80ch', // add required value here
                    }
                }
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: [require("@tailwindcss/typography")]
}

