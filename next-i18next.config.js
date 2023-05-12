const path = require("path");
module.exports = {
  i18n: {
    // locales: ["en", "de", "es", "ar", "he", "zh"],
    // defaultLocale: "en",
    // localeDetection: false,
    locales: [],
    defaultLocale: null,
    localeDetection: false,
  },
  localePath: path.resolve("./public/locales"),
};
