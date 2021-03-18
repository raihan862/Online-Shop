import { combineReducers, createStore } from "redux";
import cartReducer from "./Reducers/CartReducer";
import productReducer from "./Reducers/ProductReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
});
const store = createStore(rootReducer);
export default store;
