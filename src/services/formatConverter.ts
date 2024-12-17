// src/services/formatConverter.ts
import { ColorInfo } from "../types/ApiTypes";

export type FormatType = "json" | "css" | "png";

export interface FormatConverter {
	convert: (colors: ColorInfo[]) => string;
}

const rgbToHex = (rgb: number[]): string => {
	return `rgb(${rgb.join(",")})`;
};

export const formatConverters: Record<FormatType, FormatConverter> = {
	json: {
		convert: (colors: ColorInfo[]) =>
			JSON.stringify(
				Object.fromEntries(
					colors.map((color, index) => [
						`color-${index + 1}`,
						color.rgb,
					])
				),
				null,
				2
			),
	},
	css: {
		convert: (colors: ColorInfo[]) => `:root {
${colors
	.map((color, index) => `  --color-${index + 1}: ${color.rgb.join(", ")};`)
	.join("\n")}
}`,
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
			const blockSize = 60;
			const padding = 0;
			canvas.width = (blockSize + padding) * colors.length;
			canvas.height = blockSize;

			// Draw color blocks
			colors.forEach((color, index) => {
				ctx.fillStyle = rgbToHex(color.rgb);
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
