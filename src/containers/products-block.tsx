import React from "react";
import SectionHeader from "@components/common/section-header";
import ProductCard from "@components/product/product-card";

import PrintfulProductCard from "@components/product/printful-product-card";
// import PrintfulProductCard2 from "@components/product/printful-product-card-2";

import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { Product } from "@framework/types";
import Alert from "@components/ui/alert";
import cn from "classnames";
import { PrintfulProduct } from "src/types";

interface ProductsProps {
  sectionHeading?: any;
  categorySlug?: string;
  className?: string;
  products?: Product[];
  loading: boolean;
  error?: string;
  uniqueKey?: string;
  variant?:
  | "circle"
  | "rounded"
  | "listSmall"
  | "grid"
  | "gridSlim"
  | "list"
  | "gridModern"
  | "gridModernWide"
  | "gridTrendy"
  | undefined;
  limit?: number;
  imgWidth?: number | string;
  imgHeight?: number | string;
  hideProductDescription?: boolean;
  showCategory?: boolean;
  showRating?: boolean;
  demoVariant?: "ancient";
  disableBorderRadius?: boolean;
  printfulProducts?: PrintfulProduct[];
  combinedProductData?: any;
}

const ProductsBlock: React.FC<ProductsProps> = ({
  sectionHeading,
  categorySlug,
  className = "mb-9 md:mb-10 xl:mb-12",
  products,
  loading,
  error,
  uniqueKey,
  variant = "grid",
  limit = 10,
  imgWidth,
  imgHeight,
  hideProductDescription = false,
  showCategory = false,
  showRating = false,
  demoVariant,
  disableBorderRadius = false,
  printfulProducts,
  combinedProductData,
}) => {
  return (
    <div className={className}>

      {sectionHeading && (
        <SectionHeader
          sectionHeading={sectionHeading}
          categorySlug={categorySlug}
        />
      )}

      {error ? (
        <Alert message={error} />
      ) : (
        <div
          className={cn(
            `grid gap-x-${demoVariant === "ancient" ? 2 : 3} md:gap-x-${demoVariant === "ancient" ? 2 : 5
            } xl:gap-x-${demoVariant === "ancient" ? 2 : 7} gap-y-${demoVariant === "ancient" ? 2 : 3
            } xl:gap-y-${demoVariant === "ancient" ? 2 : 5} 2xl:gap-y-${demoVariant === "ancient" ? 3 : 8
            } bg-white`,
            {
              "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5":
                variant === "grid",
              "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4":
                variant === "gridModernWide",
              "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5":
                variant === "gridModern",
            }
          )}
        >
          {/* {loading && !products?.length ? (
            <ProductFeedLoader limit={limit} uniqueKey={uniqueKey} />
          ) : (
            products?.map((product: Product) => (
              <ProductCard
                showCategory={showCategory}
                showRating={showRating}
                hideProductDescription={hideProductDescription}
                key={`product--key${product.id}`}
                product={product}
                imgWidth={imgWidth}
                imgHeight={imgHeight}
                variant={variant}
                demoVariant={demoVariant}
                disableBorderRadius={disableBorderRadius}
              />
            ))
          )} */}
          {/* 
          {loading && printfulProducts ? (
          
            <ProductFeedLoader limit={limit} uniqueKey={uniqueKey} />
          ) : (
            printfulProducts?.map((product) => (
              <PrintfulProductCard
                showCategory={showCategory}
                showRating={showRating}
                hideProductDescription={hideProductDescription}
                key={`product--key${product.id}`}
                imgWidth={imgWidth}
                imgHeight={imgHeight}
                variant={variant}
                demoVariant={demoVariant}
                disableBorderRadius={disableBorderRadius}
                product={product}

                // printfulProducts={printfulProducts}
              />
            ))
          )} */}

          {/* {printfulProducts &&
            printfulProducts?.map((product) => (
              <PrintfulProductCard
                showCategory={showCategory}
                showRating={showRating}
                hideProductDescription={hideProductDescription}
                key={`product--key${product.id}`}
                imgWidth={imgWidth}
                imgHeight={imgHeight}
                variant={variant}
                demoVariant={demoVariant}
                disableBorderRadius={disableBorderRadius}
                product={product}

              />
            ))} */}

          {combinedProductData &&
            combinedProductData?.map((product: any) => (
              // {
              // console.log("TEST PRODUCT", product);

              <PrintfulProductCard
                showCategory={showCategory}
                showRating={showRating}
                hideProductDescription={hideProductDescription}
                key={`product--key${product.printfulData.id}`}
                imgWidth={imgWidth}
                imgHeight={imgHeight}
                variant={variant}
                demoVariant={demoVariant}
                disableBorderRadius={disableBorderRadius}
                product={product.printfulData}
                contentfulData={product.contentfulData}

              // printfulProducts={printfulProducts}
              />
              // }
            ))}
        </div>
      )}
    </div>
  );
};

export default ProductsBlock;
