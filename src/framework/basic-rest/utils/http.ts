/**
    http creates an instance of axios and sets some default options, such as the base URL and 
    a timeout value. It also sets some default headers for every request made using this axios 
    instance, including "Accept" and "Content-Type".

    The http.interceptors.request.use() method is then called to add an interceptor function 
    that modifies the request object before it is sent to the server. 
    
    Specifically, it modifies the headers by adding an Authorization header that includes the 
    token returned by the getToken() function. If there is no token available, an empty string 
    is added to the header instead.

    Finally, the http instance is exported as the default export of the module. This allows 
    other parts of the codebase to use this instance to make HTTP requests with the default 
    settings and headers included.
 */

import axios from "axios";
import { getToken } from "./get-token";

// console.log("hey");

const http = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}`,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Change request data/error here
http.interceptors.request.use(
  (config) => {
    //  getToken retrieves an authentication token from a cookie stored on the client-side
    const token = getToken();

    /**
        After the Authorization header is added to the config object, the return config statement 
        ensures that the modified config object is passed to the next interceptor or the axios 
        library to complete the request.
    */
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ""}`,
    };

    // console.log("http.interceptors.request.use CONFIG", config);

    //  Return the updated config object after modifying the headers with the authorization token
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default http;
