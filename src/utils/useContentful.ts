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

// Marked as a required variable using the ! symbol
const spaceId: string = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!;
const accessToken: string = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!;

////////////////////////////////////////////////////////////////////////////////////
// ------------------------------- REUSABLE CODE -------------------------------- //

const createContentfulClient = () => {
  const client = createClient({
    space: spaceId,
    accessToken: accessToken,
  });

  return client;
};

const getEntriesFromType = async (client: any, contentfulType: string) => {
  const entries = await client.getEntries({ content_type: contentfulType });

  return entries;
};

////////////////////////////////////////////////////////////////////////////////////
// ----------------------------- EXPORTED FUNCTIONS ----------------------------- //

const getContentfulProducts = async () => {
  try {
    const client = createContentfulClient();
    const contentfulProducts = await getEntriesFromType(client, "product");
    // console.log("CHEOWcontentfulProducts", contentfulProducts.items);

    return contentfulProducts.items;
  } catch (error) {
    console.log(
      'Error from fetching Contentful data via getEntriesFromType(client, "product")'
    );
  }
};

const getContentfulProductById = async (slug: any) => {
  // Initialize Contentful client
  const client = createContentfulClient();

  // Fetch printfulId from the content model 'product' in Contentful
  try {
    const contentfulEntry = await client.getEntries({
      content_type: "product",
      "fields.printfulId": slug,
    });

    return contentfulEntry.items[0];
  } catch (error) {
    console.log("Error came from Contentful, printfulId was not found");
    return null;
  }
};

const getContentfulProductsById = async (products: any) => {
  // console.log("list of slug", products);

  // Initialize Contentful client
  const client = createContentfulClient();

  const productIdList = products.map((product: any) => {
    // return product.external_id;
    return product.id;
  });
  // console.log("productIdList", productIdList);

  /**
    The getEntries() method is being called with an options object containing a sys.id[in] 
    parameter that has a value of a comma-separated list of IDs. This will fetch all the entries whose IDs 
    match one of the IDs in the list. 
 */
  try {
    const entries = await client.getEntries({
      content_type: "product",
      "fields.printfulId[in]": productIdList.join(","),
    });

    // console.log("ENTRIES FROM CONTENTFUL", entries.items);

    return entries.items;
  } catch (error) {
    console.log("error came from Contentful, printful ids where not found");
    return null;
  }
};

//

//

//
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
  getContentfulProducts,
  getContentfulProductById,
  getContentfulProductsById,
};
