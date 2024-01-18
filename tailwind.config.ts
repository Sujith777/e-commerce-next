import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#8700ff",
          secondary: "#007888",
          accent: "#007eff",
          neutral: "#121c23",
          "base-100": "#fcfcfc",
          info: "#008ad7",
          success: "#61ce00",
          warning: "#bc7800",
          error: "#ff6e7e",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
