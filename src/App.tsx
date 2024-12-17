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
		<>
			<header className="bg-background px-8 pt-4 transition-c8lors duration-300">
				<div className="flex flex-col space-y-4 mx-auto max-w-6xl">
					<h1 className="font-black text-5xl text-text">HueHeist</h1>
					<h2 className="font-medium text-2xl text-text/80">
						Your Stealthy Color Palette Extraction Tool
					</h2>
					<p className="max-w-2xl text-lg text-text/60">
						Pull off the perfect color heist. Extract pro-grade
						color palettes from any website.
					</p>
				</div>
			</header>
			<main className="bg-background p-8 min-h-screen transition-colors duration-300 overflow-x-hidden">
				<div className="relative space-y-8 mx-auto max-w-6xl">
					{/* URL Input Section */}
					<div className="relative">
						<img
							src="/heist-location.png"
							alt="Heist location hint"
							className="top-[70px] left-[80px] absolute w-40"
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
								placeholder="Enter the Mark (e.g. https://dribbble.com)"
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
									{loading
										? "in progress..."
										: "crack the code"}
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
						<Analysis
							colors={colors}
							screenshotUrl={screenshotUrl}
						/>
					</div>
				</div>

				{/* how it works */}
				<section className="py-16">
					<div className="mx-auto max-w-6xl">
						<h2 className="mb-8 font-bold text-3xl text-text">
							How It Works
						</h2>
						<div className="gap-8 grid md:grid-cols-3">
							<div className="bg-white dark:bg-zinc-900 shadow-sm p-6 rounded-lg">
								<div className="flex items-center gap-4 mb-4">
									<span className="text-4xl">🎯</span>
									<h3 className="font-semibold text-text text-xl">
										Case the Joint
									</h3>
								</div>
								<p className="text-text/70">
									Enter any URL to analyze the target's color
									scheme
								</p>
							</div>
							<div className="bg-white dark:bg-zinc-900 shadow-sm p-6 rounded-lg">
								<div className="flex items-center gap-4 mb-4">
									<span className="text-4xl">🎨</span>
									<h3 className="font-semibold text-text text-xl">
										Execute the Heist
									</h3>
								</div>
								<p className="text-text/70">
									Our algorithms extract the most valuable
									colors instantly
								</p>
							</div>
							<div className="bg-white dark:bg-zinc-900 shadow-sm p-6 rounded-lg">
								<div className="flex items-center gap-4 mb-4">
									<span className="text-4xl">💎</span>
									<h3 className="font-semibold text-text text-xl">
										Make the Escape
									</h3>
								</div>
								<p className="text-text/70">
									Export your color palette in any format you
									need
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}

export default App;
