import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  FETCH_FAILURE,
  FETCH_PRODUCT_DATA,
  FETCH_SUCCESS,
  UPDATE_PRODUCT,
} from "../Actions/ProductActions";

const INITIAL_STATE = {
  loading: false,
  products: [],
  err: "",
  success: false,
  count: 0,
};
const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_DATA:
      return {
        ...state,
        success: false,
        loading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.data,
        err: "",
        count: action.payload.count,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        err: action.payload,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        success: true,
      };
    case UPDATE_PRODUCT: {
      const index = state.products.findIndex(
        (product) => product._id == action.payload._id
      );
      state.products[index] = action.payload;
      return {
        ...state,
        loading: false,
        products: [...state.products],
        err: "",
      };
    }
    case DELETE_PRODUCT: {
      const newProduct = state.products.filter((p) => p._id !== action.payload);
      return {
        ...state,
        loading: false,
        products: newProduct,
        err: "",
      };
    }
    default:
      return state;
  }
};

export default productReducer;
