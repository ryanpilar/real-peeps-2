import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import ProductSingleDetails from "@components/product/product-single-details";
import RelatedProducts from "@containers/related-products";
import Divider from "@components/ui/divider";
import Breadcrumb from "@components/common/breadcrumb";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, GetServerSideProps } from "next";

import { usePrintfulProductQuery } from "@framework/product/get-printful-product";

import { QueryClient } from "react-query";

import { getContentfulProducts } from "@utils/useContentful";

import { fetchPrintfulProduct } from "../../framework/basic-rest/product/get-printful-product";
import { API_ENDPOINTS } from "../../framework/basic-rest/utils/api-endpoints";

import { useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";

export default function ProductPage({ printfulProduct, slug }: any) {
  const router = useRouter();

  if (router.isFallback) return null;

  // Data fetch/cache via react-query
  // const slug = printfulProduct.id;

  // const { data: printfulProductData } = useQuery(
  //   [API_ENDPOINTS.PRINTFUL_PRODUCT, slug],
  //   async () => {
  //     const data = await fetchPrintfulProduct(slug);
  //     return data;
  //   },
  //   {
  //     initialData: printfulProduct,
  //   }
  // );

  return (
    <>
      <Divider className="mb-0" />
      <Container>
        <div className="pt-8">
          <Breadcrumb />
        </div>
        {/* maybe remove: */}
        {/* {printfulProduct === undefined ? null : ( */}
        <ProductSingleDetails productDetails={printfulProduct} />
        {/* )} */}

        <RelatedProducts sectionHeading="text-related-products" />
        <Subscription />
      </Container>
    </>
  );
}

ProductPage.Layout = Layout;

// export async function getStaticPaths({ locales }: any) {
//   // Use Id's to fetch contentful product information
//   const contentfulProducts = await getContentfulProducts();
//   const paths = contentfulProducts.map((product: any) => {
//     return {
//       params: { slug: product.fields.printfulId.toString() },
//       // locale: locale !== "en" ? locale : undefined,
//       // locale: "en",
//     };
//   });

//   const localePaths = contentfulProducts.map((product: any) => {
//     // locales.map(() =>
//     return {
//       // locales.map((locale) => ({
//       params: { slug: product.fields.printfulId.toString() },
//       // locale: locale !== "en" ? locale : undefined,
//       locale: "en", // Pass locale here
//     };
//     // )
//   });
//   // .flat(); // Flatten array to avoid nested arrays
//   console.log("localePaths localePaths localePaths", localePaths);
//   console.log("paths paths paths", paths);

//   // return an object with the paths and fallback value
//   // return { paths, fallback: false };
//   // return { paths, fallback: true };
//   return { paths: [...paths, ...localePaths], fallback: false };
// }

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  // export const getServerSideProps: GetServerSideProps = async ({
  //   locale,
  //   params,
  // }) => {
  // const queryClient = new QueryClient();
  // const { slug }: any = params;
  const { slug = null }: any = params;
  console.log("slugslugslug", slug);

  // run the data fetch request through react-query for PWA
  // await queryClient.prefetchQuery([API_ENDPOINTS.PRINTFUL_PRODUCT, slug], () =>
  //   fetchPrintfulProduct(slug)
  // );

  // console.log("SLUGSLUG", slug, typeof slug);

  // this will fetch a printful product, and then look up additional data in contentful
  let printfulProduct = await fetchPrintfulProduct(slug);
  // printfulProduct = printfulProduct === undefined ? null : printfulProduct;
  console.log("fetched printfulProductTT", printfulProduct);

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
      printfulProduct,
      slug: slug,
      // dehydratedState: dehydrate(queryClient),
    },
  };
};
