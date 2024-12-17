import React, { useState } from "react";
import {
	Image,
	Clipboard,
	Palette,
	FileJson,
	FileText,
	Download,
	Check,
	Monitor,
} from "lucide-react";
import { extractColors } from "../services/api";
import { formatConverters, FormatType } from "../services/formatConverter";
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
	const [selectedFormat, setSelectedFormat] = useState<FormatType>("json");
	const [isCopied, setIsCopied] = useState(false);

	if (!colors) return null;

	const copyToClipboard = (color: string, index: number): void => {
		navigator.clipboard.writeText(color);
		setCopiedIndex(index);
		setTimeout(() => setCopiedIndex(null), 2000);
	};

	const handleExportFormat = async (format: FormatType): Promise<void> => {
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
		<div className="gap-8 grid">
			<div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
				{/* Website Image */}
				<div className="bg-white dark:bg-zinc-800 shadow-sm p-6 rounded-xl">
					<h2 className="flex items-center gap-2 mb-4 font-medium text-xl dark:text-white">
						<Image
							size={24}
							className="text-zinc-900 dark:text-white"
						/>
						Surveillance Footage
					</h2>
					<div className="flex justify-center items-center bg-gradient-to-br from-zinc-100 dark:from-zinc-700 to-zinc-200 dark:to-zinc-800 rounded-xl overflow-hidden aspect-video">
						{screenshotUrl ? (
							<img
								src={screenshotUrl}
								alt="Website screenshot"
								className="w-full h-full object-cover"
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
				<div className="lg:col-span-2 bg-white dark:bg-zinc-800 shadow-sm p-6 rounded-xl">
					<h2 className="flex items-center gap-2 mb-4 font-medium text-xl dark:text-white">
						<Palette
							size={24}
							className="text-zinc-900 dark:text-white"
						/>
						Stolen Goods
					</h2>
					<div className="gap-4 grid grid-cols-4">
						{colors.map((color, index) => {
							const rgbString = `rgb(${color.rgb.join(",")})`;
							return (
								<div
									key={index}
									onClick={() =>
										copyToClipboard(rgbString, index)
									}
									style={{ backgroundColor: rgbString }}
									className="relative shadow-sm rounded-xl transition-all cursor-pointer aspect-square group hover:scale-105"
								>
									<div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
										<div
											className={`font-medium ${getTextColor(
												color.rgb
											)}`}
										>
											{copiedIndex === index
												? "COPIED!"
												: "COPY"}
										</div>
										<div className="absolute inset-0 bg-black/10 rounded-xl" />
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Export Section */}
			<div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
				{/* Export Options */}
				<div className="bg-white dark:bg-zinc-800 shadow-sm p-6 rounded-xl">
					<h2 className="flex items-center gap-2 mb-4 font-medium text-xl dark:text-white">
						<Download
							size={24}
							className="text-zinc-900 dark:text-white"
						/>
						Getaway Plans
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
				<div className="lg:col-span-2 bg-white dark:bg-zinc-800 shadow-sm p-6 rounded-xl">
					<h2 className="relative flex items-center gap-2 mb-4 font-medium text-xl dark:text-white">
						<FileJson
							size={24}
							className="text-zinc-900 dark:text-white"
						/>
						{selectedFormat}
						<div className="right-0 absolute flex items-center">
							{isCopied && (
								<span className="mr-2 text-sm text-text/80">
									Copied!
								</span>
							)}
							<button
								onClick={() => {
									const exportCode =
										formatConverters[
											selectedFormat
										].convert(colors);
									navigator.clipboard.writeText(exportCode);
									setIsCopied(true);
									setTimeout(() => setIsCopied(false), 2000);
								}}
								className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
							>
								<Clipboard size={20} />
							</button>
						</div>
					</h2>
					{selectedFormat === "png" && (
						<div className="my-4">
							<img
								src={formatConverters.png.convert(colors)}
								alt="Color Palette"
								className="max-w-full h-auto"
							/>
						</div>
					)}
					<pre className="bg-zinc-100 dark:bg-zinc-700 p-4 rounded-lg text-md dark:text-white overflow-x-auto">
						{formatConverters[selectedFormat].convert(colors)}
					</pre>
				</div>
			</div>
		</div>
	);
};

export default Analysis;
