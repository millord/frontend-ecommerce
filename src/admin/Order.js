import React, { useState, useEffect } from "react";
import { Layout } from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { createProduct, getCategories, listOrders } from "./apiAdmin";
import moment from "moment";

export const Order = () => {
  const [orders, setOrders] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };
  useEffect(() => {
    loadOrders();
  }, []);

  const showOrdersLength = (orders) => {
    return orders.length < 1 ? <h4>No Orders</h4> : null;
  };
  return (
    <div>
      <Layout
        title="Shopping Cart"
        description="Manage your Cart items. Add, Remove, Checkout or Continue Shopping"
        className="container-fluid"
      >
        <div className="col-mb-8 offset-md-2">
          {showOrdersLength(orders)}
          {orders.map((o, oIndex) => {
            return (
              <div
                className="mt-5"
                key={oIndex}
                style={{ borderBottom: "5px solid indigo" }}
              >
                <h2 className="mb-5">
                  <span className="bg-primary">Order ID: {o._id}</span>
                </h2>
                <ul className="list-group mb-2">
                  <li className="list-group-item">{o.status}</li>
                  <li className="list-group-item">
                    {" "}
                    Transaction ID: {o.transaction_id}
                  </li>
                  <li className="list-group-item"> Amount: ${o.amount}</li>
                  <li className="list-group-item">Ordered by: {o.user.name}</li>
                  <li className="list-group-item">
                    Ordered on: {moment(o.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    Delivery address: {o.address}
                  </li>
                </ul>
                <h3 className="mt-4 mb-4 font-italic">
                  Total products in the order: {o.products.length}
                </h3>
              </div>
            );
          })}
        </div>
      </Layout>
    </div>
  );
};
