import React, { useState } from "react";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";
import { ROUTES } from "@utils/routes";
import { useUI } from "@contexts/ui.context";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import { useCart } from "@contexts/cart/cart.context";
import { ProductAttributes } from "@components/product/product-attributes";
import { generateCartItem } from "@utils/generate-cart-item";
import usePrice from "@framework/product/use-price";
import { getVariations } from "@framework/utils/get-variations";
import { useTranslation } from "next-i18next";
import VariantPicker from "./product-variant-picker";

export default function ProductPopup() {
  const { t } = useTranslation("common");
  const {
    modalData: { data },
    closeModal,
    openCart,
  } = useUI();
  const router = useRouter();
  const { addItemToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [viewCartBtn, setViewCartBtn] = useState<boolean>(false);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const { price, basePrice, discount } = usePrice({
    amount: data.sale_price ? data.sale_price : data.price,
    baseAmount: data.price,
    currencyCode: "CAD",
  });

  // console.log("DATA", data, price, basePrice, discount);

  const variations = getVariations(data.variations);

  const { slug, image, name, description } = data;

  // if (data.isProductFromPrintful) {
  const { variants } = data;

  // gets the first variant from the list
  const [firstVariant] = variants;
  // checks if there's only one variant
  const oneStyle = variants.length === 1;

  // sets the active variant to the first one
  const [activeVariantExternalId, setActiveVariantExternalId] = useState(
    firstVariant.external_id
  );

  // gets the active variant object based on the active variant external id
  const activeVariant = variants.find(
    (v) => v.external_id === activeVariantExternalId
  );

  // gets the active variant's file with type "preview"
  const activeVariantFile = activeVariant.files.find(
    ({ type }) => type === "preview"
  );

  // formats the price to show in the CA dollar currency
  const formattedPrice = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: activeVariant.currency,
  }).format(activeVariant.retail_price);
  // }

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true;

  function addToCart() {
    if (!isSelected) return;
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
      setViewCartBtn(true);
    }, 600);
    const item = generateCartItem(data!, attributes);
    addItemToCart(item, quantity);
    console.log(item, "item");
  }

  function navigateToProductPage() {
    closeModal();
    router.push(`${ROUTES.PRODUCT}/${slug}`, undefined, {
      locale: router.locale,
    });
  }

  function handleAttribute(attribute: any) {
    setAttributes((prev) => ({
      ...prev,
      ...attribute,
    }));
  }

  function navigateToCartPage() {
    closeModal();
    setTimeout(() => {
      openCart();
    }, 300);
  }

  return (
    <div className="rounded-lg bg-white">
      <div className="flex flex-col lg:flex-row w-full md:w-[650px] lg:w-[960px] mx-auto overflow-hidden">
        <div className="flex-shrink-0 flex items-center justify-center w-full lg:w-430px max-h-430px lg:max-h-full overflow-hidden bg-gray-300">
          <img
            src={
              data.isProductFromPrintful
                ? image ?? "/assets/placeholder/products/product-thumbnail.svg"
                : image?.original ??
                  "/assets/placeholder/products/product-thumbnail.svg"
            }
            alt={name}
            className="lg:object-cover lg:w-full lg:h-full"
          />
        </div>

        <div className="flex flex-col p-5 md:p-8 w-full">
          <div className="pb-5">
            <div
              className="mb-2 md:mb-2.5 block -mt-1.5"
              onClick={navigateToProductPage}
              role="button"
            >
              <h2 className="text-heading text-lg md:text-xl lg:text-2xl font-semibold hover:text-black">
                {name}
              </h2>
            </div>
            <p className="text-sm leading-6 md:text-body md:leading-7">
              {description}
            </p>

            <div className="flex items-center mt-3 justify-between mb-4 space-s-3 sm:space-s-4">
              <div className="text-heading font-semibold text-base md:text-xl lg:text-2xl">
                {data.isProductPrintful ? formattedPrice : price}
              </div>
              {discount && (
                <del className="font-segoe text-gray-400 text-base lg:text-xl ps-2.5 -mt-0.5 md:mt-0">
                  {basePrice}
                </del>
              )}
            </div>
          </div>

          {/* //////////////////////////////////////////////// */}

          {Object.keys(variations).map((variation) => {
            return (
              <ProductAttributes
                key={`popup-attribute-key${variation}`}
                title={variation}
                attributes={variations[variation]}
                active={attributes[variation]}
                onClick={handleAttribute}
              />
            );
          })}

          <div className="pt-2 md:pt-4">
            <div className="flex items-center justify-between mb-4 space-s-3 sm:space-s-4">
              {/* <Counter
                quantity={quantity}
                onIncrement={() => setQuantity((prev) => prev + 1)}
                onDecrement={() =>
                  setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
                }
                disableDecrement={quantity === 1}
              /> */}

              {/* {data.isProductFromPrintful && ( */}
              <>
                <VariantPicker
                  value={activeVariantExternalId}
                  onChange={({ target: { value } }) =>
                    setActiveVariantExternalId(value)
                  }
                  variants={data.variants}
                  disabled={oneStyle}
                />
                <Button
                  className="snipcart-add-item w-full md:w-auto transition flex-shrink-0 py-2 px-4 border border-gray-300 hover:border-transparent shadow-sm text-sm bg-blue-600 text-white focus:text-white hover:bg-blue-500 hover:text-white focus:bg-blue-600 focus:outline-none rounded"
                  data-item-id={activeVariantExternalId}
                  data-item-price={activeVariant.retail_price}
                  data-item-url={`/api/products/${activeVariantExternalId}`}
                  data-item-description={activeVariant.name}
                  data-item-image={activeVariantFile.preview_url}
                  data-item-name={name}
                >
                  Add to Snip
                </Button>
              </>
              {/* )} */}

              {!data.isProductFromPrintful && (
                <>
                  <Button
                    onClick={addToCart}
                    variant="flat"
                    className={`w-full h-11 md:h-12 px-1.5 ${
                      !isSelected && "bg-gray-400 hover:bg-gray-400"
                    }`}
                    disabled={!isSelected}
                    loading={addToCartLoader}
                  >
                    {t("text-add-to-cart")}
                  </Button>
                </>
              )}
            </div>

            {viewCartBtn && (
              <button
                onClick={navigateToCartPage}
                className="w-full mb-4 h-11 md:h-12 rounded bg-gray-100 text-heading focus:outline-none border border-gray-300 transition-colors hover:bg-gray-50 focus:bg-gray-50"
              >
                {t("text-view-cart")}
              </button>
            )}

            <Button
              onClick={navigateToProductPage}
              variant="flat"
              className="w-full h-11 md:h-12"
            >
              {t("text-view-details")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
