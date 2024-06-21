export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = (recipe) => ({
  type: ADD_TO_CART,
  payload: recipe,
});

export const removeFromCart = (index) => ({
  type: REMOVE_FROM_CART,
  payload: index,
});
