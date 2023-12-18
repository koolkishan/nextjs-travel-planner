import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        "blue-text-title": "#243757",
        "dark-purple": "#2c003e",
        "mid-purple": "#600047",
        "light-purple": "#8b004f",
        "dark-red": "#b30054",
        "mid-red": "#d90057",
        "light-red": "#ff005a",
      },
      backgroundImage: (theme) => ({
        "custom-gradient":
          "linear-gradient(to bottom, " +
          theme("colors.dark-purple") +
          ", " +
          theme("colors.mid-purple") +
          ", " +
          theme("colors.light-purple") +
          ", " +
          theme("colors.dark-red") +
          ", " +
          theme("colors.mid-red") +
          ", " +
          theme("colors.light-red") +
          ")",
      }),
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
