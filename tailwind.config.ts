import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        solace: {
          blue: "#1C4E80",
          lightBlue: "#E3F2FD",
          teal: "#00B4B7",
          green: "#A3D9B1",
          yellow: "#FFE066",
          gray: "#F6F7FB",
          dark: "#1A2A3A",
        },
      },
      backgroundImage: {
        "solace-gradient": "linear-gradient(135deg, #E3F2FD 0%, #A3D9B1 100%)",
        "solace-radial":
          "radial-gradient(circle at 20% 40%, #00B4B7 0%, #1C4E80 100%)",
      },
      fontFamily: {
        sans: ["Inter", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
