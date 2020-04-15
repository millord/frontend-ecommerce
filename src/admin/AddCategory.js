import React, { useState } from "react";
import { Layout } from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { createCategory } from "./apiAdmin";
import { Link } from "react-router-dom";

export const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };
  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted"> Name </label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control"
          required
          value={name}
          autoFocus
        />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );
  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">Category was Created</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Category should be unique </h3>;
    }
  };
  const goBack = () => {
    return (
      <div className="mt-3">
        <Link to="/admin/dashboard" className="text-warning">
          Back to Dashboard
        </Link>
      </div>
    );
  };

  return (
    <Layout
      title="Admin Dashboard"
      description={`Hi ${user.name}, ready to add a category?`}
      className="container"
    >
      <div className="row">
        <div className="col-8 col-md-8 offeset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};
