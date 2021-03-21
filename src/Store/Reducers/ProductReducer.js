import {
  FETCH_FAILURE,
  FETCH_PRODUCT_DATA,
  FETCH_SUCCESS,
} from "../Actions/ProductActions";

const INITIAL_STATE = {
  loading: false,
  products: [],
  err: "",
  count: 0,
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
        products: action.payload.data,
        err: "",
        count: action.payload.count,
      };
    case FETCH_FAILURE:
      return {
        loading: false,
        products: [],
        err: action.payload,
        count: 0,
      };
    default:
      return state;
  }
};

export default productReducer;
