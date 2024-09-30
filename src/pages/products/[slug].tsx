import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import ProductSingleDetails from "@components/product/product-single-details";
import RelatedProducts from "@containers/related-products";
import Divider from "@components/ui/divider";
import Breadcrumb from "@components/common/breadcrumb";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { QueryClient } from "react-query";
import { fetchPrintfulProduct } from "../../framework/basic-rest/product/get-printful-product";
import { API_ENDPOINTS } from "../../framework/basic-rest/utils/api-endpoints";
import { useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";

export default function ProductPage({ printfulProduct, slug }: any) {

  const router = useRouter();
  if (router.isFallback) return null;

  const { data: printfulProductData } = useQuery(
    [API_ENDPOINTS.PRINTFUL_PRODUCT, slug],
    async () => await fetchPrintfulProduct(slug),
    { initialData: printfulProduct }
  )

  return (
    <>
      <Divider className="mb-0" />
      <Container>
        <div className="pt-8">
          <Breadcrumb />
        </div>
        <ProductSingleDetails productDetails={printfulProductData} />
        <RelatedProducts sectionHeading="text-related-products" />
        <Subscription />
      </Container>
    </>
  );
}

ProductPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {

  const queryClient = new QueryClient();
  const { slug = null }: any = params;

  // run the data fetch request through react-query for PWA
  await queryClient.prefetchQuery([API_ENDPOINTS.PRINTFUL_PRODUCT, slug], () =>
    fetchPrintfulProduct(slug)
  )

  let printfulProduct = await fetchPrintfulProduct(slug);

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
      dehydratedState: dehydrate(queryClient),
    },
  };
};
