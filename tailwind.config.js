const colors = require("tailwindcss/colors");

module.exports = {
  theme: {
    colors,
    extend: {
      gridTemplateColumns: {
        "auto-3": "repeat(3, auto)",
      },
      fontFamily: {
        main:
          '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif',
      },
      transitionProperty: {
        'max-h': 'max-height',
      },
    },
  },
};
