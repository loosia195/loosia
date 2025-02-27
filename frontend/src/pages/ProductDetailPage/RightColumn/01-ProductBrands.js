// ProductBrands.js
import React from 'react';

/**
 * ProductBrands component
 * Hiển thị:
 *  - Brand (link)
 *  - Size & Category
 *  - Availability (có chấm tròn xanh)
 *  - Ẩn H1 để SEO
 */
function ProductBrands({ brand, brandLink, size, category, availability }) {
  return (
    <div className="u-mb-3x u-relative">
      {/* H1 ẩn để SEO, screen reader */}
      <h1 className="ui-visually-hidden">
        {brand} {category}
      </h1>

      <div className="u-flex u-justify-between">
        <div className="u-flex u-flex-col u-mx-0 u-mb-3x u-flex-1">
          {/* Brand link */}
          <div>
            <a
              className="ui-link heading-sm"
              title={brand}
              href={brandLink}
              style={{ paddingBottom: '2px' }}
            >
              {brand}
            </a>
          </div>

          {/* Size & Category */}
          <div className="u-flex u-mt-1x">
            <span>Size {size}</span>
            <span className="u-text-gray-6 u-ml-1xs">{category}</span>
          </div>

          {/* Availability */}
          <div className="body-copy-sm u-mt-1xs">
            <span
              className="u-inline-block u-bg-green-3 u-rounded-full"
              style={{ height: '6px', width: '6px', marginBottom: '2px' }}
            >
              {/* Chấm tròn xanh */}
            </span>
            {' '}
            {availability}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductBrands;
