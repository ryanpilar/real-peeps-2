/**
    next-pwa, a module that enables Progressive Web App (PWA) features in Next.js 
    applications. 
    
    next-pwa sets the dest option to "public" by default, which means the output 
    files will be generated in the public directory. Therefore, your API directory 
    located in the public directory can be accessed through the root URL with /api.

    If you want to change the behavior and move your API directory to the pages 
    directory, you can modify your next.config.js file to include the following:
 */

const { i18n } = require("./next-i18next.config");
const runtimeCaching = require("next-pwa/cache");

/**
    The "dest" option is set to "public," which means that output files will be 
    generated in the "public" directory. The "disable" option is set to true if the 
    "NODE_ENV" environment variable is not set to "production." The "runtimeCaching" 
    option is set to the "runtimeCaching" object imported earlier.
 */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV !== "production",
  runtimeCaching,
});

module.exports = withPWA({
  i18n,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["files.cdn.printful.com"],
  },
  // Exclude specific locales from pre-rendering
  excludeLocaleFromExport: ["ar", "de", "es", "he", "zh"],
});
