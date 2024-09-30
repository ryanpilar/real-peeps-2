import cn from "classnames";
import Image from "next/image";

import type { FC } from "react";

import { useState } from "react";

import { useUI } from "@contexts/ui.context";
import usePrice from "@framework/product/use-price";

import ProductViewIcon from "@components/icons/product-view-icon";
import ProductCompareIcon from "@components/icons/product-compare-icon";

import VariantPicker from "./product-variant-picker";

import RatingDisplay from "@components/common/rating-display";

interface ProductProps {
  product: any;

  className?: string;
  contactClassName?: string;
  imageContentClassName?: string;
  variant?:
  | "grid"
  | "gridSlim"
  | "list"
  | "listSmall"
  | "gridModern"
  | "gridModernWide"
  | "gridTrendy"
  | "rounded"
  | "circle";
  imgWidth?: number | string;
  imgHeight?: number | string;
  imgLoading?: "eager" | "lazy";
  hideProductDescription?: boolean;
  showCategory?: boolean;
  showRating?: boolean;
  bgTransparent?: boolean;
  bgGray?: boolean;
  demoVariant?: "ancient";
  disableBorderRadius?: boolean;
  contentfulData?: any;
}


const ProductCard: FC<ProductProps> = ({
  product,
  className = "",
  contactClassName = "",
  imageContentClassName = "",
  variant = "list",
  imgWidth = 340,
  imgHeight = 440,
  imgLoading,
  hideProductDescription = false,
  showCategory = false,
  showRating = false,
  bgTransparent = false,
  bgGray = false,
  demoVariant,
  disableBorderRadius = false,
  contentfulData,
}) => {

  const { id, size, variants } = product;

  // gets the first variant from the list
  const [firstVariant] = variants;
  // checks if there's only one variant
  const oneStyle = variants.length === 1;

  // sets the active variant to the first one
  const [activeVariantExternalId, setActiveVariantExternalId] = useState(firstVariant.external_id)

  // gets the active variant object based on the active variant external id
  const activeVariant = variants.find((v: any) => v.external_id === activeVariantExternalId)

  // gets the active variant's file with type "preview"
  const activeVariantFile = activeVariant.files.find(({ type }: any) => type === "preview")

  const formattedPrice = new Intl.NumberFormat("en-CA", { style: "currency", currency: activeVariant.currency })
    .format(activeVariant.retail_price);

  const { openModal, setModalView, setModalData } = useUI()

  const placeholderImage = `/assets/placeholder/products/product-${variant}.svg`;

  const { price, basePrice, discount } = usePrice({
    amount: Number(activeVariant.retail_price),
    baseAmount: Number(activeVariant.retail_price),
    currencyCode: "CAD",
  });

  console.log("price, basePrice, discount", price, basePrice, discount)

  product.price = Number(activeVariant.retail_price)
  product.isProductFromPrintful = true
  product.slug = product.id;
  product.image = product.thumbnail_url
  product.description = contentfulData?.fields?.mainDescription
    ? contentfulData.fields.mainDescription
    : "Put a Fantastic description here"

  product.contentfulProductName = contentfulData?.fields?.name


  function handlePopupView() {
    console.log('ONCHANGE TESTY', product)
    console.log('ONCHANGE activeVariantExternalId', activeVariantExternalId)
    product.userSelectedExternalId = activeVariantExternalId
    setModalData({ data: product });
    setModalView("PRODUCT_VIEW");
    return openModal();
  }

  return (
    <div
      className={cn(
        `group box-border overflow-hidden flex ${!disableBorderRadius && "rounded-md"
        } cursor-pointer`,
        {
          "pe-0 pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-product":
            variant === "grid" ||
            variant === "gridModern" ||
            variant === "gridModernWide" ||
            variant === "gridTrendy",
          " bg-white":
            (variant === "grid" && !bgGray) ||
            (variant === "gridModern" && !bgGray) ||
            (variant === "gridModernWide" && !bgGray) ||
            (variant === "gridTrendy" && !bgGray) ||
            (variant === "gridSlim" && !bgGray),
          "bg-gray-200": variant === "list" || bgGray,
          "pe-0 md:pb-1 flex-col items-start": variant === "gridSlim",
          "items-center border border-gray-100 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-listProduct":
            variant === "listSmall",
          "flex-row items-center transition-transform ease-linear pe-2 lg:pe-3 2xl:pe-4":
            variant === "list",
          "bg-transparent": variant === "grid" && bgTransparent === true,
        },
        className
      )}
      // onClick={handlePopupView}
      role="button"
      title={contentfulData?.fields?.name}
    >
      <div
        className={cn(
          "flex",
          {
            "mb-3 md:mb-3.5": variant === "grid",
            "mb-3 md:mb-3.5 pb-0": variant === "gridSlim",
            "flex-shrink-0 w-32 sm:w-44 md:w-36 lg:w-44":
              variant === "listSmall",
            "mb-3 md:mb-3.5 relative":
              variant === "gridModern" ||
              variant === "gridModernWide" ||
              variant === "gridTrendy",
          },
          imageContentClassName
        )}
        onClick={handlePopupView}
      >
        <Image
          src={product?.thumbnail_url ?? placeholderImage}
          width={demoVariant === "ancient" ? 352 : imgWidth}
          height={demoVariant === "ancient" ? 452 : imgHeight}
          loading={imgLoading}
          quality={100}
          alt={product.contentfulProductName || "Product Image"}
          className={cn(
            `bg-gray-300 object-cover ${!disableBorderRadius && "rounded-s-md"
            }`,
            {
              "w-full transition duration-200 ease-in":
                variant === "grid" ||
                variant === "gridModern" ||
                variant === "gridModernWide" ||
                variant === "gridTrendy",
              "rounded-md group-hover:rounded-b-none":
                (variant === "grid" && !disableBorderRadius) ||
                (variant === "gridModern" && !disableBorderRadius) ||
                (variant === "gridModernWide" && !disableBorderRadius) ||
                (variant === "gridTrendy" && !disableBorderRadius),
              "rounded-md transition duration-150 ease-linear transform group-hover:scale-105":
                variant === "gridSlim",
              "rounded-s-md transition duration-200 ease-linear transform group-hover:scale-105":
                variant === "list",
            }
          )}
        />

        <div className="absolute top-3.5 md:top-5 3xl:top-7 start-3.5 md:start-5 3xl:start-7 flex flex-col gap-y-1 items-start">

          {discount &&
            (variant === "gridModernWide" ||
              variant === "gridModern" ||
              variant === "gridTrendy") && (
              <span className="bg-heading text-white text-10px md:text-xs leading-5 rounded-md inline-block px-1 sm:px-1.5 xl:px-2 py-0.5 sm:py-1">
                <p>
                  <span className="sm:hidden">-</span>
                  {discount} <span className="hidden sm:inline">OFF</span>
                </p>
              </span>
            )}

          {product?.isNewArrival &&
            (variant === "gridModernWide" ||
              variant === "gridModern" ||
              variant === "gridTrendy") && (
              <span className="bg-[#B26788] text-white text-10px md:text-xs leading-5 rounded-md inline-block px-1.5 sm:px-1.5 xl:px-2 py-0.5 sm:py-1">
                <p>
                  New <span className="hidden sm:inline">Arrival</span>
                </p>
              </span>
            )}
        </div>

        {variant === "gridModernWide" && (
          <div className="absolute end-2 sm:end-3 bottom-6 space-y-2 w-[32px] sm:w-[42px] lg:w-[52px]">
            <ProductViewIcon className="transition ease-in duration-300 sm:opacity-0 group-hover:opacity-100 delay-100 w-full bg-white rounded-md" />
            <ProductCompareIcon className="transition ease-in duration-300 sm:opacity-0 group-hover:opacity-100 delay-300 w-full bg-white rounded-md" />
          </div>
        )}
      </div>
      <div
        className={cn(
          "w-full overflow-hidden p-2",
          {
            "md:px-2.5 xl:px-4": variant === "grid",
            "px-2 md:px-2.5 xl:px-4 h-full flex flex-col":
              variant === "gridModern" ||
              variant === "gridModernWide" ||
              variant === "gridTrendy",
            "ps-0": variant === "gridSlim",
            "px-4 lg:px-5 2xl:px-4": variant === "listSmall",
          },
          contactClassName
        )}
      >
        {(variant === "gridModern" ||
          variant === "gridModernWide" ||
          variant === "gridTrendy") && (
            <div className="py-2 flex items-center gap-x-2">
              <svg
                className="w-4 h-4 sm:w-6 sm:h-6 text-[#FBD103]"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span className="text-xs sm:text-sm text-heading font-semibold truncate">
                4.5
              </span>
              {product.quantity === 0 && (
                <span className="text-xs sm:text-sm leading-5 ps-3 font-semibold text-[#EF4444]">
                  Out of stock
                </span>
              )}
            </div>
          )}

        {!!(showCategory || showRating) && (
          <div className="flex flex-col md:flex-row md:items-center lg:flex-row xl:flex-row 2xl:flex-row  mb-0.5 items-start">
            {!!showCategory && (
              <h3
                className={cn(
                  "font-semibold text-sm mb-1 md:mb-0 me-2 md:me-3",
                  {
                    "text-white": bgTransparent,
                    "text-black/70": !bgTransparent,
                  }
                )}
              >
                Category
              </h3>
            )}
            {!!showRating && <RatingDisplay rating={2.5} />}
          </div>
        )}
        <h2
          className={cn("truncate mb-1", {
            "text-sm md:text-base": variant === "grid",
            "font-semibold": demoVariant !== "ancient",
            "font-bold": demoVariant === "ancient",
            "text-xs sm:text-sm md:text-base":
              variant === "gridModern" ||
              variant === "gridModernWide" ||
              variant === "gridTrendy",
            "md:mb-1.5 text-sm sm:text-base md:text-sm lg:text-base xl:text-lg":
              variant === "gridSlim",
            "text-sm sm:text-base md:mb-1.5 pb-0": variant === "listSmall",
            "text-sm sm:text-base md:text-sm lg:text-base xl:text-lg md:mb-1.5":
              variant === "list",
            "text-white": bgTransparent,
            "text-heading": !bgTransparent,
          })}
          onClick={handlePopupView}
        >
          {product?.contentfulProductName}
        </h2>
        {!hideProductDescription && product?.description && (
          <p
            onClick={handlePopupView}
            className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate"
          >
            {product?.description}
          </p>
        )}
        <div
          className={`font-semibold text-sm sm:text-base mt-1.5  ${variant === "grid"
            ? "lg:text-lg lg:mt-2.5"
            : "sm:text-xl md:text-base lg:text-xl md:mt-2.5 2xl:mt-3"
            }
          ${variant === "gridModern" ||
              variant === "gridModernWide" ||
              variant === "gridTrendy"
              ? "flex flex-col-reverse !space-s-0 !mt-auto"
              : ""
            } ${bgTransparent ? "text-white" : "text-heading"}`}
        >
          <span className={`inline-block  mb-1 ${demoVariant === "ancient" && "font-bold text-gray-900 text-lg"}`}>
            {formattedPrice}
          </span>

          {discount && (
            <del
              className={`sm:text-base font-normal ${bgTransparent ? "text-white/70" : "text-gray-800"
                }`}
            >
              {basePrice} {variants.length}
            </del>
          )}

        </div>

        {/* DROPDOWN VARIANTS */}
        <div className={`flex items-center ${variants.length <= 1 ? 'justify-end' : 'justify-between'} gap-x-1.5`}>
          <VariantPicker
            value={activeVariantExternalId}
            onChange={({ target: { value } }: any) => setActiveVariantExternalId(value)}
            variants={variants}
            disabled={oneStyle}
          />
          {product?.description && product.contentfulProductName && (
            <button
              className={`
                snipcart-add-item 
                flex-shrink-0 w-auto transition py-2 px-4  
                border border-gray-300 hover:border-transparent shadow-sm rounded
                text-sm font-medium bg-white text-gray-900 focus:text-white 
                hover:bg-blue-600 hover:text-white 
                focus:bg-blue-600 focus:outline-none 
              `}
              data-item-id={activeVariantExternalId}
              data-item-price={activeVariant.retail_price}
              data-item-url={`/api/products/${activeVariantExternalId}`}
              data-item-description={product?.description}
              data-item-image={activeVariantFile.preview_url}
              data-item-name={`${product.contentfulProductName} - ${activeVariant.name}`}
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
