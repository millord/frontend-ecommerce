import React, { useState, useEffect } from "react";
import { Layout } from "./Layout";
import { getCategories } from "./apiCore";
import "./styles.css";
import { Checkbox } from "./Checkbox";
import { prices } from "./fixedPrices";
import { RadioBox } from "./RadioBox";
import { getFilteredProducts } from "../core/apiCore";
import { Card } from "./Card";

const Shop = () => {
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });

  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
      }
    });
  };

  useEffect(() => {
    init();
    loadFilteredResults();
  }, []);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    if (filterBy == "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layout
      title="Home"
      description="Home E-commerce App"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by Categories</h4>

          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
          <h4>Filter by Range Price</h4>

          <div>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-8">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResults.map((product, i) => (
              <div className="col-6 mb-3">
                <Card product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
