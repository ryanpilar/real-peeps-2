import { QueryOptionsType, Product } from "@framework/types";
import { ContentfulProduct } from "@framework/types";

import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "react-query";
type PaginatedProduct = {
  // data: Product[];
  data: any;
  paginatorInfo: any;
};
const fetchProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  console.log();

  const { data } = await http.get(API_ENDPOINTS.PRINTFUL_PRODUCT);
  let allProducts = data.combinedProductData;
  allProducts = shuffle(allProducts);
  // console.log("UNSHUFFLED", data.combinedProductData);
  console.log("SHUFFLED", allProducts);

  // sort data here
  let filteredProducts = false;
  console.log("key, params", _key, _params);

  if (_params.category !== undefined) {
    const searchTags = _params?.category?.split(",");

    filteredProducts = allProducts.filter((product) => {
      return searchTags.some((tag) =>
        product?.contentfulData?.fields?.category?.includes(tag)
      );
    });

    console.log("filteredProducts", filteredProducts);
    allProducts = filteredProducts;
  }

  console.log(
    "allProductsallProducts",
    allProducts[0].printfulData.variants[0].retail_price
  );

  if (_params.sort_by !== undefined) {
    console.log("sorting!");
    const action = _params.sort_by;

    switch (action) {
      case "low-high":
        // sort data from low to high
        allProducts.sort((a, b) => {
          return (
            a.printfulData.variants[0].retail_price -
            b.printfulData.variants[0].retail_price
          );
        });

        break;
      case "high-low":
        // sort data from high to low
        allProducts.sort((a, b) => {
          return (
            b.printfulData.variants[0].retail_price -
            a.printfulData.variants[0].retail_price
          );
        });
        break;
      case "discount":
        console.log("discount");

        break;
      default:
        console.log(`Invalid action: ${action}`);
    }
  }

  return {
    data: allProducts,
    paginatorInfo: {
      nextPageUrl: null,
      // nextPageUrl: data.pagination.next_page ?? null,
    },
  };
};

const useProductsQuery = (options: QueryOptionsType) => {
  console.log("MOFO OPTIONS", options);

  // useInfiniteQuery is used to fetch data in a paginated fashion.
  return useInfiniteQuery<PaginatedProduct, Error>(
    [API_ENDPOINTS.PRINTFUL_PRODUCT, options],
    fetchProducts,
    {
      // This property holds the URL for the next page of data.
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { useProductsQuery, fetchProducts };
