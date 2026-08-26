/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        swiss: {
          black: "#000000",
          white: "#FFFFFF",
          muted: "#F2F2F2",
          accent: "#FF3000",
          border: "#000000",
        },
      },
      fontFamily: {
        sans: ["Inter", "Helvetica", "Arial", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0px",
        none: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        "3xl": "0px",
        full: "0px",
      },
      borderWidth: {
        3: "3px",
        4: "4px",
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        widest: "0.25em",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        swiss: {
          "primary": "#000000",
          "primary-content": "#ffffff",
          "secondary": "#F2F2F2",
          "accent": "#FF3000",
          "neutral": "#000000",
          "base-100": "#ffffff",
          "base-200": "#F2F2F2",
          "base-300": "#E5E5E5",
          "info": "#000000",
          "success": "#000000",
          "warning": "#FF3000",
          "error": "#FF3000",
        },
      },
      "light",
    ],
    defaultTheme: "swiss",
  },
};
