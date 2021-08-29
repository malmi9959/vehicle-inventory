const windmill = require("@windmill/react-ui/config");
module.exports = windmill({
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    colors: {
      primary: "#296d98",
      "primary-light": "#45b6fe",
      dark: "#0e2433",
    },
    extend: {},
  },
  variants: {},
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
});
