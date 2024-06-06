import BannerCard from "@components/common/banner-card";
import Container from "@components/ui/container";
import CollectionBlock from "@containers/collection-block";
import BannerCarouselBlock from "@containers/banner-carousel-block";
import Divider from "@components/ui/divider";
import DownloadApps from "@components/common/download-apps";
import Support from "@components/common/support";
import Subscription from "@components/common/subscription";
import HeroBlock from "@containers/hero-block";
import BrandBlock from "@containers/brand-block";
import CategoryBlock from "@containers/category-block";
import FeatureBlock from "@containers/feature-block";
import Layout from "@components/layout/layout";
import FlashSaleBlock from "@components/product/feeds/flash-sale-product-feed";
import BestSellerProductFeed from "@components/product/feeds/best-seller-product-feed";
import NewArrivalsProductFeed from "@components/product/feeds/new-arrivals-product-feed";
import { homeOneBanner as banner } from "@framework/static/banner";
import { promotionBannerTwo as promotionBanners } from "@framework/static/banner";
import { GetStaticProps } from "next";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { fetchFlashSaleProducts } from "@framework/product/get-all-flash-sale-products";
import { fetchCategories } from "@framework/category/get-all-categories";
import { fetchBestSellerProducts } from "@framework/product/get-all-best-seller-products";
import { fetchNewArrivalProducts } from "@framework/product/get-all-new-arrival-products";
import { fetchBrands } from "@framework/brand/get-all-brands";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { collectionData as collection } from "@framework/static/collection";
import { useEffect } from "react";
import { ROUTES } from "@utils/routes";
import { useUI } from "@contexts/ui.context";
import StoryPanel from "@containers/story-panel";
import StoryPanelTwo from "@containers/home-story-panel-2";
import BigImagePanel from "@containers/home-two-big-images-block";
import TheBeginning from "@containers/about-the beginning";
import TheImmersiveJourney from "@containers/about-the-immersive-journey";
import TheImmersiveJourney2 from "@containers/about-the-immersive-journey-2";
import CommunityAndCommitment2 from "@containers/about-community-and-commitment-2";
import HeroBannerCarousel from "@containers/about-hero-banner-carousel";
import BigImagePanelReverse from "@containers/big-panel-reverse";
import BigImage from "@containers/big-image";
import BigThreeSectionBlock from "@containers/about-big-three-section-block";
import BigThreeSectionBlockReverse from "@containers/about-big-three-section-block-reverse";

export default function Home() {
  const { openModal, setModalView } = useUI();

  const storyPanelTwoData = {
    heading: "",
    backgroundColour: "#202424",
    story:
      "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah ",
  };
  const bigPanelData = {
    heading: "",
    backgroundColour: "",
    story: "",
    image: {
      path: "/assets/images/tshirts/white-tshirt-female-charcoal-lavender.png",
      alt: "Young adults, store employees showcasing fashionable white printed t-shirts, within an aesthetically appealing boutique adorned with warm, inviting lighting.",
      width: 1920,
      height: 1920,
    },
    imageTwo: {
      path: "/assets/images/tshirts/white-tshirt-female-male-shop-background-30s.png",
      alt: "Young adults, store employees showcasing fashionable white printed t-shirts, within an aesthetically appealing boutique adorned with warm, inviting lighting.",
      width: 960,
      height: 960,
    },
    imageThree: {
      path: "/assets/images/hero/logo-real-peeps-rusty-store-sign.png",
      alt: "Young adults, store employees showcasing fashionable white printed t-shirts, within an aesthetically appealing boutique adorned with warm, inviting lighting.",
      width: 960,
      height: 960,
    },
  };

  const bigPanelData2 = {
    heading: "",
    backgroundColour: "",
    story: "",
    image: {
      // path: "/assets/images/tshirts/white-tshirt-female-zucchini-flowers.png",
      path: "/assets/images/tshirts/white-tshirt-male-picasso-like.png",

      alt: "Young adults, store employees showcasing fashionable white printed t-shirts, within an aesthetically appealing boutique adorned with warm, inviting lighting.",
      width: 1920,
      height: 1920,
    },
    imageTwo: {
      path: "/assets/images/hero/logo-real-peeps-rusty-store-sign.png",
      alt: "Young adults, store employees showcasing fashionable white printed t-shirts, within an aesthetically appealing boutique adorned with warm, inviting lighting.",
      width: 960,
      height: 960,
    },
    imageThree: {
      path: "/assets/images/tshirts/white-tshirt-female-standing-beside-tree.png",
      alt: "Young adults, store employees showcasing fashionable white printed t-shirts, within an aesthetically appealing boutique adorned with warm, inviting lighting.",
      width: 960,
      height: 960,
    },
  };

  const bigPanelData3 = {
    heading: "",
    backgroundColour: "",
    story: "",
    image: {
      // path: "/assets/images/tshirts/white-tshirt-male-picasso-like.png",
      path: "/assets/images/tshirts/white-tshirt-female-zucchini-flowers.png",

      alt: "Young adults, store employees showcasing fashionable white printed t-shirts, within an aesthetically appealing boutique adorned with warm, inviting lighting.",
      width: 1920,
      height: 1920,
    },
  };

  useEffect(() => {
    setModalView("NEWSLETTER_VIEW");
    setTimeout(() => {
      openModal();
    }, 2000);
  }, []);
  return (
    <>
      <Container className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16">
        {/* <HeroBannerCarousel /> */}
        {/* <StoryPanelTwo data={storyPanelTwoData} /> */}
        <TheBeginning />
        {/* <StoryPanel /> */}
        <BigThreeSectionBlock />
        {/* <BigImagePanel data={bigPanelData} /> */}
        <TheImmersiveJourney2 data={{ data: { backgroundColor: "#202424" } }} />
        {/* <TheImmersiveJourney /> */}
        <BigThreeSectionBlockReverse />
        {/* <BigImagePanel data={bigPanelData2} /> */}

        {/* <StoryPanel /> */}
        {/* <TheImmersiveJourney2  data={{ data: { backgroundColor: "#202424" } }}/> */}
        <CommunityAndCommitment2
          data={{ data: { backgroundColor: "#202424" } }}
        />
        {/* <BigImage data={bigPanelData3} /> */}
        <Container>
          {/* <CategoryBlock sectionHeading="text-shop-by-category" /> */}
        </Container>

        {/* <Divider /> */}
        {/* <BestSellerProductFeed /> */}
        {/* <BannerCard
          key={`banner--key${banner.id}`}
          banner={banner}
          href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
          classNameInner="h-28 sm:h-auto"
        /> */}
        {/* <NewArrivalsProductFeed /> */}
        <Divider className="mt-20" />
        {/* <BrandBlock sectionHeading="text-top-brands" /> */}
        {/* <CollectionBlock data={collection} /> */}

        {/* <FlashSaleBlock /> */}

        {/* <BannerCarouselBlock bannerData={promotionBanners} /> */}

        {/* <DownloadApps className="bg-linen" /> */}
        {/* <Support /> */}
        {/* <Subscription className="bg-linen px-5 sm:px-8 md:px-16 2xl:px-24" /> */}
      </Container>
    </>
  );
}

Home.Layout = Layout;
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();

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
  };
};
