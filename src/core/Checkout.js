import React, { useState, useEffect } from "react";
import "./styles.css";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import {
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from "./apiCore";
import DropIn from "braintree-web-drop-in-react";
import { emptyCart } from "./cartHelpers";

export const Checkout = ({ products }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
    loading: false,
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const handleAdress = (e) => {
    setData({ ...data, address: e.target.value });
  };

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return (
      <div>
        {isAuthenticated() ? (
          <div>{showDropIn()}</div>
        ) : (
          <Link to="/signin">
            <button className="btn btn-primary">Sign in to Checkout</button>
          </Link>
        )}
      </div>
    );
  };

  const buy = () => {
    let deliveryAddress = data.address;
    setData({ loading: true });
    let nonce;
    let getNoce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };
        processPayment(userId, token, paymentData).then((response) => {
          const createOrderData = {
            products: products,
            transaction_id: response.transaction_id,
            amount: response.transaction.amount,
            address: deliveryAddress,
          };

          createOrder(userId, token, createOrderData).then((response) => {
            emptyCart(() => {
              console.log("Payment success and empty cart");
              setData({ ...data, success: true, loading: false });
            });
          });
        });
      })
      .catch((error) => {
        // console.log("Dropin error", error);
        setData({ error: error.message, loading: false });
      });
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className="form-group mb-3">
            <label className="text-muted">Delivery Address:</label>
            <textarea
              onChange={handleAdress}
              className="form-control"
              value={data.address}
              placeholder="Type Your Delivery Address Here"
            />
          </div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy} className="btn btn-success btn-block">
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  const showError = (error) => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const showSuccess = (success) => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        Thanks! Your Payment has been sucessful
      </div>
    );
  };

  const showLoading = (loading) => loading && <h2>Loading....</h2>;

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showError()}
      {showSuccess(data.success)}
      {showLoading()}
      {showCheckout()}
    </div>
  );
};
