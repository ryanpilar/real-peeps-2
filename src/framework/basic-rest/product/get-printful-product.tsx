import { ContentfulProduct } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

// ALL PRODUCTS
export const fetchPrintfulProducts = async () => {
  console.log(
    "http endpoints ALL PRODUCTS",
    `${API_ENDPOINTS.PRINTFUL_PRODUCT}`
  );

  const { data } = await http.get(`${API_ENDPOINTS.PRINTFUL_PRODUCT}`);
  console.log("FETCHED data ALL PRODUCTS!", data);
  return data;
};

// SINGLE PRODUCTS
export const fetchPrintfulProduct = async (slug: string) => {
  console.log("http endpoints", `${API_ENDPOINTS.PRINTFUL_PRODUCT}/${slug}`);

  const { data } = await http.get(`${API_ENDPOINTS.PRINTFUL_PRODUCT}/${slug}`);
  console.log("FETCHED data", data);
  return data;
};

export const usePrintfulProductQuery = (slug: string) => {
  // manage the state of the API request and cache the response you get back from fetchProduct
  return useQuery<ContentfulProduct, Error>(
    [API_ENDPOINTS.PRINTFUL_PRODUCT, slug],
    () => fetchPrintfulProduct(slug)
  );
};

// export const fetchFlashSaleProducts = async ({ queryKey }: any) => {
//   const [_key, _params] = queryKey;
//   const { data } = await http.get(API_ENDPOINTS.FLASH_SALE_PRODUCTS);
//   return data;
// };
