import React from "react";
import { FileText, FileJson, Image, Download } from "lucide-react";

export type ExportFormat = "css" | "json" | "png";

interface ExportOptionsProps {
	selectedFormat: ExportFormat;
	onFormatChange: (format: ExportFormat) => void;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({
	selectedFormat,
	onFormatChange,
}) => {
	return (
		<div className="bg-white dark:bg-zinc-800 shadow-sm p-6 rounded-xl">
			<h2 className="flex items-center gap-2 mb-4 font-medium text-xl dark:text-white">
				<Download
					size={24}
					className="text-zinc-900 dark:text-white"
				/>
				Getaway Plans
			</h2>
			<div className="flex gap-2 flex-wrap">
				<button
					onClick={() => onFormatChange("css")}
					className={`px-4 py-2 rounded-full ${
						selectedFormat === "css"
							? "bg-amber-500 text-white shadow-glow-amber"
							: "bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600"
					} transition-all text-sm font-medium flex items-center gap-2`}
				>
					<FileText size={16} />
					CSS
				</button>
				<button
					onClick={() => onFormatChange("json")}
					className={`px-4 py-2 rounded-full ${
						selectedFormat === "json"
							? "bg-amber-500 text-white shadow-glow-amber"
							: "bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600"
					} transition-all text-sm font-medium flex items-center gap-2`}
				>
					<FileJson size={16} />
					JSON
				</button>
				<button
					onClick={() => onFormatChange("png")}
					className={`px-4 py-2 rounded-full ${
						selectedFormat === "png"
							? "bg-amber-500 text-white shadow-glow-amber"
							: "bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600"
					} transition-all text-sm font-medium flex items-center gap-2`}
				>
					<Image size={16} />
					PNG
				</button>
			</div>
		</div>
	);
};

export default ExportOptions;
