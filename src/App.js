import { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import AdminMain from "./Pages/Admin/AdminMain";
import HomePage from "./Pages/HomePage/HomePage";
import { fetchProducts } from "./Store/Actions/ProductActions";
export const CartContext = createContext();

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin/:role">
          <AdminMain />
        </Route>

        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
