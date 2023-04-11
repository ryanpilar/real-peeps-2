/**

    This code defines a React context object for managing the UI state of an application. 

    It starts by:
        1.  importing necessary dependencies and custom hooks, 
        2.  defining the shape of the state object, 
        3.  initializing the state object with default values, 
        4.  defining the available action types. 
        5.  define the available modal views and drawer views, 
        6.  define the type of the toast message text. 
        7.  The UIContext is then created with the default values, 
        8.  a reducer function is defined to accept a state and action and return a new state.

    The UIProvider is defined as a React functional component that sets up a state using 
    the useReducer hook with the uiReducer function and the initialState object, and returns 
    a CartProvider component wrapped around the UIContext.Provider component, which provides 
    the UI state object and dispatch function to all child components in the application.

    Overall, this code creates a context object for managing the UI state of an application, 
    which can be used to control various aspects of the UI such as the display of modals, 
    sidebars, and cart.

    URGENT ADD WISHLIST!
 */

import React from "react";
// getToken function that checks for the presence of an authentication token stored in a cookie on the client-side
import { getToken } from "@framework/utils/get-token";
import { CartProvider } from "./cart/cart.context";

// Defining the shape of the state object
export interface State {
  isAuthorized: boolean;
  displaySidebar: boolean;
  displayFilter: boolean;
  displayModal: boolean;
  displayShop: boolean;
  displayCart: boolean;
  displaySearch: boolean;
  modalView: string;
  modalData: any;
  drawerView: string | null;
  toastText: string;
}

// Initializing the state object with default values
const initialState = {
  isAuthorized: getToken() ? true : false,
  displaySidebar: false,
  displayFilter: false,
  displayModal: false,
  displayShop: false,
  displayCart: false,
  displaySearch: false,
  modalView: "LOGIN_VIEW",
  drawerView: null,
  modalData: null,
  toastText: "",
};

// Defining the available action types
type Action =
  | {
      type: "SET_AUTHORIZED";
    }
  | {
      type: "SET_UNAUTHORIZED";
    }
  | {
      type: "OPEN_SIDEBAR";
    }
  | {
      type: "CLOSE_SIDEBAR";
    }
  | {
      type: "OPEN_CART";
    }
  | {
      type: "CLOSE_CART";
    }
  | {
      type: "OPEN_SEARCH";
    }
  | {
      type: "CLOSE_SEARCH";
    }
  | {
      type: "SET_TOAST_TEXT";
      text: ToastText;
    }
  | {
      type: "OPEN_FILTER";
    }
  | {
      type: "CLOSE_FILTER";
    }
  | {
      type: "OPEN_SHOP";
    }
  | {
      type: "CLOSE_SHOP";
    }
  | {
      type: "OPEN_MODAL";
    }
  | {
      type: "CLOSE_MODAL";
    }
  | {
      type: "SET_MODAL_VIEW";
      view: MODAL_VIEWS;
    }
  | {
      type: "SET_DRAWER_VIEW";
      view: DRAWER_VIEWS;
    }
  | {
      type: "SET_MODAL_DATA";
      data: any;
    }
  | {
      type: "SET_USER_AVATAR";
      value: string;
    };

// Defining the available modal views and drawer views
type MODAL_VIEWS =
  | "SIGN_UP_VIEW"
  | "LOGIN_VIEW"
  | "FORGET_PASSWORD"
  | "PRODUCT_VIEW";
type DRAWER_VIEWS = "CART_SIDEBAR" | "MOBILE_MENU";

// Defining the type of the toast message text
type ToastText = string;

// Creating the context object with default values
export const UIContext = React.createContext<State | any>(initialState);

// Naming the context object for better debugging
UIContext.displayName = "UIContext";

// Defining the reducer function which accepts a state and action and returns a new state
function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_AUTHORIZED": {
      return {
        ...state,
        isAuthorized: true,
      };
    }
    case "SET_UNAUTHORIZED": {
      return {
        ...state,
        isAuthorized: false,
      };
    }
    case "OPEN_SIDEBAR": {
      return {
        ...state,
        displaySidebar: true,
      };
    }
    case "CLOSE_SIDEBAR": {
      return {
        ...state,
        displaySidebar: false,
        drawerView: null,
      };
    }
    case "OPEN_CART": {
      return {
        ...state,
        displayCart: true,
      };
    }
    case "CLOSE_CART": {
      return {
        ...state,
        displayCart: false,
      };
    }
    case "OPEN_SEARCH": {
      return {
        ...state,
        displaySearch: true,
      };
    }
    case "CLOSE_SEARCH": {
      return {
        ...state,
        displaySearch: false,
      };
    }
    case "OPEN_FILTER": {
      return {
        ...state,
        displayFilter: true,
      };
    }
    case "CLOSE_FILTER": {
      return {
        ...state,
        displayFilter: false,
      };
    }
    case "OPEN_SHOP": {
      return {
        ...state,
        displayShop: true,
      };
    }
    case "CLOSE_SHOP": {
      return {
        ...state,
        displayShop: false,
      };
    }
    case "OPEN_MODAL": {
      return {
        ...state,
        displayModal: true,
        displaySidebar: false,
      };
    }
    case "CLOSE_MODAL": {
      return {
        ...state,
        displayModal: false,
      };
    }
    case "SET_MODAL_VIEW": {
      return {
        ...state,
        modalView: action.view,
      };
    }
    case "SET_DRAWER_VIEW": {
      return {
        ...state,
        drawerView: action.view,
      };
    }
    case "SET_MODAL_DATA": {
      return {
        ...state,
        modalData: action.data,
      };
    }
    case "SET_TOAST_TEXT": {
      return {
        ...state,
        toastText: action.text,
      };
    }
    case "SET_USER_AVATAR": {
      return {
        ...state,
        userAvatar: action.value,
      };
    }
  }
}

