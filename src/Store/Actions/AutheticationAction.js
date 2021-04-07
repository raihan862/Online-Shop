import axios from "axios";
import jwt from "jwt-decode";
import { axiosHeader } from "../../App";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const UPDATE_LOGIN_USER = "UPDATE_LOGIN_USER";
export const userLoginAction = () => {
  return {
    type: LOGIN,
  };
};
export const updateLoginUserAction = (data) => {
  return {
    type: UPDATE_LOGIN_USER,
    payload: data,
  };
};
export const userLogoutAction = () => {
  return {
    type: LOGOUT,
  };
};

export const loginSuccessAction = (userInfo) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userInfo,
  };
};
export const loginFailureAction = (errMessages) => {
  return {
    type: LOGIN_FAILURE,
    payload: errMessages,
  };
};

export const userLogin = (userInfo) => {
  return (dispatch) => {
    dispatch(userLoginAction);
    axios
      .post(`https://mysterious-anchorage-54512.herokuapp.com/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(userInfo),
      })
      .then((response) => {
        const token = response.data.accessToken;
        const user = jwt(token);
        localStorage.setItem("token", token);
        axiosHeader();
        dispatch(
          loginSuccessAction({
            user: user,
            token: token,
          })
        );
      })
      .catch((err) => {
        dispatch(loginFailureAction(err.message));
      });
  };
};

export const updateLoginUser = (userInfo) => {
  return (dispatch) => {
    dispatch(userLoginAction);
    axios
      .patch(`https://mysterious-anchorage-54512.herokuapp.com/users/update-user`, userInfo)
      .then((response) => {
        dispatch(updateLoginUserAction(userInfo));
      })
      .catch((err) => {});
  };
};
