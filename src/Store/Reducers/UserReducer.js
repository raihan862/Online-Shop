import {
  DELETE_USER,
  FETCH_USER_DATA,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  UPDATE_USER,
} from "../Actions/UserAction";

const INITIAL_STATE = {
  loading: false,
  users: [],
  err: "",
  count: 0,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_DATA:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        users: action.payload.data,
        err: "",
        count: action.payload.count,
      };
    case FETCH_USER_FAILURE:
      return {
        loading: false,
        users: [],
        err: action.payload,
        count: 0,
      };
    case UPDATE_USER: {
      console.log("come10");
      const index = state.users.findIndex(
        (user) => user._id == action.payload._id
      );
      state.users[index] = action.payload;
      console.log(state.users);
      return {
        ...state,
        loading: false,
        users: [...state.users],
        err: "",
      };
    }
    case DELETE_USER: {
      const newUsers = state.users.filter(
        (user) => user._id !== action.payload
      );
      return {
        ...state,
        loading: false,
        users: newUsers,
        err: "",
      };
    }
    default:
      return state;
  }
};

export default userReducer;
