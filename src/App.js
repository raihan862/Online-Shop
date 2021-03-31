import axios from "axios";
import { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import AdminMain from "./Pages/Admin/AdminMain";
import HomePage from "./Pages/HomePage/HomePage";
import ProtectedRoute from "./Pages/ProtectedRoute/ProtectedRoute";
import { fetchProducts } from "./Store/Actions/ProductActions";
export const CartContext = createContext();
export const axiosHeader = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    axios.defaults.headers.common["Authorization"] = null;
    /*if setting null does not remove `Authorization` header then try     
        delete axios.defaults.headers.common['Authorization'];
      */
  }
};
axiosHeader();
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    if (localStorage.getItem("token")) {
      dispatch(fetchProducts());
    }
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute path="/admin">
          <AdminMain />
        </ProtectedRoute>

        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
