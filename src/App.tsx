import React, { useState, FormEvent, useEffect } from "react";
import { LockKeyholeOpen, LoaderCircle } from "lucide-react";
import ThemeToggle from "./components/ThemeToggle";
import Analysis from "./components/Analysis";
import { extractColors } from "./services/api";
import { ColorInfo, ColorResponse } from "./types/ApiTypes";
import { updateFavicon } from "./utils/favicon";
import { getUserFriendlyError } from "./utils/errorMessages";

function App() {
	const [url, setUrl] = useState<string>("");
	const [analysisMode, setAnalysisMode] = useState<boolean>(false);
	const [colors, setColors] = useState<ColorInfo[] | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);

	useEffect(() => {
		updateFavicon(colors);
	}, [colors]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!url) return;

		try {
			setLoading(true);
			setError(null);
			const response: ColorResponse = await extractColors({
				url,
				theme: analysisMode ? "dark" : "light",
			});
			setColors(response.data.colors);
			setScreenshotUrl(response.screenshot_url);
		} catch (err: unknown) {
			setError(getUserFriendlyError(err));
			setColors(null);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="bg-background p-8 min-h-screen transition-colors duration-300 overflow-x-hidden">
			<div className="relative space-y-8 mx-auto max-w-6xl">
				<h1 className="my-4 font-black text-4xl text-text">HueHeist</h1>
				{/* URL Input Section */}
				<div className="relative">
					<img
						src="/heist-location.png"
						alt="Heist location hint"
						className="md:block top-[75%] -left-28 xl:-left-36 absolute hidden w-28 xl:w-40 h-auto -translate-y-1/2 pointer-events-none"
					/>
					<form onSubmit={handleSubmit} className="flex gap-2">
						<ThemeToggle
							isDark={analysisMode}
							onChange={setAnalysisMode}
						/>
						<input
							type="url"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							placeholder="Enter the Mark"
							className="flex-1 border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 px-4 py-2 border rounded-md dark:text-white"
							required
							disabled={loading}
						/>
						<button
							type="submit"
							disabled={loading}
							className="flex items-center gap-2 border-zinc-300 dark:border-zinc-700 bg-action hover:bg-action-hover disabled:opacity-50 px-8 py-2 border rounded-md font-medium text-text transition-all duration-300 disabled:cursor-not-allowed"
						>
							{loading ? (
								<LoaderCircle
									size={24}
									className="animate-spin"
								/>
							) : (
								<LockKeyholeOpen size={24} />
							)}
							<span className="text-2xl">
								{loading ? "in progress..." : "crack the code"}
							</span>
						</button>
					</form>
				</div>

				{error && (
					<div className="text-center text-red-500 dark:text-red-400">
						{error}
					</div>
				)}

				{/* Force light mode and override with dark when needed */}
				<div className={`light ${analysisMode ? "dark" : ""}`}>
					<Analysis colors={colors} screenshotUrl={screenshotUrl} />
				</div>
			</div>
		</main>
	);
}

export default App;
