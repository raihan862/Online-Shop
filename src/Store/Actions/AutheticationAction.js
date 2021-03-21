import axios from "axios";
import jwt from "jwt-decode";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export const userLoginAction = () => {
  return {
    type: LOGIN,
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
      .post(`http://localhost:3000/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(userInfo),
      })
      .then((response) => {
        const token = response.data.accessToken;
        const user = jwt(token);
        localStorage.setItem("token", token);
        dispatch(
          loginSuccessAction({
            user: user,
            token: token,
          })
        );
      })
      .catch((err) => {
        console.log("err", err.message);
        dispatch(loginFailureAction(err.message));
      });
  };
};
