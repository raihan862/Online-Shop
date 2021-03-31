import jwt from "jwt-decode";
import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  UPDATE_LOGIN_USER,
} from "../Actions/AutheticationAction";

const INITIAL_STATE = {
  user: localStorage.getItem("token") ? jwt(localStorage.getItem("token")) : {},
  token: localStorage.getItem("token") || "",
  loding: false,
  errMessage: "",
};
const AuthenticationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        user: action.payload.user,
        token: action.payload.token,
        loding: false,
        errMessages: "",
      };
    case LOGIN_FAILURE:
      return {
        user: {},
        token: "",
        loading: false,
        errMessage: action.payload,
      };
    case LOGOUT:
      return {
        user: {},
        token: "",
        loading: false,
        errMessage: "",
      };
    case UPDATE_LOGIN_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    default:
      return state;
  }
};

export default AuthenticationReducer;
