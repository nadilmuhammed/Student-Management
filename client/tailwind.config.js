/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
  content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
      "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
      extend: {},
  },
  // darkMode: "class",
  // plugins: [require("tw-elements-react/dist/plugin.cjs")]
  }

  const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}); 