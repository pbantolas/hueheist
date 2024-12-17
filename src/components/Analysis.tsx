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
import ExportOptions from "./ExportOptions";
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
	const [selectedFormat, setSelectedFormat] = useState<FormatType>("css");
	const [isCopied, setIsCopied] = useState(false);

	if (!colors) return null;

	const copyToClipboard = (color: string, index: number): void => {
		navigator.clipboard.writeText(color);
		setCopiedIndex(index);
		setTimeout(() => setCopiedIndex(null), 2000);
	};

	const handleExportFormat = (format: FormatType): void => {
		setSelectedFormat(format);
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
		<div className="gap-4 grid">
			<div className="gap-4 grid grid-cols-1 lg:grid-cols-3 lg:grid-flow-col lg:auto-cols-fr">
				{/* Left Column */}
				<div className="lg:block contents">
					<div className="gap-4 grid">
						<div className="bg-white dark:bg-zinc-900 shadow-sm p-6 rounded-md">
							<div>
								{/* Website Image */}
								<div className="relative flex items-center gap-4 mb-4">
									<div className="flex items-center gap-4 font-medium text-xl dark:text-white">
										<Image
											size={24}
											className="text-zinc-900 dark:text-white"
										/>
										Surveillance Footage
									</div>
								</div>
								<div className="relative flex justify-center items-center bg-gradient-to-br from-zinc-100 dark:from-zinc-700 to-zinc-200 dark:to-zinc-900 rounded-md overflow-visible aspect-video group">
									{screenshotUrl ? (
										<div className="group-hover:bg-black/50 z-0 absolute inset-0 transition-colors duration-300" />
									) : null}
									{screenshotUrl ? (
										<img
											src={screenshotUrl}
											alt="Website screenshot"
											className="group-hover:scale-150 group-hover:z-10 hover:shadow-2xl rounded-md w-full h-full transition-all group-hover:translate-x-1/4 duration-300 ease-in-out object-cover"
										/>
									) : (
										<Monitor
											size={48}
											className="text-zinc-400 dark:text-zinc-500"
										/>
									)}
								</div>
							</div>

							<div className="mt-4">
								<div className="relative flex items-center gap-4 mb-4">
									<div className="flex items-center gap-4 font-medium text-xl dark:text-white">
										<Palette
											size={24}
											className="text-zinc-900 dark:text-white"
										/>
										Stolen Goods
									</div>
								</div>
								<div className="gap-4 grid grid-cols-4">
									{colors.map((color, index) => {
										const rgbString = `rgb(${color.rgb.join(
											","
										)})`;
										return (
											<div
												key={index}
												onClick={() =>
													copyToClipboard(
														rgbString,
														index
													)
												}
												style={{
													backgroundColor: rgbString,
												}}
												className="relative border-gray-300 shadow-sm border rounded-xl transition-all cursor-pointer aspect-square group hover:scale-105"
											>
												<div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
													<div
														className={`font-bold text-sm ${getTextColor(
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

							<div className="mt-8">
								{/* Buttons for adding to collection */}
								<button
									type="button"
									className="flex items-center bg-action hover:bg-action-hover p-3 rounded-xl text-sm text-text"
								>
									<Check size={20} /> Add to Booty
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Right Column */}
				<div className="lg:block col-span-2 contents">
					<div className="gap-4 grid">
						<div className="bg-white dark:bg-zinc-900 shadow-sm p-6 rounded-md">
							<ExportOptions
								selectedFormat={selectedFormat}
								onFormatChange={handleExportFormat}
							/>

							<div className="mt-8">
								{/* Export Code */}
								<div className="relative flex items-center gap-4 mb-4">
									<div className="flex items-center gap-4 font-medium text-xl dark:text-white">
										<FileJson
											size={24}
											className="text-zinc-900 dark:text-white"
										/>
										{selectedFormat}
									</div>
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
												navigator.clipboard.writeText(
													exportCode
												);
												setIsCopied(true);
												setTimeout(
													() => setIsCopied(false),
													2000
												);
											}}
											className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
										>
											<Clipboard size={20} />
										</button>
									</div>
								</div>
								{selectedFormat === "png" && (
									<div className="my-4">
										<img
											src={formatConverters.png.convert(
												colors
											)}
											alt="Color Palette"
										/>
									</div>
								)}
								<pre className="border-indigo-500 bg-zinc-100 dark:bg-indigo-400/20 p-4 border rounded-sm max-w-full text-md dark:text-white break-all whitespace-pre-wrap overflow-x-auto">
									{formatConverters[selectedFormat].convert(
										colors
									)}
								</pre>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Analysis;
