import React, { useRef } from "react";
import { siteSettings } from "@settings/site-settings";
import HeaderMenu from "@components/layout/header/header-menu";
import Logo from "@components/ui/logo";

import { addActiveScroll } from "@utils/add-active-scroll";
import useSnipcartCount from "@utils/useSnipcartCount";


type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

const Header: React.FC = () => {
  const { cart } = useSnipcartCount();
  const cartHasItems = cart.items.count !== 0;

  const siteHeaderRef = useRef() as DivElementRef;
  addActiveScroll(siteHeaderRef);

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className="w-full h-16 sm:h-20 lg:h-24 relative z-20"
    >
      <div className="innerSticky text-gray-700 body-font fixed bg-white w-full h-16 sm:h-20 lg:h-24 z-20 px-4 md:px-8 lg:px-6 transition duration-200 ease-in-out">
        <div className="relative flex items-center justify-between mx-auto max-w-[1920px] h-full w-full">

          <div className="flex-grow text-center">
            <Logo />
          </div>

          <div className="absolute z-30 right-0 sm:right-4 top-1/2 transform -translate-y-1/2 flex items-center sm:space-x-4">

            {/* USER LOGIN */}
            <button
              className="hidden md:block snipcart-customer-signin appearance-none px-2 text-gray-800 hover:text-blue-600 rounded-md cursor-pointer focus:outline-none focus:text-blue-600 transition relative"
              aria-label="User login"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M4 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
              </svg>
            </button>

            {/* USER SHOPPING CART */}
            <button
              className="snipcart-checkout appearance-none pr-0 sm:px-2 text-gray-800 hover:text-blue-600 rounded-md cursor-pointer focus:outline-none focus:text-blue-600 transition relative"
              aria-label="Cart"
            >
              {cartHasItems && (
                <span className="absolute bg-blue-600 rounded-full w-2 h-2 top-0 right-0 -mt-1 -mr-1"></span>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M4 16V4H2V2h3a1 1 0 0 1 1 1v12h12.438l2-8H8V5h13.72a1 1 0 0 1 .97 1.243l-2.5 10a1 1 0 0 1-.97.757H5a1 1 0 0 1-1-1zm2 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm12 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
              </svg>
            </button>
          </div>

          {/* DESKTOP MENU */}
          <HeaderMenu
            data={site_header.menu}
            className="hidden lg:flex md:ms-6 xl:ms-10"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
