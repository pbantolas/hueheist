import { ColorInfo } from "../types/ApiTypes";

function toRGBString(rgb: number[]): string {
	return `rgb(${rgb.join(",")})`;
}
export function updateFavicon(colors: ColorInfo[] | null) {
	const canvas = document.createElement("canvas");
	canvas.width = 32;
	canvas.height = 32;
	const ctx = canvas.getContext("2d");
	const baseColor = "#f0f0f0";

	if (!ctx) return;

	if (!colors?.length) {
		ctx.beginPath();
		ctx.rect(0, 0, 32, 32);
		ctx.fillStyle = baseColor;
		ctx.fill();
		return;
	}

	colors.forEach((color, i) => {
		ctx.beginPath();
		ctx.rect((i % 2) * 16, (i >> 1) * 16, 16, 16);
		ctx.fillStyle = color ? toRGBString(color.rgb) : baseColor;
		ctx.fill();
	});

	// Update favicon
	let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
	if (!link) {
		link = document.createElement("link");
		link.rel = "icon";
		document.head.appendChild(link);
	}
	link.href = canvas.toDataURL();
}
