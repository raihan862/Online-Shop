import {
  FETCH_ORDER_DATA,
  FETCH_ORDER_FAILURE,
  FETCH_ORDER_SUCCESS,
  MAKE_ORDER,
  UPDATE_ORDER_STATUS,
  USER_ORDER,
} from "../Actions/OrderAction";

const INITIAL_STATE = {
  loading: false,
  orders: [],
  err: "",
  count: 0,
};
const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ORDER_DATA:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload?.data,
        err: "",
        count: action.payload?.count,
      };
    case FETCH_ORDER_FAILURE:
      return {
        loading: false,
        orders: [],
        err: action.payload,
        count: 0,
      };
    case USER_ORDER: {
      return {
        ...state,
        orders: action.payload,
      };
    }
    case MAKE_ORDER:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_ORDER_STATUS:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default orderReducer;
