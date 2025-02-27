// AddProductPage/RightColumn/01-AddProductBrands.js

import React from 'react';

/**
 * Props:
 *  - brand (string)
 *  - setBrand (function)
 *  - category (string)
 *  - setCategory (function)
 *  - size (string)
 *  - setSize (function)
 *  - availability (string)
 *  - setAvailability (function)
 */

function AddProductBrands({
  brand, setBrand,
  category, setCategory,
  size, setSize,
  availability, setAvailability
}) {
  return (
    <section className="add-product-brands form-section">
      <h2>Brand &amp; Category</h2>

      <div className="form-field">
        <label>Brand:</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="e.g. Mac Duggal"
        />
      </div>

      <div className="form-field">
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Cocktail dress"
        />
      </div>

      <div className="form-field">
        <label>Size:</label>
        <input
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="e.g. 6"
        />
      </div>

      <div className="form-field">
        <label>Availability:</label>
        <input
          type="text"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          placeholder="e.g. Only 1 Available"
        />
      </div>
    </section>
  );
}

export default AddProductBrands;
