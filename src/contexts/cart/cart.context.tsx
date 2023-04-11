/**

    This is a module that exports a CartProvider component and a useCart hook that provide state 
    management for a shopping cart in a React application.

    The CartProvider component creates a cartContext using the React.createContext() method and 
    defines an initial state for the cart using the initialState constant imported from cart.reducer 
    module. 
    
    The component then initializes the cart state using the useLocalStorage hook to retrieve 
    the saved cart state from local storage. The useReducer hook is used to update the state of the 
    cart in response to actions dispatched to the cartReducer function defined in the cart.reducer 
    module.

    The CartProvider component also defines several functions that update the state of the cart, 
    such as addItemToCart, removeItemFromCart, clearItemFromCart, getItemFromCart, and isInCart. 
    These functions are passed down through the value prop of the cartContext.Provider component 
    and can be accessed by child components using the useCart hook.

    The useCart hook is used to access the cartContext created by the CartProvider component. It 
    throws an error if it's not used within a CartProvider component.

    Overall, this module provides a reusable solution for managing the state of a shopping cart in 
    a React application.
 */

import React from "react";
import { cartReducer, State, initialState } from "./cart.reducer";
import { Item, getItem } from "./cart.utils";
import { useLocalStorage } from "@utils/use-local-storage";

interface CartProviderState extends State {
  addItemToCart: (item: Item, quantity: number) => void;
  removeItemFromCart: (id: Item["id"]) => void;
  // updateItem: (id: Item["id"], payload: object) => void;
  // updateItemQuantity: (id: Item["id"], quantity: number) => void;
  clearItemFromCart: (id: Item["id"]) => void;
  getItemFromCart: (id: Item["id"]) => any | undefined;
  isInCart: (id: Item["id"]) => boolean;
  // updateCartMetadata: (metadata: Metadata) => void;
}

// CREATE CART CONTEXT
export const cartContext = React.createContext<CartProviderState | undefined>(
  undefined
);

// Displaying the name of the cartContext
cartContext.displayName = "CartContext";

export const useCart = () => {
  const context = React.useContext(cartContext);
  if (context === undefined) {
    throw new Error(`useCart must be used within a CartProvider`);
  }
  return context;
};
// CartProvider component to manage the state of the shopping cart
export const CartProvider: React.FC = (props) => {
  // Initializing the saved cart state and updating the state of the cart using the useReducer hook
  const [savedCart, saveCart] = useLocalStorage(
    `chawkbazar-cart`,
    JSON.stringify(initialState)
  );
  const [state, dispatch] = React.useReducer(
    cartReducer,
    JSON.parse(savedCart!)
  );

  // Saving the updated cart state to local storage using the useEffect hook
  React.useEffect(() => {
    saveCart(JSON.stringify(state));
  }, [state, saveCart]);

  // Defining functions that update the state of the cart
  const addItemToCart = (item: Item, quantity: number) =>
    dispatch({ type: "ADD_ITEM_WITH_QUANTITY", item, quantity });
  const removeItemFromCart = (id: Item["id"]) =>
    dispatch({ type: "REMOVE_ITEM_OR_QUANTITY", id });
  const clearItemFromCart = (id: Item["id"]) =>
    dispatch({ type: "REMOVE_ITEM", id });
  const isInCart = (id: Item["id"]) => !!getItem(state.items, id);
  const getItemFromCart = (id: Item["id"]) => getItem(state.items, id);

  // const inStock=()=>{}

  // Memoizing the value to be passed down through the value prop of the cartContext.Provider component
  const value = React.useMemo(
    () => ({
      ...state,
      addItemToCart,
      removeItemFromCart,
      clearItemFromCart,
      getItemFromCart,
      isInCart,
    }),
    [state]
  );
  return <cartContext.Provider value={value} {...props} />;
};
