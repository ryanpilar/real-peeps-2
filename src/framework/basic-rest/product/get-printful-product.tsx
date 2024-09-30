import { ContentfulProduct } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

// ALL PRODUCTS
export const fetchPrintfulProducts = async () => {
  const { data } = await http.get(`${API_ENDPOINTS.PRINTFUL_PRODUCT}`);
  return data;
};

// SINGLE PRODUCTS
export const fetchPrintfulProduct = async (slug: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.PRINTFUL_PRODUCT}/${slug}`);
  return data;
};

export const usePrintfulProductQuery = (slug: string) => {
  // manage the state of the API request and cache the response you get back from fetchProduct
  return useQuery<ContentfulProduct, Error>(
    [API_ENDPOINTS.PRINTFUL_PRODUCT, slug],
    () => fetchPrintfulProduct(slug)
  );
};