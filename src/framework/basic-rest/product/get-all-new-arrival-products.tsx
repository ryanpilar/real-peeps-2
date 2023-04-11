/**
    This code exports two functions, fetchNewArrivalProducts and useNewArrivalProductsQuery, 
    that are used to fetch data from an API endpoint and use it in a React component.
 */
import { QueryOptionsType, Product } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

/**
    fetchNewArrivalProducts is an asynchronous function that fetches data from the 
    API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS endpoint using the http.get function from the 
    @framework/utils/http module. It returns the data as an array of Product objects.
 */
export const fetchNewArrivalProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS);
  return data as Product[];
};

/**
    fetchNewArrivalAncientProducts is a similar function that fetches data from the 
    API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS_ANCIENT endpoint instead. It also returns the 
    data as an array of Product objects.
 */
const fetchNewArrivalAncientProducts = async ({ queryKey }: any) => {
  /**
      queryKey is a parameter that is provided by the useQuery hook from the react-query library. 
      It is automatically passed as an argument to the query function when using useQuery, and it 
      contains the current state of the query, including any variables or options that were passed 
      to the query.

      queryKey is deconstructed into _key and _params, although these 
      variables are not used in the query function. The queryKey is only used to extract the endpoint 
      to fetch data from and any options that are passed to the API endpoint.
   */
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS_ANCIENT);
  return data as Product[];
};

/**
    useNewArrivalProductsQuery is a custom React hook that uses the useQuery hook 
    from the react-query library to fetch the data and return it as a React query 
    object. It takes an object of QueryOptionsType as an argument which is used to 
    pass parameters to the API endpoint.
 */
export const useNewArrivalProductsQuery = (options: QueryOptionsType) => {
  if (options.demoVariant === "ancient") {
    return useQuery<Product[], Error>(
      [API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS_ANCIENT, options],
      fetchNewArrivalAncientProducts
    );
  }

  return useQuery<Product[], Error>(
    [API_ENDPOINTS.PRODUCTS_ANCIENT, options],
    fetchNewArrivalProducts
  );
};

/**
 
  QueryOptionsType = {
    text?: string;
    category?: string;
    status?: string;
    limit?: number;
    demoVariant?: 'ancient';
  };

 */
export const usePrintfulProductsQuery = (options: QueryOptionsType) => {
  if (options.demoVariant === "ancient") {
    return useQuery<Product[], Error>(
      [API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS_ANCIENT, options],
      fetchNewArrivalAncientProducts
    );
  }

  return useQuery<Product[], Error>(
    [API_ENDPOINTS.PRODUCTS_ANCIENT, options],
    fetchNewArrivalProducts
  );
};
