// src/pages/ProductDetailPage/ProductShippingReturns.js
import React from 'react';

/**
 * Props:
 *  - shippingReturns (string) => ví dụ: "Free shipping on orders over $89. Return items within 14 days..."
 *  - onDetailsClick (optional callback) => khi bấm "Details" 
 */
function ProductShippingReturns({
  shippingReturns,
  onDetailsClick
}) {
  return (
    <div className="u-my-3x" id="shipping_and_returns_section">
      <h2 className="heading-sm-bold u-mb-1x">Shipping &amp; returns</h2>
      <p className="body-copy">
        {shippingReturns || 'No shipping info'}
        {' '}
        <button
          className="ui-link"
          type="button"
          onClick={() => {
            if (onDetailsClick) {
              onDetailsClick();
            } else {
              alert('Show shipping & returns details...');
            }
          }}
        >
          Details
        </button>
      </p>
    </div>
  );
}

export default ProductShippingReturns;
