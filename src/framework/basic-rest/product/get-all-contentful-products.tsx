import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "react-query";

// const { createClient } = require("contentful");
import { createClient } from "contentful";

////////////////////////////////////////////////////////////////////////////////////
// ----------------------------- CONTENTFUL MODELS ------------------------------ //

const CONTENT_TYPE_PRODUCT = { content_type: "product" };

const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

////////////////////////////////////////////////////////////////////////////////////
// ------------------------------- REUSABLE CODE -------------------------------- //

function createContentfulClient() {
  const client = createClient({
    space: spaceId,
    accessToken: accessToken,
  });

  return client;
}

async function getAllTypeEntries(client, contentfulType) {
  const entries = await client.getEntries({ content_type: contentfulType });

  return entries;
}

////////////////////////////////////////////////////////////////////////////////////
// ----------------------------- EXPORTED FUNCTIONS ----------------------------- //

const getContentfulProducts = () => {
  const client = createContentfulClient();
  return getAllTypeEntries(client, "product");
};

type PaginatedProduct = {
  data: Product[];
  paginatorInfo: any;
};
const fetchProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.PRODUCTS);
  return {
    data: shuffle(data),
    paginatorInfo: {
      nextPageUrl: "",
    },
  };
};

const useProductsQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedProduct, Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    fetchProducts,
    {
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export {
  useProductsQuery,
  fetchProducts,
  createContentfulClient,
  getContentfulProducts,
};
