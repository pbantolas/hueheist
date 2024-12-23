interface ValidationResult {
  isValid: boolean;
  error: string | null;
}

export function validateUrl(url: string): ValidationResult {
  // Trim whitespace and enforce minimum length
  const trimmedUrl = url.trim();
  if (trimmedUrl.length < 4) {
    return {
      isValid: false,
      error: "URL is too short"
    };
  }

  try {
    // Normalize the URL by adding protocol if missing
    const urlToTest = /^https?:\/\//i.test(trimmedUrl) 
      ? trimmedUrl 
      : `https://${trimmedUrl}`;
    
    const urlObject = new URL(urlToTest);

    // Only allow HTTP(S) protocols
    if (!['http:', 'https:'].includes(urlObject.protocol)) {
      return {
        isValid: false,
        error: "URL must use HTTP or HTTPS protocol"
      };
    }

    // Basic hostname validation
    const hostname = urlObject.hostname;
    if (!hostname || 
        hostname.length < 3 ||
        !hostname.includes('.') ||
        hostname.startsWith('.') ||
        hostname.endsWith('.') ||
        hostname.includes('..')) {
      return {
        isValid: false,
        error: "Invalid domain name"
      };
    }

    // Successful validation
    return {
      isValid: true,
      error: null
    };

  } catch (err) {
    return {
      isValid: false,
      error: "Please enter a valid URL"
    };
  }
}
