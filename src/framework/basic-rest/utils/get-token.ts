/**
    This code exports a getToken function that checks for the presence of an authentication 
    token stored in a cookie on the client-side.

    The function first checks if the window object is defined, which indicates that the code is 
    being executed on the client-side. If window is undefined, the function returns null.

    If window is defined, the function uses the js-cookie library to retrieve the value of the 
    auth_token cookie. If the cookie is not present, the function returns undefined.

    By using this function, other parts of the codebase can check for the presence of an 
    authentication token without needing to know the implementation details of how the token 
    is stored or retrieved.
 */
import Cookies from "js-cookie";

export const getToken = () => {
  if (typeof window === undefined) {
    return null;
  }
  return Cookies.get("auth_token");
};
