import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import AuthenticationReducer from "./Reducers/AuthenticationReducer";
import cartReducer from "./Reducers/CartReducer";
import productReducer from "./Reducers/ProductReducer";
import userReducer from "./Reducers/UserReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
  authentication: AuthenticationReducer,
  users: userReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
