/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: {
    container: false,
  },
  theme: {
    screens: {
      "2xs": "320px",
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1500px",
      "2xla": "1650px",
      fxl: "1920px",
      "3xl": "2880px",
      "4xl": "3840px",
    },
    extend: {
      colors: {
        ivory: "#f8f4ee",
        paper: "#fffdf9",
        rose: "#d96076",
        "rose-soft": "#f2d8d9",
        coral: "#e57b70",
        wine: "#0f5c63",
        "wine-deep": "#073b40",
        ink: "#2b2928",
        muted: "#6f6965",
        line: "#ded6cd",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "serif"],
      },
      maxWidth: {
        site: "1420px",
      },
      boxShadow: {
        soft: "0 20px 45px rgba(7, 59, 64, 0.08)",
        elevated: "0 30px 70px rgba(7, 59, 64, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
