import React, { useState, FormEvent } from "react";
import { SearchCode, LoaderCircle } from "lucide-react";
import ThemeToggle from "./components/ThemeToggle";
import Analysis from "./components/Analysis";
import { extractColors } from "./services/api";
import { ColorInfo, ColorResponse } from "./types/ApiTypes";

function App() {
	const [url, setUrl] = useState<string>("");
	const [analysisMode, setAnalysisMode] = useState<boolean>(false);
	const [colors, setColors] = useState<ColorInfo[] | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);

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
			setError(err instanceof Error ? err.message : String(err));
			setColors(null);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="overflow-x-hidden p-8 min-h-screen transition-colors duration-300 bg-background">
			<div className="relative mx-auto space-y-8 max-w-6xl">
				<h1 className="my-4 text-4xl font-black text-text">HueHeist</h1>
				{/* URL Input Section */}
				<div className="relative">
					<img
						src="/heist-location.png"
						alt="Heist location hint"
						className="md:block top-[75%] -left-28 xl:-left-36 absolute hidden w-28 xl:w-40 h-auto -translate-y-1/2 pointer-events-none"
					/>
					<form onSubmit={handleSubmit} className="flex gap-2">
						<input
							type="url"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							placeholder="URL"
							className="flex-1 px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
							required
							disabled={loading}
						/>
						<ThemeToggle
							isDark={analysisMode}
							onChange={setAnalysisMode}
						/>
						<button
							type="submit"
							disabled={loading}
							className="flex gap-2 items-center px-8 py-2 font-medium bg-white rounded-xl border transition-all duration-300 bg-zinc-800 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50 text-zinc-900 dark:text-white disabled:cursor-not-allowed"
						>
							{loading ? (
								<LoaderCircle
									size={24}
									className="animate-spin"
								/>
							) : (
								<SearchCode size={24} />
							)}
							<span className="text-2xl">
								{loading ? "extracting..." : "heist"}
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
