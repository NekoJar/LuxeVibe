import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
    );
  
    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
  
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  };
  
const removeCartItem = (cartItems, cartItemToRemove) => {
      const existingCartItem = cartItems.find(
          (cartItem) => cartItem.id === cartItemToRemove.id
      );
      
      if (existingCartItem.quantity === 1) {
          return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
      }
  
      return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
  }
  
const clearCartItem = (cartItems, cartItemsToClear) =>  cartItems.filter(cartItem => cartItem.id !== cartItemsToClear.id)

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, cartItemsToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemsToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemsToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemsToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}