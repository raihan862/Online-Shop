import axios from "axios";
import { emptyCartAction } from "./CartAction";
export const FETCH_ORDER_DATA = "FETCH_ORDER_DATA";
export const FETCH_ORDER_SUCCESS = "FETCH_ORDER_SUCCESS";
export const FETCH_ORDER_FAILURE = "FETCH_ORDER_FAILURE";
export const MAKE_ORDER = "MAKE_ORDER";
export const UPDATE_ORDER_STATUS = "UPDATE_ORDER_STATUS";
export const USER_ORDER = "USER_ORDER";
export const ORDER_BY_DATE = "ORDER_BY_DATE";
export const fetchOrderDataAction = () => {
  return {
    type: FETCH_ORDER_DATA,
  };
};

export const fetchSuccessAction = (orders) => {
  return {
    type: FETCH_ORDER_SUCCESS,
    payload: orders,
  };
};
export const fetchFailureAction = (errMessages) => {
  return {
    type: FETCH_ORDER_SUCCESS,
    payload: errMessages,
  };
};
export const updateOrderStatusAction = () => {
  return {
    type: UPDATE_ORDER_STATUS,
  };
};
export const makeOrderAction = () => {
  return {
    type: MAKE_ORDER,
  };
};

export const orderByDateAction = (data) => {};
export const userOrderAction = (data) => {
  return {
    type: USER_ORDER,
    payload: data,
  };
};
export const fetchOrders = (pageNo = 1, orderType) => {
  return (dispatch) => {
    dispatch(fetchOrderDataAction);
    axios
      .get(`http://localhost:3000/orders/${orderType}?pageNo=${pageNo}`)
      .then((response) => {
        dispatch(
          fetchSuccessAction({
            data: response.data.data,
            count: response.data.count,
          })
        );
      })
      .catch((err) => {
        dispatch(fetchFailureAction(err.messages));
      });
  };
};
export const fetchuserOrders = (userId) => {
  return (dispatch) => {
    dispatch(fetchOrderDataAction);
    axios
      .get(`http://localhost:3000/orders/user-orders/${userId}`)
      .then((response) => {
        dispatch(userOrderAction(response.data));
      })
      .catch((err) => {
        dispatch(fetchFailureAction(err.messages));
      });
  };
};
export const fetchOrdersByDate = (date) => {
  return (dispatch) => {
    dispatch(fetchOrderDataAction);
    axios
      .get(`http://localhost:3000/orders//daily-orders/${"" + date}`)
      .then((response) => {
        dispatch(userOrderAction(response.data));
      })
      .catch((err) => {
        dispatch(fetchFailureAction(err.messages));
      });
  };
};
export const makeOrder = (orderData) => {
  return (dispatch) => {
    dispatch(fetchOrderDataAction);
    axios
      .post(`http://localhost:3000/orders/make-order`, orderData)
      .then((response) => {
        dispatch(emptyCartAction());
        dispatch(makeOrderAction());
      })
      .catch((err) => {
        dispatch(fetchFailureAction(err.messages));
      });
  };
};

export const updateOrderStatus = (orderInfo) => {
  return (dispatch) => {
    dispatch(fetchOrderDataAction);
    axios
      .patch(`http://localhost:3000/orders/update-status`, orderInfo)
      .then((response) => {
        dispatch(makeOrderAction());
      })
      .catch((err) => {
        dispatch(fetchFailureAction(err.messages));
      });
  };
};
