export default {
  content: [
    "./index.html",
    "./src/**/*.{js, ts, jsx, tsx} ",
  ],
  theme: {
    extend: {
      fontFamily: {
        titre: ['"Playfair Display"', 'serif'],
        contenu: ['"DM Sans"', 'sans-serif']
      },
      colors: {
        primaryGreen: "#2E6F40"
      },
    },
  },
}
