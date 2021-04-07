import axios from "axios";
export const FETCH_PRODUCT_DATA = "FETCH_PRODUCT_DATA";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
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

export const createProductAction = () => {
  return {
    type: CREATE_PRODUCT,
  };
};
export const updateProductAction = (data) => {
  return {
    type: UPDATE_PRODUCT,
    payload: data,
  };
};

export const deleteProductAction = (id) => {
  return {
    type: DELETE_PRODUCT,
    payload: id,
  };
};
export const fetchProducts = (pageNumber = 1) => {
  return (dispatch) => {
    dispatch(fetchProductDataAction);
    axios
      .get(`https://mysterious-anchorage-54512.herokuapp.com/products?pageNo=${pageNumber}`)
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
export const createProduct = (productInfo) => {
  return (dispatch) => {
    dispatch(fetchProductDataAction);
    axios
      .post(`https://mysterious-anchorage-54512.herokuapp.com/products/add-product`,productInfo,{}
       )
      .then((data) => {
        dispatch(createProductAction(productInfo));
      })
      .catch((err) => {
        dispatch(fetchFailureAction(err.message));
      });
  };
};

export const updateProduct = (productInfo) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(fetchProductDataAction);
    axios
      .patch(`https://mysterious-anchorage-54512.herokuapp.com/products/update-product`, productInfo)
      .then((data) => {
        dispatch(updateProductAction(productInfo));
      })
      .catch((err) => {
        dispatch(fetchFailureAction(err.message));
      });
  };
};

export const deleteProduct = (productId) => {
  return (dispatch) => {
    dispatch(fetchProductDataAction);
    axios
      .delete(`https://mysterious-anchorage-54512.herokuapp.com/products/delete-product/${productId}`)
      .then((response) => {
        dispatch(deleteProductAction(response.data._id));
      })
      .catch((err) => {
        dispatch(fetchFailureAction(err.message));
      });
  };
};
