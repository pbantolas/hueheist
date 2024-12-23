import React from "react";
import { LoaderCircle, LockKeyholeOpen } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { examplePalettes } from "../data/examplePalettes";
import PaletteCard from "./PaletteCard";

interface LandingPageProps {
	url: string;
	loading: boolean;
	analysisMode: boolean;
	onUrlChange: (url: string) => void;
	onAnalysisModeChange: (mode: boolean) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	error: string | null;
}

export default function LandingPage({
	url,
	loading,
	analysisMode,
	onUrlChange,
	onAnalysisModeChange,
	onSubmit,
	error,
}: LandingPageProps) {
	return (
		<>
			<div className="flex flex-col space-y-4">
				<h2 className="font-medium text-2xl text-text/80">
					Your Stealthy Color Palette Extraction Tool
				</h2>
				<p className="max-w-2xl text-lg text-text/60">
					Pull off the perfect color heist. Extract pro-grade color
					palettes from any website.
				</p>
			</div>

			{/* URL Input Section */}
			<div className="relative">
				<img
					src="/heist-location.png"
					alt="Heist location hint"
					className="sm:block top-[70px] left-[80px] absolute hidden w-40"
				/>
				<form
					onSubmit={onSubmit}
					className="flex sm:flex-row flex-col gap-2"
				>
					<ThemeToggle
						isDark={analysisMode}
						onChange={onAnalysisModeChange}
					/>
					<input
						type="text"
						value={url}
						onChange={(e) => onUrlChange(e.target.value)}
						placeholder="Enter the Mark (e.g. https://dribbble.com)"
						className="sm:flex-1 border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 px-4 py-2 border rounded-md w-full dark:text-white"
						required
						disabled={loading}
						aria-invalid={error ? "true" : "false"}
						aria-describedby={error ? "url-error" : undefined}
					/>
					<button
						type="submit"
						disabled={loading}
						className="border-zinc-300 dark:border-zinc-700 bg-action hover:bg-action-hover disabled:opacity-50 px-8 py-2 border rounded-md w-full sm:w-auto font-medium text-text transition-all duration-300 disabled:cursor-not-allowed"
					>
						<span className="flex justify-center gap-2 text-xl">
							{loading ? (
								<>
									<LoaderCircle className="animate-spin" />
									Processing...
								</>
							) : (
								<>
									<LockKeyholeOpen size={24} />
									crack the code
								</>
							)}
						</span>
					</button>
				</form>
			</div>

			{/* How it works section */}
			<section className="py-8">
				<div className="mx-auto max-w-6xl">
					<h2 className="mb-8 font-bold text-3xl text-text">
						How It Works
					</h2>
					<div className="gap-8 grid md:grid-cols-3">
						<div className="bg-white/50 dark:bg-zinc-900/50 shadow-sm backdrop-blur p-6 rounded-lg">
							<div className="flex items-center gap-4 mb-4">
								<span className="text-4xl">🎯</span>
								<h3 className="font-semibold text-text text-xl">
									Case the Joint
								</h3>
							</div>
							<p className="text-text/70">
								Enter any website URL to analyze its color
								scheme. Our tool supports modern websites,
								landing pages, and web applications. Get instant
								access to professional color palettes used by
								leading brands.
							</p>
						</div>
						<div className="bg-white/50 dark:bg-zinc-900/50 shadow-sm backdrop-blur p-6 rounded-lg">
							<div className="flex items-center gap-4 mb-4">
								<span className="text-4xl">🎨</span>
								<h3 className="font-semibold text-text text-xl">
									Execute the Heist
								</h3>
							</div>
							<p className="text-text/70">
								Our advanced color extraction algorithms analyze
								the website and identify primary, secondary, and
								accent colors.
							</p>
						</div>
						<div className="bg-white/50 dark:bg-zinc-900/50 shadow-sm backdrop-blur p-6 rounded-lg">
							<div className="flex items-center gap-4 mb-4">
								<span className="text-4xl">💎</span>
								<h3 className="font-semibold text-text text-xl">
									Make the Escape
								</h3>
							</div>
							<p className="text-text/70">
								Export your color palette in multiple
								developer-friendly formats including CSS
								variables, Tailwind config, JSON, or
								downloadable PNG swatches. Perfect for design
								systems and brand guidelines.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Example Palettes */}
			<section className="py-8">
				<div className="mx-auto max-w-6xl">
					<h2 className="mb-8 font-bold text-3xl text-text">
						Previous Heists
					</h2>
					<div className="gap-8 grid md:grid-cols-3">
						{examplePalettes.map((palette, index) => (
							<PaletteCard
								key={index}
								websiteName={palette.websiteName}
								websiteUrl={palette.websiteUrl}
								colors={palette.colors}
							/>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
