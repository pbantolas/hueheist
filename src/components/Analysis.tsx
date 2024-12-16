import React, { useState } from "react";
import {
	Image,
	Palette,
	FileJson,
	FileText,
	Download,
	Check,
	Monitor,
} from "lucide-react";
import { extractColors } from "../services/api";
import { ColorInfo } from "../types/ApiTypes";

interface AnalysisProps {
	colors: ColorInfo[] | null;
	screenshotUrl: string | null;
}

interface Color {
	hex: string;
}

const Analysis: React.FC<AnalysisProps> = ({ colors, screenshotUrl }) => {
	const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
	const [selectedFormat, setSelectedFormat] = useState<string>("json");

	if (!colors) return null;

	const copyToClipboard = (color: string, index: number): void => {
		navigator.clipboard.writeText(color);
		setCopiedIndex(index);
		setTimeout(() => setCopiedIndex(null), 2000);
	};

	const handleExportFormat = async (format: string): Promise<void> => {
		try {
			setSelectedFormat(format);
		} catch (error) {
			console.error("Export error:", error);
		}
	};

	// Calculate if text should be light or dark based on background color
	const getTextColor = (rgbColor: number[]): string => {
		// Convert hex to RGB
		const r = rgbColor[0];
		const g = rgbColor[1];
		const b = rgbColor[2];

		// Calculate brightness
		const brightness = (r * 299 + g * 587 + b * 114) / 1000;

		// Return white for dark backgrounds, black for light backgrounds
		return brightness > 128 ? "text-zinc-900" : "text-white";
	};

	return (
		<div className="grid gap-8">
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{/* Website Image */}
				<div className="p-6 bg-white rounded-xl shadow-sm dark:bg-zinc-800">
					<h2 className="flex gap-2 items-center mb-4 text-xl font-medium dark:text-white">
						<Image
							size={24}
							className="text-zinc-900 dark:text-white"
						/>
						Website image
					</h2>
					<div className="flex overflow-hidden justify-center items-center bg-gradient-to-br rounded-xl aspect-video from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800">
						{screenshotUrl ? (
							<img
								src={screenshotUrl}
								alt="Website screenshot"
								className="object-cover w-full h-full"
							/>
						) : (
							<Monitor
								size={48}
								className="text-zinc-400 dark:text-zinc-500"
							/>
						)}
					</div>
				</div>

				{/* Color Palette */}
				<div className="p-6 bg-white rounded-xl shadow-sm dark:bg-zinc-800 lg:col-span-2">
					<h2 className="flex gap-2 items-center mb-4 text-xl font-medium dark:text-white">
						<Palette
							size={24}
							className="text-zinc-900 dark:text-white"
						/>
						Palette
					</h2>
					<div className="grid grid-cols-4 gap-4">
						{colors.map((color, index) => {
							const rgbString = `rgb(${color.rgb.join(",")})`;
							return (
								<div
									key={index}
									onClick={() =>
										copyToClipboard(rgbString, index)
									}
									style={{ backgroundColor: rgbString }}
									className="relative rounded-xl shadow-sm transition-all cursor-pointer aspect-square hover:scale-105 group"
								>
									<div className="flex absolute inset-0 justify-center items-center opacity-0 transition-all duration-300 group-hover:opacity-100">
										<div
											className={`font-medium ${getTextColor(
												color.rgb
											)}`}
										>
											{copiedIndex === index
												? "COPIED!"
												: "COPY"}
										</div>
										<div className="absolute inset-0 rounded-xl bg-black/10" />
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Export Section */}
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{/* Export Options */}
				<div className="p-6 bg-white rounded-xl shadow-sm dark:bg-zinc-800">
					<h2 className="flex gap-2 items-center mb-4 text-xl font-medium dark:text-white">
						<Download
							size={24}
							className="text-zinc-900 dark:text-white"
						/>
						Export options
					</h2>
					<div className="space-y-2">
						<button
							onClick={() => handleExportFormat("css")}
							className={`w-full px-4 py-2 rounded-lg ${
								selectedFormat === "css"
									? "bg-amber-500 text-white"
									: "bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600"
							} transition-colors text-left flex items-center gap-2`}
						>
							<FileText size={18} />
							CSS
						</button>
						<button
							onClick={() => handleExportFormat("json")}
							className={`w-full px-4 py-2 rounded-lg ${
								selectedFormat === "json"
									? "bg-amber-500 text-white"
									: "bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600"
							} transition-colors text-left flex items-center gap-2`}
						>
							<FileJson size={18} />
							JSON
						</button>
						<button
							onClick={() => handleExportFormat("png")}
							className={`w-full px-4 py-2 rounded-lg ${
								selectedFormat === "png"
									? "bg-amber-500 text-white"
									: "bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600"
							} transition-colors text-left flex items-center gap-2`}
						>
							<Image size={18} />
							PNG (base64)
						</button>
					</div>
				</div>

				{/* Export Code */}
				<div className="p-6 bg-white rounded-xl shadow-sm dark:bg-zinc-800 lg:col-span-2">
					<h2 className="flex gap-2 items-center mb-4 text-xl font-medium dark:text-white">
						<FileJson
							size={24}
							className="text-zinc-900 dark:text-white"
						/>
						Export code
					</h2>
					<pre className="overflow-x-auto p-4 rounded-lg bg-zinc-100 dark:bg-zinc-700 text-md dark:text-white">
						{JSON.stringify(
							Object.fromEntries(
								colors.map((color, index) => [
									`color-${index}`,
									color.rgb,
								])
							),
							null,
							2
						)}
					</pre>
				</div>
			</div>
		</div>
	);
};

export default Analysis;
