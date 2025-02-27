// src/pages/ProductDetailPage/ProductConditions.js
import React from 'react';

/**
 * Props:
 *  - condition (string) => ví dụ: "excellent", "like new", ...
 *  - conditionDescription (string) => ví dụ: "Practically new..."
 *  - onStandardsClick (optional callback) => nếu muốn xử lý khi bấm "Our standards"
 */
function ProductConditions({
  condition,
  conditionDescription,
  onStandardsClick
}) {
  return (
    <div className="u-mb-3xs">
      <div className="u-flex md:u-mb-2xs u-mb-1x u-items-center">
        <h2 className="heading-sm-bold u-leading-none">Condition</h2>
        {condition && (
          <span
            className="u-ml-2xs u--mb-1xs u-rounded-4 u-py-1xs u-px-1x overline u-bg-green-dark u-text-white condition-badge"
            style={{ marginLeft: '8px' }}
          >
            {condition}
          </span>
        )}
      </div>

      <p className="body-copy u-mb-1xs">
        {conditionDescription || 'No description'}
        {' '}
        <button
          className="ui-link"
          type="button"
          onClick={() => {
            if (onStandardsClick) {
              onStandardsClick();
            } else {
              alert('Redirect to "Our standards" page?');
            }
          }}
        >
          Our standards
        </button>
      </p>
    </div>
  );
}

export default ProductConditions;
