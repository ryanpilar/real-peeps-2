import * as React from "react";

import BannerBlock from "@containers/banner-block";

import StoryPanel from "@containers/home-story-panel";
import OriginalWorksBlock from "@containers/home-original-works-block";
import BigImageBlock from "@containers/home-big-image-block";
import StoryPanelTwo from "@containers/home-story-panel-2";
import BigImagePanel from "@containers/home-two-big-images-block";
import StoryPanelThree from "@containers/home-story-panel-3";
import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Divider from "@components/ui/divider";


// import PrintfulProductFeed from "@components/product/feeds/printful-product-feed";

import { homeThreeMasonryBanner as masonryBanner } from "@framework/static/banner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

import { printful } from "../lib/printful-client";
import { formatVariantName } from "../lib/format-variant-name";

import { PrintfulProduct } from "src/types";

import { getContentfulProducts } from "../utils/useContentful";

type IndexPageProps = {
  printfulProducts: PrintfulProduct[];
  combinedProductData: any;
};

const Home: React.FC<IndexPageProps> = ({
  printfulProducts,
  combinedProductData,
}) => {
  const initialData = { printfulProducts, combinedProductData };

  const originalWorksData = {
    heading: "Original Works Of Art",

    image: {
      path: "/assets/images/hero/works-of-art.png",
      alt: "A central masterpiece takes the spotlight, encircled by an assortment of charming framed artworks. Each piece tells its story and awaits a new admirer to take it home.",
      width: 1920,
      height: 1920,
    },
    image2: {
      path: "/assets/images/hero/works-of-art-2.png",
      alt: "Upscale car showroom with elegant gallery art, featuring a brilliantly lit centerpiece artwork surrounded by subtly shaded artworks, offering a unique setting for art appreciation.",
      width: 1920,
      height: 1076,
    },
  };

  const limitedRunApparelData = {
    heading: "Limited Run Apparel",

    image: {
      path: "/assets/images/hero/limited-run-apparel.png",
      alt: "Young adults, store employees showcasing fashionable white printed t-shirts, within an aesthetically appealing boutique adorned with warm, inviting lighting.",
      width: 1920,
      height: 1920,
    },
  };

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
      path: "/assets/images/hero/white-tshirt-male-mountains.png",
      alt: "Young adults, store employees showcasing fashionable white printed t-shirts, within an aesthetically appealing boutique adorned with warm, inviting lighting.",
      width: 1920,
      height: 1920,
    },
    imageTwo: {
      path: "/assets/images/hero/white-tshirt-male-female-shop-background.png",
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

  const storyPanelThreeData = {
    heading: "",
    backgroundColour: "#202424",
    story:
      "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah ",
    title: "common:text-subscribe-heading",
    description: "common:text-subscribe-description",
    buttonText: "common:button-subscribe",
  };

  // const { data: printfulProductsData } = useQuery(
  //   [API_ENDPOINTS.PRINTFUL_PRODUCT],
  //   async () => {
  //     const data = await fetchPrintfulProducts();
  //     return data;
  //   },
  //   {
  //     initialData: initialData,
  //   }
  // );

  return (
    <>
      <BannerBlock data={masonryBanner} />

      <Container>
        <StoryPanel />
        <OriginalWorksBlock data={originalWorksData} />
        <BigImageBlock data={limitedRunApparelData} />
        <StoryPanelTwo data={storyPanelTwoData} />
        <BigImagePanel data={bigPanelData} />
        <StoryPanelThree data={storyPanelThreeData} />
        {/* <PrintfulProductFeed
          // printfulProducts={printfulProductsData.printfulProducts}
          // combinedProductData={printfulProductsData.combinedProductData}
          printfulProducts={printfulProducts}
          combinedProductData={combinedProductData}
        /> */}

        <Divider className="mt-2 mb-0 sm:px-5 md:px-7 lg:px-10 xl:px-20 2xl:px-40 sm:mx-5 md:mx-7 lg:mx-10 xl:mx-20 2xl:mx-40" />
      </Container>
    </>
  );
};

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // const queryClient = new QueryClient();

  console.log("HEY TESTY");

  // run the data fetch request through reat-query for PWA
  // await queryClient.prefetchQuery(
  //   [API_ENDPOINTS.PRINTFUL_PRODUCT],
  //   async () => await fetchPrintfulProducts()
  // );

  const { result: products } = await printful.get("sync/products");
  console.log("Home Page printful products", products);

  // Use Id's to fetch printful product information
  const allPrintfulProducts = await Promise.all(
    products.map(
      async ({ id }: any) => await printful.get(`sync/products/${id}`)
    )
  );

  console.log("Home Page VARIANTS and printful products", allPrintfulProducts);

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
        contentfulData: contentfulEntry === undefined ? null : contentfulEntry,
      };
    });
  }

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
      printfulProducts,
      combinedProductData,
      // dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
