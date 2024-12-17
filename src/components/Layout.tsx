import React from "react";
import { Send } from "lucide-react";

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<div className="relative bg-background min-h-screen transition-colors duration-300 overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 w-full h-full">
				<div className="absolute inset-0 bg-pattern-fade opacity-10" />
			</div>

			<div className="relative">
				<header className="px-8 pt-4">
					<div className="flex flex-col space-y-4 mx-auto max-w-6xl">
						<h1 className="font-black text-5xl text-text">
							HueHeist
						</h1>
					</div>
				</header>

				<main className="p-8">
					<div className="relative space-y-8 mx-auto max-w-6xl">
						{children}
					</div>
				</main>

				<footer className="bottom-4 left-1/2 fixed -translate-x-1/2">
					<a
						href="https://x.com/pbantolas"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 border-accent bg-background/20 hover:bg-accent backdrop-blur-sm px-4 py-2 border rounded-full text-text/80 transition-colors duration-300"
					>
						<span className="text-sm">made by petros</span>
						<Send size={16} />
					</a>
				</footer>
			</div>
		</div>
	);
}
