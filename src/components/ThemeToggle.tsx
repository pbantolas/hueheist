import { Sun, Moon } from "lucide-react";
import React from "react";

interface ThemeToggleProps {
	isDark: boolean;
	onChange: (isDark: boolean) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onChange }) => {
	return (
		<div className="flex flex-col border-gray-200 dark:border-gray-700 border rounded-md">
			<button
				type="button"
				onClick={() => onChange(false)}
				className={`px-6 py-2 text-sm transition-all relative z-10 rounded-t-md flex items-center gap-2 ${
					!isDark
						? "bg-primary text-black font-bold ring-2 ring-black dark:ring-white shadow-[0_0_20px_5px_rgba(251,191,36,0.9)]"
						: "bg-white text-black font-medium"
				}`}
			>
				<Sun size={16} /> daylight heist
			</button>
			<div className="bg-gray-200 dark:bg-gray-700 h-px" />
			<button
				type="button"
				onClick={() => onChange(true)}
				className={`px-6 py-2 text-sm transition-all relative z-10 rounded-b-md flex items-center gap-2 ${
					isDark
						? "bg-primary text-black font-bold ring-2 ring-black dark:ring-white shadow-[0_0_20px_5px_rgba(251,191,36,0.9)]"
						: "bg-black text-white font-medium"
				}`}
			>
				<Moon size={16} /> night operation
			</button>
		</div>
	);
};

export default ThemeToggle;
