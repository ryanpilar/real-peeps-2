import * as React from "react";

import BannerCard from "@components/common/banner-card";
import Container from "@components/ui/container";
import BrandGridBlock from "@containers/brand-grid-block";
import CategoryBlock from "@containers/category-block";
import Layout from "@components/layout/layout";
import BannerWithProducts from "@containers/banner-with-products";
import BannerBlock from "@containers/banner-block";
import Divider from "@components/ui/divider";
import DownloadApps from "@components/common/download-apps";
import Support from "@components/common/support";
import Instagram from "@components/common/instagram";
import ProductsFlashSaleBlock from "@containers/product-flash-sale-block";
import ProductsFeatured from "@containers/products-featured";
import BannerSliderBlock from "@containers/banner-slider-block";
import ExclusiveBlock from "@containers/exclusive-block";
import Subscription from "@components/common/subscription";
import NewArrivalsProductFeed from "@components/product/feeds/new-arrivals-product-feed";
import PrintfulProductFeed from "@components/product/feeds/printful-product-feed";

import { homeThreeBanner as banner } from "@framework/static/banner";
import { homeThreeMasonryBanner as masonryBanner } from "@framework/static/banner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import { GetStaticProps } from "next";

// import shuffle from "lodash";
import { printful } from "../lib/printful-client";
import { formatVariantName } from "../lib/format-variant-name";

import { PrintfulProduct } from "src/types";

// import { shuffle } from "lodash";

type IndexPageProps = {
  printfulProducts: PrintfulProduct[];
};

const Home: React.FC<IndexPageProps> = ({ printfulProducts }) => {
  // export default function Home({ products }) {
  return (
    <>
      <BannerBlock data={masonryBanner} />

      <Container>
        <PrintfulProductFeed printfulProducts={printfulProducts} />
      </Container>

      <Container>
        <ProductsFlashSaleBlock date={"2023-03-01T01:02:03"} />
      </Container>

      <BannerSliderBlock />

      <Container>
        <CategoryBlock sectionHeading="text-shop-by-category" type="rounded" />
        <ProductsFeatured sectionHeading="text-featured-products" limit={5} />
        <BannerCard
          key={`banner--key${banner[0].id}`}
          banner={banner[0]}
          href={`${ROUTES.COLLECTIONS}/${banner[0].slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
        />
        <BrandGridBlock sectionHeading="text-top-brands" />
        <BannerCard
          key={`banner--key${banner[1].id}`}
          banner={banner[1]}
          href={`${ROUTES.COLLECTIONS}/${banner[1].slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
        />
        <BannerWithProducts
          sectionHeading="text-on-selling-products"
          categorySlug="/search"
        />
        <ExclusiveBlock />
        <NewArrivalsProductFeed />
        <DownloadApps />
        <Support />
        <Instagram />
        <Subscription className="bg-opacity-0 px-5 sm:px-16 xl:px-0 py-12 md:py-14 xl:py-16" />
      </Container>
      <Divider className="mb-0" />
    </>
  );
};

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { result: productIds } = await printful.get("sync/products");

  console.log("productIds", productIds);

  const allProducts = await Promise.all(
    productIds.map(async ({ id }) => await printful.get(`sync/products/${id}`))
  );

  console.log("allProducts", allProducts);

  const printfulProducts: PrintfulProduct[] = allProducts.map(
    ({ result: { sync_product, sync_variants } }) => ({
      ...sync_product,
      variants: sync_variants.map(({ name, ...variant }) => ({
        name: formatVariantName(name),
        ...variant,
      })),
    })
  );

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
      printfulProducts,
    },
  };
};

export default Home;
