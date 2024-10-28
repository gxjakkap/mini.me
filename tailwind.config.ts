import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: 'class',
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
        colors: {
            background: "var(--background)",
            foreground: "var(--foreground)",
        },
        fontFamily: {
            inter: ['var(--font-inter)'],
            promtreg: ['var(--font-prompt-reqular)'],
            promtmed: ['var(--font-prompt-medium)'],
        },
        },
    },
    plugins: [],
}
export default config;
