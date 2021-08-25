const windmill = require("@windmill/react-ui/config");
module.exports = windmill({
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    colors: {
      primary: "#296d98",
      "primary-light": "#45b6fe",
      dark: "#0e2433",
    },
    extend: {},
  },
  variants: {},
  plugins: [],
});
