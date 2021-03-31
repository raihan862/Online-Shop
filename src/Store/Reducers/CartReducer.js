import {
  ADD_TO_CART,
  DECREASE_ITEM_QUANTITY,
  EMPTY_CART_ITEM,
  INCREASE_ITEM_QUANTITY,
  REMOVE_FROM_CART,
} from "../Actions/CartAction";

const INITIAL_STATE = {
  cart: [],
};
const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        cart: [...state.cart, action.payload],
      };
    }
    case REMOVE_FROM_CART: {
      const filterItem = state.cart.filter(
        (item) => item._id !== action.payload
      );
      return {
        cart: filterItem,
      };
    }
    case INCREASE_ITEM_QUANTITY: {
      const i = state.cart.findIndex((item) => item._id === action.payload);
      state.cart[i].quantity = state.cart[i].quantity + 1;
      return {
        cart: [...state.cart],
      };
    }
    case DECREASE_ITEM_QUANTITY: {
      const i = state.cart.findIndex((item) => item._id === action.payload);
      if (state.cart[i].quantity > 1) {
        state.cart[i].quantity = state.cart[i].quantity - 1;
        return {
          cart: [...state.cart],
        };
      }
      return state;
    }
    case EMPTY_CART_ITEM:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};
export default cartReducer;
