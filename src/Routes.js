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
import { AddProduct } from "./admin/AddProduct";
import Shop from "./core/Shop";

export const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <PrivateRoutes path="/user/dashboard" exact component={Dashboard} />
          <AdminRoute
            path="/admin/dashboard"
            exact
            component={AdminDashboard}
          />
          <AdminRoute path="/category/create" exact component={AddCategory} />
          <AdminRoute path="/product/create" exact component={AddProduct} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
