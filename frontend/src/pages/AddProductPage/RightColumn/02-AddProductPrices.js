// AddProductPage/RightColumn/02-AddProductPrices.js

import React from 'react';

/**
 * Props:
 *  - originalPrice (string or number)
 *  - setOriginalPrice (function)
 *  - salePrice (string or number)
 *  - setSalePrice (function)
 *  - discountInfo (string)
 *  - setDiscountInfo (function)
 *  - estimatedRetailPrice (string or number)
 *  - setEstimatedRetailPrice (function)
 */

function AddProductPrices({
  originalPrice, setOriginalPrice,
  salePrice, setSalePrice,
  discountInfo, setDiscountInfo,
  estimatedRetailPrice, setEstimatedRetailPrice
}) {
  return (
    <section className="add-product-prices form-section">
      <h2>Pricing</h2>

      <div className="form-field">
        <label>Original Price:</label>
        <input
          type="number"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
          placeholder="e.g. 128.99"
        />
      </div>

      <div className="form-field">
        <label>Sale Price:</label>
        <input
          type="number"
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
          placeholder="e.g. 64.50"
        />
      </div>

      <div className="form-field">
        <label>Discount Info:</label>
        <input
          type="text"
          value={discountInfo}
          onChange={(e) => setDiscountInfo(e.target.value)}
          placeholder="e.g. 50% off with code"
        />
      </div>

      <div className="form-field">
        <label>Estimated Retail Price:</label>
        <input
          type="number"
          value={estimatedRetailPrice}
          onChange={(e) => setEstimatedRetailPrice(e.target.value)}
          placeholder="e.g. 280"
        />
      </div>
    </section>
  );
}

export default AddProductPrices;
