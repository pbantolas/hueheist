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
				action: "rgba(var(--action))",
				"action-hover": "rgba(var(--action-hover))",
				accent: "rgb(var(--accent), <alpha-value>)",
			},
			boxShadow: {
				"glow-amber": "0 0 15px rgba(245,158,11,0.5)",
			},
			backgroundImage: {
				"pattern-fade":
					"linear-gradient(to top, transparent 10%, rgba(var(--background), 0.5) 30%, rgb(var(--background)) 100%), url('/pattern.svg')",
			},
		},
	},
	darkMode: "media",
	plugins: [],
};
