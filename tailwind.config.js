/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App,js",
    "./src/components/Home.js",
    "./src/components/common/Button.js",
    "./src/components/common/Form.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ["Anton", "sans-serif"]
      }
    },
  },
  plugins: [],
}

