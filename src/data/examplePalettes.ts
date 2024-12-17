import { ColorInfo } from "../types/ApiTypes";

interface ExamplePalette {
	websiteName: string;
	websiteUrl: string;
	colors: ColorInfo[];
}

export const examplePalettes: ExamplePalette[] = [
	{
		websiteName: "Raycast",
		websiteUrl: "https://www.raycast.com/",
		colors: [
			{ rgb: [218, 43, 58], score: 0.8 },
			{ rgb: [233, 207, 205], score: 0.2 },
			{ rgb: [6, 11, 12], score: 0.1 },
		],
	},
	{
		websiteName: "Vercel",
		websiteUrl: "https://vercel.com",
		colors: [
			{ rgb: [244, 169, 114], score: 0.9 },
			{ rgb: [30, 29, 29], score: 0.6 },
			{ rgb: [250, 250, 250], score: 0.2 },
		],
	},
	{
		websiteName: "HabitsGarden",
		websiteUrl: "https://habitsgarden.com/",
		colors: [
			{ rgb: [47, 56, 68], score: 0.9 },
			{ rgb: [28, 192, 108], score: 0.6 },
			{ rgb: [244, 244, 244], score: 0.2 },
		],
	},
];
