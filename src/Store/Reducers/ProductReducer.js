import {
  FETCH_FAILURE,
  FETCH_PRODUCT_DATA,
  FETCH_SUCCESS,
} from "../Actions/ProductActions";

const INITIAL_STATE = {
  loading: false,
  products: [],
  err: "",
};
const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_DATA:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        err: "",
      };
    case FETCH_FAILURE:
      return {
        loading: false,
        products: [],
        err: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
