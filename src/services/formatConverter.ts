// src/services/formatConverter.ts
import { ColorInfo } from "../types/ApiTypes";

export type FormatType = "json" | "css" | "png" | "tailwind";

export interface FormatConverter {
	convert: (colors: ColorInfo[]) => string;
}

const rgbToHex = (rgb: number[]): string => {
	return (
		"#" +
		rgb.map((channel) => channel.toString(16).padStart(2, "0")).join("")
	);
};

const rgbToString = (rgb: number[]): string => {
	return `rgb(${rgb.join(",")})`;
};

export const formatConverters: Record<FormatType, FormatConverter> = {
	json: {
		convert: (colors: ColorInfo[]) =>
			JSON.stringify(
				{
					colors: colors.map((color) => ({
						hex: rgbToHex(color.rgb),
						rgb: color.rgb,
						score: color.score.toPrecision(2),
					})),
				},
				null,
				2
			),
	},
	css: {
		convert: (colors: ColorInfo[]) => `:root {
${colors
	.map(
		(color, index) => `  --palette-${index + 1}: ${rgbToString(color.rgb)};`
	)
	.join("\n")}
}`,
	},
	tailwind: {
		convert: (colors: ColorInfo[]) => {
			const config = {
				theme: {
					extend: {
						colors: Object.fromEntries(
							colors.map((color, index) => [
								`palette-${index + 1}`,
								rgbToString(color.rgb) +
									` /* score: ${color.score.toPrecision(
										2
									)} */`,
							])
						),
					},
				},
			};

			// Convert to string and remove quotes around color values
			return JSON.stringify(config, null, 2).replace(
				/"(rgb\([^)]+\)[^"]+)"/g,
				"$1"
			);
		},
	},
	png: {
		convert: (colors: ColorInfo[]) => {
			// Create a canvas element
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");

			if (!ctx) {
				console.error("Could not create canvas context");
				return "";
			}

			// Set canvas dimensions
			const blockSize = 30;
			const padding = 0;
			canvas.width = (blockSize + padding) * colors.length;
			canvas.height = blockSize;

			// Draw color blocks
			colors.forEach((color, index) => {
				ctx.fillStyle = rgbToString(color.rgb);
				ctx.fillRect(
					index * (blockSize + padding),
					0,
					blockSize,
					blockSize
				);
			});

			// Convert to base64
			return canvas.toDataURL("image/png");
		},
	},
};
