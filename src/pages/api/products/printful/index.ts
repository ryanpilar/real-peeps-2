import type { NextApiRequest, NextApiResponse } from "next";
import { printful } from "../../../../lib/printful-client";
import { getContentfulProductById } from "../../../../utils/useContentful";

import { formatVariantName } from "../../../../lib/format-variant-name";

import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { ROUTES } from "@utils/routes";
import { PrintfulProduct } from "src/types";
import { getContentfulProducts } from "../../../../utils/useContentful";

// Define the expected response data types
type Data = {
  // id: string;
  // name?: string;
  // mainDescription?: string;
  productDetails?: string;
  // additionalInfo?: string;
  // images?: any;
  // price?: number;
  url: string;
  // contentfulData?: any;
  // printfulData?: any;
  printfulProducts?: any;
  combinedProductData?: any;
};

type Error = {
  errors: { key: string; message: string }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  try {
    const { result: products } = await printful.get("sync/products");

    // Use Id's to fetch printful product information
    const allPrintfulProducts = await Promise.all(
      products.map(
        async ({ id }: any) => await printful.get(`sync/products/${id}`)
      )
    );

    // Put together a list of new objects of PrintfulProduct
    const printfulProducts: PrintfulProduct[] = allPrintfulProducts.map(
      // Make a new object by destructuring and extracting sync_product and sync_variants
      ({ result: { sync_product, sync_variants } }) => ({
        ...sync_product,
        variants: sync_variants.map(({ name, ...variant }: any) => ({
          name: formatVariantName(name),
          ...variant,
        })),
      })
    );

    // Use Id's to fetch contentful product information
    const contentfulProducts = await getContentfulProducts();

    // Combine Printful and Contentful data
    let combinedProductData = null;

    if (contentfulProducts) {
      combinedProductData = printfulProducts.map((product) => {
        const contentfulEntry = contentfulProducts.find((entry: any) => {
          return entry.fields.printfulId === String(product.id);
        });

        return {
          printfulData: { ...product },
          contentfulData:
            contentfulEntry === undefined ? null : contentfulEntry,
        };
      });
    }

    /**
       Set the caching headers for the response
     
       Sets the maximum age for shared caches (such as proxies) to cache the 
       response to 3600 seconds (1 hour) and indicates that the cache can 
       continue to serve the stale response while revalidating it with the 
       origin server in the background. 
    */
    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate, Access-Control-Allow-Origin"
    );

    // Respond with the variant data, including the ID, price, and URL
    res.status(200).json({
      // id: slug as string,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.PRODUCT}`,
      // contentfulData: {
      //   name: contentfulProductData?.fields?.name,
      //   mainDescription: contentfulProductData?.fields?.mainDescription,
      //   productDetails: contentfulProductData?.fields?.productDetails,
      //   additionalInfo: contentfulProductData?.fields?.additionalInfo,
      //   images: contentfulProductData?.fields?.images,
      // },
      // printfulData: {
      //   ...newObj,
      // },
      printfulProducts,
      combinedProductData,
    });
  } catch (error: any) {
    // Log any errors that occur during the request
    console.log(error);
    console.log("/api/product/printful/:slug errors");
    // If an error occurred, respond with a 404 error and the error message
    res.status(404).json({
      errors: [
        {
          key: error?.message,
          message: error?.message,
        },
      ],
    });
  }
}
