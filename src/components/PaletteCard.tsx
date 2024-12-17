import React from "react";
import { ExternalLink } from "lucide-react";
import { ColorInfo } from "../types/ApiTypes";

interface PaletteCardProps {
	websiteName: string;
	websiteUrl: string;
	colors: ColorInfo[];
}

const rgbToString = (rgb: number[]): string => {
	// Ensure RGB values are valid
	const validRgb = rgb.map((val) =>
		Math.min(255, Math.max(0, Math.round(val)))
	);
	return `rgb(${validRgb.join(", ")})`;
};

export default function PaletteCard({
	websiteName,
	websiteUrl,
	colors,
}: PaletteCardProps) {
	return (
		<div className="border-white/10 bg-background backdrop-blur-sm p-6 border rounded-lg transition-all duration-300 group">
			<div className="flex justify-between items-center mb-4">
				<h3 className="font-medium text-lg text-text">{websiteName}</h3>
				<a
					href={websiteUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="text-text/40 hover:text-accent transition-colors duration-300"
				>
					<ExternalLink size={16} />
				</a>
			</div>
			<div className="gap-2 grid grid-cols-3">
				{colors.map((color, index) => (
					<div key={index} className="space-y-1">
						<div
							className="shadow-sm rounded-md w-full transition-transform duration-300 aspect-square hover:scale-105"
							style={{ backgroundColor: rgbToString(color.rgb) }}
						/>
						<p className="font-mono text-center text-text/60 text-xs">
							{rgbToString(color.rgb)}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
