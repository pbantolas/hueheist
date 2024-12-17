interface UmamiWindow extends Window {
	umami?: {
		track: (eventName: string, props?: Record<string, any>) => void;
	};
}

declare const window: UmamiWindow;

export const trackEvent = (eventName: string, props?: Record<string, any>) => {
	if (window.umami) {
		window.umami.track(eventName, props);
	}
};
