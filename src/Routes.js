import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Signin } from "./user/Signin";
import { Signup } from "./user/Signup";
import { Home } from "./core/Home";
import { PrivateRoutes } from "../src/auth/PrivateRoutes";
import { Dashboard } from "./user/UserDashboard";
import { AdminRoute } from "./auth/AdminRoute";
import { AdminDashboard } from "./user/AdmindDashboard";
import { AddCategory } from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import { Product } from "./core/Product";
import Cart from "./core/Cart";

export const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoutes path="/cart" exact component={Cart} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <PrivateRoutes path="/user/dashboard" exact component={Dashboard} />
          <AdminRoute
            path="/admin/dashboard"
            exact
            component={AdminDashboard}
          />

          <AdminRoute
            path="/admin/dashboard"
            exact
            component={AdminDashboard}
          />
          <AdminRoute path="/product/create" exact component={AddProduct} />
          <Route path="/product/:productId" exact component={Product} />
          <AdminRoute path="/category/create" exact component={AddCategory} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
