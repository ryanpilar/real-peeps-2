/*
		This code defines a functional component called ManagedDrawer that uses a Drawer component 
		from a common library to render a cart drawer on the UI. The useUI hook is used to get 
		access to the displayCart and closeCart functions that control the display of the cart 
		drawer. 
		
		The getDirection function is used to determine the language directionality based on the 
		locale value provided by the useRouter hook. Based on the language directionality, a CSS 
		object is created to style the content wrapper of the cart drawer. The Drawer component 
		is then rendered with various props including open, placement, onClose, and 
		contentWrapperStyle. Finally, the Cart component is rendered inside the Drawer component 
		to display the content of the cart drawer.
*/
import Cart from "@components/cart/cart";
import { useUI } from "@contexts/ui.context";
import { Drawer } from "@components/common/drawer/drawer";
import { useRouter } from "next/router";
import { getDirection } from "@utils/get-direction";
import motionProps from "@components/common/drawer/motion";

const ManagedDrawer = () => {
  const { displayCart, closeCart } = useUI();
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === "ltr" ? { right: 0 } : { left: 0 };
  return (
    <Drawer
      open={displayCart}
      placement={dir === "rtl" ? "left" : "right"}
      onClose={closeCart}
      contentWrapperStyle={contentWrapperCSS}
      {...motionProps}
    >
      <Cart />
    </Drawer>
  );
};

export default ManagedDrawer;
