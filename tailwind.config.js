/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        Orbitron: ["Orbitron"],
      },
      animation: {
        "bounce-slow": "bounce-slow 1s linear infinite",
      },
      keyframes: {
        "bounce-slow": {
          "0%, 100%": {
            transform: "translateY(-15%)",
          },
          "50%": {
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [],
};
