import React, { useState, FormEvent, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
	NavigateFunction,
} from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";
import AnalysisPage from "./components/AnalysisPage";
import { extractColors } from "./services/api";
import { ColorInfo, ColorResponse } from "./types/ApiTypes";
import { updateFavicon } from "./utils/favicon";
import { getUserFriendlyError } from "./utils/errorMessages";
import { trackEvent } from "./services/analytics";

function useColorExtractor(navigate: NavigateFunction) {
	const [url, setUrl] = useState<string>("");
	const [analysisMode, setAnalysisMode] = useState<boolean>(false);
	const [colors, setColors] = useState<ColorInfo[] | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);

	useEffect(() => {
		updateFavicon(colors);
	}, [colors]);

	const handleExtractColors = async (
		targetUrl: string,
		isDarkMode: boolean
	) => {
		try {
			setLoading(true);
			setError(null);
			trackEvent("extract_colors_start", { url: targetUrl, isDarkMode });
			const response: ColorResponse = await extractColors({
				url: targetUrl,
				theme: isDarkMode ? "dark" : "light",
			});
			setColors(response.data.colors);
			setScreenshotUrl(response.screenshot_url);
			trackEvent("extract_colors_success", {
				colorCount: response.data.colors.length,
			});
			navigate("/analysis");
		} catch (err: unknown) {
			trackEvent("extract_colors_error", {
				url: targetUrl,
				error: getUserFriendlyError(err),
			});
			setError(getUserFriendlyError(err));
			setColors(null);
		} finally {
			setLoading(false);
		}
	};

	return {
		url,
		setUrl,
		colors,
		loading,
		error,
		analysisMode,
		setAnalysisMode,
		screenshotUrl,
		handleExtractColors,
	};
}

function AppContent() {
	const navigate = useNavigate();
	const {
		url,
		setUrl,
		colors,
		loading,
		error,
		analysisMode,
		setAnalysisMode,
		screenshotUrl,
		handleExtractColors,
	} = useColorExtractor(navigate);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!url) return;
		await handleExtractColors(url, analysisMode);
	};

	const sharedProps = {
		url,
		loading,
		analysisMode,
		error,
		onUrlChange: setUrl,
		onAnalysisModeChange: setAnalysisMode,
		onSubmit: handleSubmit,
	};

	return (
		<Routes>
			<Route
				path="/"
				element={
					<Layout>
						<LandingPage {...sharedProps} />
					</Layout>
				}
			/>
			<Route
				path="/analysis"
				element={
					<Layout>
						<AnalysisPage
							{...sharedProps}
							colors={colors}
							screenshotUrl={screenshotUrl}
						/>
					</Layout>
				}
			/>
		</Routes>
	);
}

export default function App() {
	return (
		<Router>
			<AppContent />
		</Router>
	);
}
