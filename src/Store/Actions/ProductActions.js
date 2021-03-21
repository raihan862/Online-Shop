import axios from "axios";
export const FETCH_PRODUCT_DATA = "FETCH_PRODUCT_DATA";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";

export const fetchProductDataAction = () => {
  return {
    type: FETCH_PRODUCT_DATA,
  };
};

export const fetchSuccessAction = (products) => {
  return {
    type: FETCH_SUCCESS,
    payload: products,
  };
};
export const fetchFailureAction = (errMessages) => {
  return {
    type: FETCH_FAILURE,
    payload: errMessages,
  };
};

export const fetchProducts = (pageNumber = 1) => {
  return (dispatch) => {
    dispatch(fetchProductDataAction);
    axios
      .get(`http://localhost:3000/products?pageNo=${pageNumber}`)
      .then((response) => {
        dispatch(
          fetchSuccessAction({
            data: response.data.data,
            count: response.data.count,
          })
        );
      })
      .catch((err) => {
        console.log("err", err.message);
        dispatch(fetchFailureAction(err.messages));
      });
  };
};
