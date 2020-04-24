import React, { useState, useEffect } from "react";
import { Layout } from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { getProducts, deleteProduct } from "./apiAdmin";
import { Link } from "react-router-dom";

export const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  return (
    <div>
      <Layout
        title="Home"
        description="Home E-commerce App"
        className="container-fluid"
      >
        <div className="row">
          <div className="col-12">
            <ul className="list-group">
              <h2 className="text-center">Total {products.length}</h2>
              <hr />
              {products.map((p, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <strong>{p.name}</strong>
                  <Link to={`/admin/product/update/${p._id}`}>
                    <span className="badge badge-warning  badge-pill">
                      Update
                    </span>
                  </Link>
                  <span
                    onClick={() => destroy(p._id)}
                    className="badge badge-danger badge-pill"
                  >
                    Delete
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};
