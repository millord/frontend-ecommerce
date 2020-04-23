import React, { useState, useEffect } from "react";
import { getCategories } from "./apiCore";
import "./styles.css";
import { list } from "../core/apiCore";
import { Card } from "./Card";

export const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });
  const { category, categories, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    // make sure that search is not empty
    if (search) {
      // send as query the search and category
      list({ search: search || undefined, categories: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = (event) => {
    event.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) =>
    setData({ ...data, [name]: event.target.value, searched: false });

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length}`;
    }
    if (searched && results.length < 1) {
      return `No Products Found!`;
    }
  };

  const searchProduct = (results = []) => {
    return (
      <div className="row">
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
        {results.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">All</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
          />
        </div>
        <div className="btn btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

  return (
    <div className="container-fluid">
      {searchForm()}
      {searchProduct(results)}
    </div>
  );
};
