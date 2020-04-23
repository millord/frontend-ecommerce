import React, { useState, useEffect } from "react";
import { Layout } from "./Layout";
import { getCart } from "./cartHelpers";
import { Card } from "./Card";
import { Link } from "react-router-dom";
import { Checkout } from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your Cart Has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => {
    return (
      <h2>
        Your Cart is Empty <br /> <Link to="/shop">Continue Shopping</Link>{" "}
      </h2>
    );
  };

  return (
    <div>
      <Layout
        title="Shopping Cart"
        description="Manage your Cart items. Add, Remove, Checkout or Continue Shopping"
        className="container-fluid"
      >
        <div className="row">
          <div className="col-6">
            {items.length > 0 ? showItems(items) : noItemsMessage()}
          </div>
          <div className="col-6">
            <h2 className="mb-4">Your Cart Summary</h2>
            <hr />
            <Checkout products={items} />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Cart;
