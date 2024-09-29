import Container from "@components/ui/container"
import Divider from "@components/ui/divider"
import Layout from "@components/layout/layout"
import { GetStaticProps } from "next"
import { QueryClient } from "react-query"
import { dehydrate } from "react-query/hydration"
import { API_ENDPOINTS } from "@framework/utils/api-endpoints"
import { fetchFlashSaleProducts } from "@framework/product/get-all-flash-sale-products"
import { fetchCategories } from "@framework/category/get-all-categories"
import { fetchBestSellerProducts } from "@framework/product/get-all-best-seller-products"
import { fetchNewArrivalProducts } from "@framework/product/get-all-new-arrival-products"
import { fetchBrands } from "@framework/brand/get-all-brands"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import TheBeginning from "@containers/about-the beginning"
import TheImmersiveJourney2 from "@containers/about-the-immersive-journey-2"
import CommunityAndCommitment2 from "@containers/about-community-and-commitment-2"
import BigThreeSectionBlock from "@containers/about-big-three-section-block"
import BigThreeSectionBlockReverse from "@containers/about-big-three-section-block-reverse"

/* ------------------------------------|| About - PAGE ||------------------------------------ */

export default function About() {

  // const { openModal, setModalView } = useUI()

  // useEffect(() => {
  //   setModalView("NEWSLETTER_VIEW")
  //   setTimeout(() => {
  //     openModal()
  //   }, 2000)
  // }, [])

  return (

    <>
      <Container className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16">
        <TheBeginning />
        <BigThreeSectionBlock />
        <TheImmersiveJourney2 data={{ data: { backgroundColor: "#202424" } }} />
        <BigThreeSectionBlockReverse />
        <CommunityAndCommitment2 data={{ data: { backgroundColor: "#202424" } }} />
        <Divider className="mt-20" />
      </Container>
    </>
  );
}

About.Layout = Layout

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(
    [API_ENDPOINTS.FLASH_SALE_PRODUCTS, { limit: 10 }],
    fetchFlashSaleProducts
  );
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.CATEGORIES, { limit: 10 }],
    fetchCategories
  );
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.BEST_SELLER_PRODUCTS, { limit: 10 }],
    fetchBestSellerProducts
  );
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS, { limit: 10 }],
    fetchNewArrivalProducts
  );
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.BRANDS, { limit: 0 }],
    fetchBrands
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
    revalidate: 60,
  }
}