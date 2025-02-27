// src/pages/ProductDetailPage/ProductSizeFit.js
import React from 'react';

/**
 * Props:
 *  - size (string) => ví dụ "6" (hiển thị "Size 6")
 *  - measure (string) => ví dụ "45.75” length (approx.)"
 *  - onSizeGuide (optional callback) => khi bấm "Size guide"
 *  - onDetails (optional callback) => khi bấm "Details"
 */
function ProductSizeFit({
  size,
  measure,
  onSizeGuide,
  onDetails
}) {
  return (
    <div className="u-mb-3x">
      <h2 className="heading-sm-bold u-mb-1x md:u-mb-2xs">Size &amp; fit</h2>
      <ul className="u-flex u-flex-col u-gap-1xs">
        <li>
          {/* "Size 6" + link "Size guide" */}
          {size ? `Size ${size} ` : 'No size '}
          <button
            className="ui-link"
            type="button"
            onClick={() => {
              if (onSizeGuide) {
                onSizeGuide();
              } else {
                alert('Show Size guide');
              }
            }}
          >
            Size guide
          </button>
        </li>
        <li>
          {/* measure + link "Details" */}
          {measure || 'No measure'}
          {' '}
          <button
            className="ui-link"
            type="button"
            onClick={() => {
              if (onDetails) {
                onDetails();
              } else {
                alert('Show details');
              }
            }}
          >
            Details
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ProductSizeFit;
