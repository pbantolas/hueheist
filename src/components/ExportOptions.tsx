import React from "react";
import { FileText, FileJson, Image, Download } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { FormatType } from "../services/formatConverter";

// export type ExportFormat = "css" | "json" | "png";

interface FormatOption {
	format: FormatType;
	icon: LucideIcon;
	label: string;
}

const formatOptions: FormatOption[] = [
	{ format: "css", icon: FileText, label: "CSS" },
	{ format: "json", icon: FileJson, label: "JSON" },
	{ format: "tailwind", icon: Image, label: "tailwind config" },
	{ format: "png", icon: Image, label: "PNG" },
];

interface ExportOptionsProps {
	selectedFormat: FormatType;
	onFormatChange: (format: FormatType) => void;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({
	selectedFormat,
	onFormatChange,
}) => {
	const baseButtonClasses =
		"min-h-11 px-6 py-2 rounded-full transition-all text-sm flex items-center gap-2";
	const selectedClasses = "font-bold bg-action";
	const normalClasses = "bg-action text-text hover:bg-action-hover";

	return (
		<div>
			<h2 className="flex items-center gap-2 mb-4 font-medium text-xl dark:text-white">
				<Download size={24} className="text-zinc-900 dark:text-white" />
				Getaway Plans
			</h2>
			<div className="flex flex-wrap gap-2">
				{formatOptions.map(({ format, icon: Icon, label }) => (
					<button
						key={format}
						type="button"
						onClick={() => onFormatChange(format)}
						className={`${baseButtonClasses} ${
							selectedFormat === format
								? selectedClasses
								: normalClasses
						}`}
					>
						<Icon size={16} />
						{label}
					</button>
				))}
			</div>
		</div>
	);
};

export default ExportOptions;
