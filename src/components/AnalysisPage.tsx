import React from "react";
import { LoaderCircle, LockKeyholeOpen } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Analysis from "./Analysis";
import { ColorInfo } from "../types/ApiTypes";

interface AnalysisPageProps {
	url: string;
	loading: boolean;
	analysisMode: boolean;
	colors: ColorInfo[] | null;
	screenshotUrl: string | null;
	error: string | null;
	onUrlChange: (url: string) => void;
	onAnalysisModeChange: (mode: boolean) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function AnalysisPage({
	url,
	loading,
	analysisMode,
	colors,
	screenshotUrl,
	error,
	onUrlChange,
	onAnalysisModeChange,
	onSubmit,
}: AnalysisPageProps) {
	return (
		<>
			{/* URL Input Section */}
			<div className="relative">
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

			{/* Force light mode and override with dark when needed */}
			<div className={`light ${analysisMode ? "dark" : ""}`}>
				<Analysis colors={colors} screenshotUrl={screenshotUrl} />
			</div>
		</>
	);
}
