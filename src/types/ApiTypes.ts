interface ColorInfo {
  rgb: number[];
  score: number;
}

interface ColorResponse {
  data: {
    colors: ColorInfo[];
  };
  screenshot_url: string;
  format: string;
}

export { ColorInfo, ColorResponse };
