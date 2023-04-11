/**
	This code defines a React component called ManagedModal that displays a modal dialog 
	box based on the value of a modalView variable from the ui.context. 
	
	The ManagedModal component imports several other components dynamically using the dynamic function from 
	the next/dynamic package. The imported components are then conditionally rendered inside 
	a Modal component based on the value of the modalView variable. This code is used to 
	manage the UI state of an application and control the display of modals.
 */
import { useUI } from "@contexts/ui.context";
import Modal from "./modal";
import dynamic from "next/dynamic";
import Newsletter from "../newsletter";
const LoginForm = dynamic(() => import("@components/auth/login-form"));
const SignUpForm = dynamic(() => import("@components/auth/sign-up-form"));
const ForgetPasswordForm = dynamic(
  () => import("@components/auth/forget-password-form")
);
const ProductPopup = dynamic(() => import("@components/product/product-popup"));
const ManagedModal: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI();
  return (
    <Modal open={displayModal} onClose={closeModal}>
      {modalView === "LOGIN_VIEW" && <LoginForm />}
      {modalView === "SIGN_UP_VIEW" && <SignUpForm />}
      {modalView === "FORGET_PASSWORD" && <ForgetPasswordForm />}
      {modalView === "PRODUCT_VIEW" && <ProductPopup />}
      {modalView === "NEWSLETTER_VIEW" && <Newsletter />}
    </Modal>
  );
};

export default ManagedModal;
