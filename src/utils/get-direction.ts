/**
    If the locale parameter is not undefined, the function checks whether the language of 
    the locale is right-to-left (RTL) or not. It does this by defining an array rtlLanguages 
    that contains two-letter language codes for RTL languages (Arabic and Hebrew). If the 
    locale parameter's language is found in the rtlLanguages array, the function returns "rtl", 
    indicating a right-to-left text direction. Otherwise, the function returns "ltr", indicating 
    a left-to-right text direction.

    Note that this function assumes that the language of the locale is determined by the first 
    two characters of the locale string, which is not always accurate.
 */
export function getDirection(locale: string | undefined) {
  if (!locale) return "ltr";
  const rtlLanguages = ["ar", "he"];
  return rtlLanguages.includes(locale) ? "rtl" : "ltr";
}
