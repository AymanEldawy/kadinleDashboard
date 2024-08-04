/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // extend: {},
    colors: ({ colors }) => ({
      ...colors,
      "primary-blue": "#0079FF",
      "primary-green": "#00DFA2",
      "primary-yellow": "#F6FA70",
      "primary-red": "#FF0060",
      "dark-blue": "#0C134F",
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
  plugins: [],
};
