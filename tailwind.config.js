/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // extend: {},
    colors: ({ colors }) => ({
      ...colors,
      primary: "",
      secondary: "",
      secondarydark: "#aaaaaa",
      bgmaindark: "#212121",
      borderdark: "#303030",
      bglight: "",
      bgdark: "",
    }),
  },
  variants: {
    textColor: ["responsive", "hover", "focus", "group-hover"],
    opacity: ["responsive", "hover", "focus", "group-hover"],
  },
  plugins: [
    
  ],
};
