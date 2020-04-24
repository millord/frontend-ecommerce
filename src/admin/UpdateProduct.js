import React, { useState, useEffect } from "react";
import { Layout } from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { getCategories, updateProduct, getProduct } from "./apiAdmin";
import { Redirect } from "react-router-dom";

const UpdateProduct = (props) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    success: false,
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });
  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
    success,
  } = values;
  const { user, token } = isAuthenticated();

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  const init = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // populate the state
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          shipping: data.shipping,
          quantity: data.quantity,
          formData: new FormData(),
        });
        // load categores
        initCategories();
      }
    });
  };

  useEffect(() => {
    init(props.match.params.productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(props.match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            photo: "",
            price: "",
            quantity: "",
            loading: false,
            success: true,
            createdProduct: data.name,
            redirectToProfile: true,
          });
        }
      }
    );
  };

  const newProductForm = () => (
    <form onSubmit={clickSubmit} className="mb-3">
      <h4>Product Photo</h4>
      <div className="form-group">
        <label className="btn btn-outline-secondary">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">
          Name{" "}
          <input
            className="form-control"
            onChange={handleChange("name")}
            type="text"
            value={name}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">
          Description{" "}
          <textarea
            onChange={handleChange("description")}
            value={description}
            className="form-control"
          />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">
          Price{" "}
          <input
            onChange={handleChange("price")}
            type="number"
            value={price}
            className="form-control"
          />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">
          Category{" "}
          <select className="form-control" onChange={handleChange("category")}>
            <option>Please select</option>
            {categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">
          Quantity{" "}
          <input
            onChange={handleChange("quantity")}
            type="number"
            value={quantity}
            className="form-control"
            className="form-control"
          />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">
          Shipping{" "}
          <select className="form-control" onChange={handleChange("shipping")}>
            <option>Please select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </label>
      </div>
      <button className="btn-outline-primary"> Update</button>
    </form>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      <h2>{`Product Updated!`}</h2>
    </div>
  );
  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to="/" />;
      }
    }
  };

  return (
    <Layout
      title="Add New Product"
      description={`Hi ${user.name}, ready to update a product?`}
      className="container  "
    >
      <div className="row">
        <div className="container col-md-8 offset-md-2">
          <h1>Update Product</h1>
          {showError()}
          {showLoading()}
          {showSuccess()}
          {redirectUser()}
          {newProductForm()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
