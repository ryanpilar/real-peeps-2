// use next useRouter to get the current active language :
import { useRouter } from "next/router";

export const ignoreI18nRoutes = () => {
  const router = useRouter();
  const active_language = router.locale;

  // use window object to get the current full url of your app :
  const window_url = window.location.href;

  // Note: Next.js executes code first server-side, then client-side (which includes the window object).
  // there are many ways to achieve this, if you get "Window is not defined" read this article.

  // set your api url based on the current active language,
  // assuming your default language is "en" :
  let api_url = "";
  if (active_language === "en") {
    api_url = `${window_url.substr(0, window_url.lastIndexOf("/"))}/`;
  }
  console.log(window_url); // http://localhost:3000/shop
  console.log(api_url); // http://localhost:3000/

  // and your secondary language is "ar" :
  if (active_language === "ar") {
    api_url = window_url.substr(0, window_url.lastIndexOf("/") - 2);
  }
  console.log(window_url); // http://localhost:3000/ar/shop
  console.log(api_url); // http://localhost:3000/

  // now your api url is set to the same url even if you switch the locale language :
  // fetch(`${api_url}/api/hello`});
};
