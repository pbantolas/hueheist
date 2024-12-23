import { ColorResponse } from "../types/ApiTypes";
const API_BASE_URL: string =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

interface ApiProps {
	url: string;
	numColors?: number;
	theme?: string;
	format?: string;
}

export const extractColors = async ({
	url,
	numColors = 3,
	theme,
	format,
}: ApiProps): Promise<ColorResponse> => {
	try {
		const response = await fetch(`${API_BASE_URL}/extract/url`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				url,
				num_colors: numColors,
				theme,
				format,
				algorithm: "simple",
			}),
		});

		if (!response.ok) {
			throw new Error("Failed to extract colors");
		}

		const jsonResponse = await response.json();
		// fixup screenshot url
		jsonResponse.screenshot_url =
			API_BASE_URL + jsonResponse.screenshot_url;

		return jsonResponse;
	} catch (error) {
		console.error("Error extracting colors:", error);
		throw error;
	}
};
