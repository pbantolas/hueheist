/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Geist Sans", "sans-serif"],
				mono: ["JetBrains Mono", "monospace"],
			},
			colors: {
				primary: "rgba(var(--primary))",
				background: "rgba(var(--background))",
				text: "rgba(var(--text))",
			},
		},
	},
	darkMode: "media",
	plugins: [],
};
