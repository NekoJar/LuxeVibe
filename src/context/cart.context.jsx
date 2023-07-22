import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

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


export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_CART_TOTAL: 'SET_CART_TOTAL',
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    
    case 'CART_ACTION_TYPES.SET_CART_ITEMS':
      return { ...state, ...payload};
      case 'CART_ACTION_TYPES.SET_IS_CART_OPEN':
      return { ...state, isCartOpen: payload};

    default:
      throw new Error(`Unhandled action type: ${type} in cartReducer`);
  }
}



export const CartProvider = ({ children }) => {

  const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)


    dispatch(
      createAction("CART_ACTION_TYPES.SET_CART_ITEMS", {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    )
      
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  }

  const removeItemFromCart = (cartItemsToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemsToRemove);
    updateCartItemsReducer(newCartItems);
  }

  const clearItemFromCart = (cartItemsToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemsToClear);
    updateCartItemsReducer(newCartItems);
  }

  const setIsCartOpen = (bool) => {
    dispatch(createAction("CART_ACTION_TYPES.SET_IS_CART_OPEN", bool))
  }
    
  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, cartTotal, removeItemFromCart, clearItemFromCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
