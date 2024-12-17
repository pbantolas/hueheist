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
			boxShadow: {
				'glow-amber': '0 0 15px rgba(245,158,11,0.5)',
			},
		},
	},
	darkMode: "media",
	plugins: [],
};
