import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { ShowImage } from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";

export const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const addCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = () => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddCart = (showAddToCartButton) =>
    showAddToCartButton && (
      <button onClick={addCart} className="btn btn-outline-warning mt-2 mb-2">
        Add to Cart
      </button>
    );

  const showRemoveButton = (showRemoveProductButton) =>
    showRemoveProductButton && (
      <button
        onClick={() => removeItem(product._id)}
        className="btn btn-outline-danger mt-2 mb-2"
      >
        Remove Product
      </button>
    );

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock</span>
    );
  };

  const showViewButton = (showViewProductButton) =>
    showViewProductButton && (
      <Link to={`/product/${product._id}`} className="mr-2">
        <button className="btn btn-outline-primary mt-2 mb-2">
          View Product
        </button>
      </Link>
    );

  const handleChange = (productId) => (event) => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjsut Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              onChange={handleChange(product._id)}
              value={count}
            />
          </div>
        </div>
      )
    );
  };

  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header name">{product.name}</div>
        <div className="card-body">
          {shouldRedirect(redirect)}
          <ShowImage item={product} url="product" />
          <p className="lead mt-2"> {product.description}</p>
          <p className="black-10">${product.price}</p>
          <p>{product.category && product.category.name}</p>
          <p className="black-8">{moment(product.createdAt).fromNow()}</p>
          {showStock(product.quantity)}
          <br />
          {showViewButton(showViewProductButton)}
          <Link to="/cart"> {showAddCart(showAddToCartButton)}</Link>
          {showRemoveButton(showRemoveProductButton)}
          <p>{showCartUpdateOptions(cartUpdate)}</p>
        </div>
      </div>
    </div>
  );
};
