import React from "react";
import { Route, Switch } from "react-router-dom";
import Authentication from "../Authentication/Authentication";
import NotFound from "../NotFound/NotFound";
import ProductsDetails from "../ProductDetails/ProductsDetails";
import ReviewCart from "../ReviewCart/ReviewCart";
import HeaderPart from "./Header/HeaderPart";
import "./home.css";
import HomePageItem from "./HomePageItem";

const HomePage = () => {
  return (
    <div>
      <HeaderPart />
      {/* <Link to="/review-order">order</Link> */}
      <Switch>
        <Route path="/user/:form">
          <Authentication />
        </Route>
        <Route path="/product-details/:productId">
          <ProductsDetails />
        </Route>
        <Route path="/review-order">
          <ReviewCart />
        </Route>
        <Route exact path="/">
          <HomePageItem />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

export default HomePage;
