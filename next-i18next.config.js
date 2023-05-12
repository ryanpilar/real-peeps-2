const path = require("path");
module.exports = {
  i18n: {
    // locales: ["en", "de", "es", "ar", "he", "zh"],
    // defaultLocale: "en",
    // localeDetection: false,
    // locales: ["en-US"],
    // defaultLocale: "en-US",
    localeDetection: false,
  },
  localePath: path.resolve("./public/locales"),
};
