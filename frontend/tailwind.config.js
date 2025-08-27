/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",   // Blue
        secondary: "#10B981", // Green
        background: "#FFFFFF" // White
      }
    },
  },
  plugins: [],
}
