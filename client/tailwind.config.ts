import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1977f2",

          secondary: "#67b5fa",

          accent: "#f97316",

          neutral: "#d1d5db",

          "base-100": "#ffff",

          info: "#0000ff",

          success: "#00ff00",

          warning: "#dc2626",

          error: "#b91c1c",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
