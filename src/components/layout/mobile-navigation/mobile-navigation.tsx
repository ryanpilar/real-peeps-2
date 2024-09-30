import MenuIcon from "@components/icons/menu-icon";
import { useUI } from "@contexts/ui.context";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Drawer } from "@components/common/drawer/drawer";
import { getDirection } from "@utils/get-direction";
import motionProps from "@components/common/drawer/motion";


const MobileMenu = dynamic(
  () => import("@components/layout/header/mobile-menu")
);

const BottomNavigation: React.FC = () => {

  const {
    openSidebar,
    closeSidebar,
    displaySidebar,
  } = useUI();

  function handleMobileMenu() {
    return openSidebar();
  }

  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === "ltr" ? { left: 0 } : { right: 0 };

  return (
    <>
      <div className="lg:hidden fixed z-20 top-1 sm:top-2 flex items-center justify-between text-gray-700 body-font h-14 sm:h-16 px-4 sm:px-9 md:px-14">
        <button
          aria-label="Menu"
          className="menuBtn flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none"
          onClick={handleMobileMenu}
        >
          <MenuIcon />
        </button>
      </div>

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
