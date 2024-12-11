const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const extractColors = async ({
	url,
	numColors = 4,
	theme = "light",
	format = "json",
	blur_factor = 0.4,
}) => {
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
				blur_factor,
			}),
		});

		if (!response.ok) {
			throw new Error("Failed to extract colors");
		}

		return await response.json();
	} catch (error) {
		console.error("Error extracting colors:", error);
		throw error;
	}
};
