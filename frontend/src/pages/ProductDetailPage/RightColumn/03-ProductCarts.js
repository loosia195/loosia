// src/pages/ProductDetailPage/ProductCarts.js
import React from 'react';

/**
 * Props:
 *  - onAddToCart: hàm callback khi click "Add to cart"
 */
function ProductCarts({ onAddToCart }) {
  return (
    <div className="u-mt-3x">
      <div className="u-flex u-gap-1x">
        <button
          type="button"
          className="tup-ui-btn u-flex-1 u-px-0 add-cart-btn"
          onClick={onAddToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCarts;
