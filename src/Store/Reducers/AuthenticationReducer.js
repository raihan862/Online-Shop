import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../Actions/AutheticationAction";

const INITIAL_STATE = {
  user: {},
  token: "",
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
    default:
      return state;
  }
};

export default AuthenticationReducer;
