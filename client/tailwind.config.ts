import flowbite from "flowbite-react/tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "1.5rem",
        lg: "2rem",
      },
    },
    screens: {
      xs: "320px",
      sm: "600px",
      md: "1024px",
      lg: "1280px",

      smMax: { max: "600px" },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#514fff",
          secondary: "#9099a0",
          accent: "#000000",
          neutral: "#eeeff3",
          "base-100": "#ffff",
          info: "#0000ff",
          success: "#00ff00",
          warning: "#dc2626",
          error: "#b91c1c",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
    flowbite.plugin(),
  ],
};
export default config;
