import Button from "@components/ui/button";
import type { FC } from "react";
import { useProductsQuery } from "@framework/product/get-all-printful-products";
import { useRouter } from "next/router";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useTranslation } from "next-i18next";
import PrintfulProductCard from "@components/product/printful-product-card";

interface ProductGridProps {
  className?: string;
}
export const ProductGrid: FC<ProductGridProps> = ({ className = "" }) => {
  const { query } = useRouter();

  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useProductsQuery({ limit: 100, ...query });

  if (error)
    return <p>- ERROR - COMING FROM useProductsQuery: {error.message}</p>;

  const { t } = useTranslation("common");

  return (
    <>
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
      >
        {isLoading && !data?.pages?.length ? (
          <ProductFeedLoader limit={20} uniqueKey="search-product" />
        ) : (
          data?.pages?.map((page) => {
            return page?.data?.map((product: any) => {
              console.log('product', product)
              return (

                <PrintfulProductCard
                  showCategory={false}
                  showRating={false}
                  hideProductDescription={false}
                  key={`product--key${product.printfulData.id}`}
                  //   imgWidth={imgWidth}
                  //   imgHeight={imgHeight}
                  variant="grid"
                  //   demoVariant={'ancient'}
                  disableBorderRadius={false}
                  product={product.printfulData}
                  contentfulData={product.contentfulData}
                />
              )
            });
          })
        )}
      </div>
      <div className="text-center pt-8 xl:pt-14">
        {hasNextPage && (
          <Button
            loading={loadingMore}
            disabled={loadingMore}
            onClick={() => fetchNextPage()}
            variant="slim"
          >
            {t("button-load-more")}
          </Button>
        )}
      </div>
    </>
  );
};
