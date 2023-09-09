import Link from "@components/ui/link";
import SearchIcon from "@components/icons/search-icon";
import UserIcon from "@components/icons/user-icon";
import MenuIcon from "@components/icons/menu-icon";
import HomeIcon from "@components/icons/home-icon";
import { useUI } from "@contexts/ui.context";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import dynamic from "next/dynamic";
import { Drawer } from "@components/common/drawer/drawer";
import { getDirection } from "@utils/get-direction";
import motionProps from "@components/common/drawer/motion";
import useSnipcartCount from "@utils/useSnipcartCount";

const CartButton = dynamic(() => import("@components/cart/cart-button"), {
  ssr: false,
});
const AuthMenu = dynamic(() => import("@components/layout/header/auth-menu"), {
  ssr: false,
});
const MobileMenu = dynamic(
  () => import("@components/layout/header/mobile-menu")
);

const BottomNavigation: React.FC = () => {
  const { cart } = useSnipcartCount();
  const cartHasItems = cart.items.count !== 0;

  const {
    openSidebar,
    closeSidebar,
    displaySidebar,
    // setDrawerView,
    openSearch,
    openModal,
    setModalView,
    isAuthorized,
  } = useUI();

  function handleLogin() {
    setModalView("LOGIN_VIEW");
    return openModal();
  }
  function handleMobileMenu() {
    return openSidebar();
  }

  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === "ltr" ? { left: 0 } : { right: 0 };

  return (
    <>
      <div className="lg:hidden fixed z-10 bottom-0 flex items-center justify-between shadow-bottomNavigation text-gray-700 body-font bg-white w-full h-14 sm:h-16 px-4 md:px-8">
        <button
          aria-label="Menu"
          className="menuBtn flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none"
          onClick={handleMobileMenu}
        >
          <MenuIcon />
        </button>
        {/* <button
					className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
					onClick={openSearch}
					aria-label="search-button"
				>
					<SearchIcon />
				</button> */}
        <Link href="/" className="flex-shrink-0">
          <HomeIcon />
        </Link>
        {/* <CartButton /> */}

        <button
          className="snipcart-customer-signin appearance-none px-2 text-gray-800 hover:text-blue-600 rounded-md cursor-pointer focus:outline-none focus:text-blue-600 transition relative"
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
        <button
          className="snipcart-checkout appearance-none px-2 text-gray-800 hover:text-blue-600 rounded-md cursor-pointer focus:outline-none focus:text-blue-600 transition relative"
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
        {/* <AuthMenu
          isAuthorized={isAuthorized}
          href={ROUTES.ACCOUNT}
          className="flex-shrink-0"
          btnProps={{
            className: "flex-shrink-0 focus:outline-none",
            children: <UserIcon />,
            onClick: handleLogin,
          }}
        >
          <UserIcon />
        </AuthMenu> */}
      </div>
      {/* TODO: need to use just one drawer component */}
      <Drawer
        placement={dir === "rtl" ? "right" : "left"}
        open={displaySidebar}
        onClose={closeSidebar}
        contentWrapperStyle={contentWrapperCSS}
        {...motionProps}
      >
        <MobileMenu />
      </Drawer>
    </>
  );
};

export default BottomNavigation;