export const UIProvider: React.FC = (props) => {
  /**
      This sets up a state using the useReducer hook, where state is an object representing the current 
      state and dispatch is a function to update the state. uiReducer is the reducer function that handles 
      updating the state based on different actions, and initialState is the initial state of the component.    
   */
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  /**
      These are all functions that dispatch different actions to update the state. Each function 
      corresponds to a different action that can be taken within the UI.
   */
  const authorize = () => dispatch({ type: "SET_AUTHORIZED" });
  const unauthorize = () => dispatch({ type: "SET_UNAUTHORIZED" });
  const openSidebar = () => dispatch({ type: "OPEN_SIDEBAR" });
  const closeSidebar = () => dispatch({ type: "CLOSE_SIDEBAR" });
  const toggleSidebar = () =>
    state.displaySidebar
      ? dispatch({ type: "CLOSE_SIDEBAR" })
      : dispatch({ type: "OPEN_SIDEBAR" });
  const closeSidebarIfPresent = () =>
    state.displaySidebar && dispatch({ type: "CLOSE_CART" });
  const openCart = () => dispatch({ type: "OPEN_CART" });
  const closeCart = () => dispatch({ type: "CLOSE_CART" });
  const toggleCart = () =>
    state.displaySidebar
      ? dispatch({ type: "CLOSE_CART" })
      : dispatch({ type: "OPEN_CART" });
  const closeCartIfPresent = () =>
    state.displaySidebar && dispatch({ type: "CLOSE_CART" });

  const openFilter = () => dispatch({ type: "OPEN_FILTER" });
  const closeFilter = () => dispatch({ type: "CLOSE_FILTER" });

  const openShop = () => dispatch({ type: "OPEN_SHOP" });
  const closeShop = () => dispatch({ type: "CLOSE_SHOP" });

  const openModal = () => dispatch({ type: "OPEN_MODAL" });
  const closeModal = () => dispatch({ type: "CLOSE_MODAL" });
  const openSearch = () => dispatch({ type: "OPEN_SEARCH" });
  const closeSearch = () => dispatch({ type: "CLOSE_SEARCH" });

  // set the user's avatar and dispatch the action
  const setUserAvatar = (_value: string) =>
    dispatch({ type: "SET_USER_AVATAR", value: _value });

  // set the view of the modal and dispatch the action
  const setModalView = (view: MODAL_VIEWS) =>
    dispatch({ type: "SET_MODAL_VIEW", view });

  // set the view of the drawer and dispatch the action
  const setDrawerView = (view: DRAWER_VIEWS) =>
    dispatch({ type: "SET_DRAWER_VIEW", view });

  // set data within the modal and dispatch the action
  const setModalData = (data: any) =>
    dispatch({ type: "SET_MODAL_DATA", data });

  // Use useMemo hook to memoize the value object containing state, functions to manipulate state, and dispatch function
  const value = React.useMemo(
    () => ({
      ...state,
      authorize,
      unauthorize,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      closeSidebarIfPresent,
      openCart,
      closeCart,
      toggleCart,
      closeCartIfPresent,
      openFilter,
      closeFilter,
      openShop,
      closeShop,
      openModal,
      closeModal,
      openSearch,
      closeSearch,
      setModalView,
      setDrawerView,
      setUserAvatar,
      setModalData,
    }),
    [state]
  );

  // Use UIContext.Provider to provide the value object to all child components
  return <UIContext.Provider value={value} {...props} />;
};

// Define useUI hook to access the UIContext
export const useUI = () => {
  const context = React.useContext(UIContext);

  // Throw an error if useUI is used outside of a UIProvider component
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }

  // Return the UIContext object
  return context;
};
// Define ManagedUIContext component that wraps children components in a CartProvider and a UIProvider
// @ts-ignore
export const ManagedUIContext: React.FC = ({ children }) => (
  // @ts-ignore
  <CartProvider>
    {/* @ts-ignore */}
    <UIProvider>{children}</UIProvider>
  </CartProvider>
);
