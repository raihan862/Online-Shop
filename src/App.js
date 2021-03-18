import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import AdminMain from "./Pages/Admin/AdminMain";
import HomePage from "./Pages/HomePage/HomePage";
export const CartContext = createContext();

function App() {
  const [products, setProducts] = useState();
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.log("err", err));
  }, [products]);
  return (
    <CartContext.Provider
      value={{
        product: [products, setProducts],
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/admin">
            <AdminMain />
          </Route>

          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </CartContext.Provider>
  );
}

export default App;
