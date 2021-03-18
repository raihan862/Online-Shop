export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREASE_ITEM_QUANTITY = "INCREASE_ITEM_QUANTITY";
export const DECREASE_ITEM_QUANTITY = "DECREASE_ITEM_QUANTITY";

export const addToCartAction = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};
export const removeFromCartAction = (itemId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: itemId,
  };
};
export const increaseItemQuantityAction = (itemId) => {
  return {
    type: INCREASE_ITEM_QUANTITY,
    payload: itemId,
  };
};
export const decreaseItemQuantityAction = (itemId) => {
  return {
    type: DECREASE_ITEM_QUANTITY,
    payload: itemId,
  };
};
