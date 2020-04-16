import React, { useState, Fragment } from "react";

export const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValues] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value);
    setValues(event.target.value);
  };

  return (
    <Fragment>
      {prices.map((p, i) => (
        <div key={i}>
          <input
            value={`${p._id}`}
            onChange={handleChange}
            className="mr-2 ml-4"
            type="radio"
            name={p}
          />
          <label className="form-check-label">{p.name}</label>
        </div>
      ))}
    </Fragment>
  );
};
