import React, { useState } from "react";

export const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (c) => () => {
    // return the first index or -1
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    //if currently checked was not already in state > push
    // else pull/ take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    //console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  return (
    <div>
      {categories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <input
            value={checked.indexOf(c._id === -1)}
            onChange={handleToggle(c._id)}
            className="form-check-input"
            type="checkbox"
          />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))}
    </div>
  );
};
