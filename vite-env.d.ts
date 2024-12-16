/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_BASE_URL: string; // Define your environment variables here.
	// Add other environment variables as needed, e.g.:
	// readonly VITE_ANOTHER_VAR: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
