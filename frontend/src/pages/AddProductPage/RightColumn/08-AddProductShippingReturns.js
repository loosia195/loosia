// AddProductPage/RightColumn/08-AddProductShippingReturns.js

import React from 'react';

/**
 * Props:
 *  - shippingReturns (string)
 *  - setShippingReturns (function)
 */

function AddProductShippingReturns({
  shippingReturns,
  setShippingReturns
}) {
  return (
    <section className="add-product-shipping-returns form-section">
      <h2>Shipping &amp; Returns</h2>

      <div className="form-field">
        <label>Policy:</label>
        <textarea
          value={shippingReturns}
          onChange={(e) => setShippingReturns(e.target.value)}
          rows={3}
          placeholder="e.g. Free shipping on orders over $89. Return items within 14 days..."
        />
      </div>
    </section>
  );
}

export default AddProductShippingReturns;
