import type { NextApiRequest, NextApiResponse } from "next";
import { printful } from "../../../../lib/printful-client";
import { getContentfulProductById } from "../../../../utils/useContentful";

import { formatVariantName } from "../../../../lib/format-variant-name";

import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { ROUTES } from "@utils/routes";

// Define the expected response data types
type Data = {
  id: string;
  name?: string;
  mainDescription?: string;
  productDetails?: string;
  additionalInfo?: string;
  images?: any;
  price?: number;
  url: string;
  contentfulData?: any;
  printfulData?: any;
};

type Error = {
  errors: { key: string; message: string }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  // Extract the 'id' query parameter from the request object
  const { slug } = req.query;
  console.log("API RESPONSE! FOR:", slug);

  try {
    // Get Printful product data
    const printfulProductData = await printful.get(`sync/products/${slug}`);
    console.log("PRODUCT DATA FROM API RESPONSE", printfulProductData);

    // Make a new object by destructuring and extracting sync_product and sync_variants
    const { sync_product, sync_variants } = printfulProductData.result;
    const newObj = {
      ...sync_product,
      variants: sync_variants.map(({ name, ...variant }: any) => ({
        name: formatVariantName(name),
        ...variant,
      })),
    };

    // Use Printful id to get additional data from Contentful
    const contentfulProductData = await getContentfulProductById(slug);

    /**
       Set the caching headers for the response
     
       Sets the maximum age for shared caches (such as proxies) to cache the 
       response to 3600 seconds (1 hour) and indicates that the cache can 
       continue to serve the stale response while revalidating it with the 
       origin server in the background. 
    */
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    // Respond with the variant data, including the ID, price, and URL
    res.status(200).json({
      id: slug as string,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.PRODUCT}/${slug}`,
      contentfulData: {
        name: contentfulProductData?.fields?.name,
        mainDescription: contentfulProductData?.fields?.mainDescription,
        productDetails: contentfulProductData?.fields?.productDetails,
        additionalInfo: contentfulProductData?.fields?.additionalInfo,
        images: contentfulProductData?.fields?.images,
      },
      printfulData: {
        ...newObj,
      },
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
