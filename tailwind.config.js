// G:\ai_therapist\tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Ensure this content array is correct for your project structure
    './app/**/*.{js,ts,jsx,tsx}',
    './component/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // THIS IS THE KEY FIX: Reference the global CSS variables
        primary: "var(--primary)",
        "background-light": "var(--background-light)",
        "background-dark": "var(--background-dark)",
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
