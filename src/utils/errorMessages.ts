export const getUserFriendlyError = (error: unknown): string => {
	// Network errors
	if (error instanceof Error) {
		if (error.message.toLowerCase().includes("network")) {
			return "Couldn't connect to the server. Please check your internet connection.";
		}

		// CORS errors
		if (error.message.toLowerCase().includes("cors")) {
			return "Unable to access this website. It might be blocking our requests.";
		}
	}

	// Invalid URL
	if (
		typeof error === "string" &&
		error.toLowerCase().includes("invalid url")
	) {
		return "Please enter a valid website URL (starting with http:// or https://)";
	}

	// API-specific errors (customize based on your backend error responses)
	if (typeof error === "string" && error.includes("status code: 404")) {
		return "Website not found. Please check the URL and try again.";
	}

	if (typeof error === "string" && error.includes("status code: 429")) {
		return "Too many requests. Please wait a moment and try again.";
	}

	// Fallback for unknown errors
	return "Something went wrong. Please try again.";
};
