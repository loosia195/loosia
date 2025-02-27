// src/pages/ProductDetailPage/ProductPrices.js
import React from 'react';
import Tippy from '@tippyjs/react'; 
import 'tippy.js/dist/tippy.css'; // CSS mặc định của Tippy

/**
 * Props:
 *  - originalPrice (Number)
 *  - salePrice (Number)
 *  - discountInfo (String) - ví dụ: "50% off with code FIRST50"
 *  - estimatedRetail (Number)
 *  - estimatedRetailPercent (Number) - ví dụ: 53
 *  - discountCode (String) - ví dụ: "FIRST50"
 */
function ProductPrices({
  originalPrice,
  salePrice,
  discountInfo,
  discountCode,
  estimatedRetail,
  estimatedRetailPercent
}) {
  // Tippy content cho tooltip "What is estimated retail price?"
  const tooltipContent = (
    <div style={{ maxWidth: '250px' }}>
      <p>The item you’ve got your eye on is secondhand. You probably already know that, but just in case.</p>
      <p>The strikethrough price shown next to any listed item represents the estimated original retail price of a comparable item of the same quality, construction and material offered elsewhere in new condition.</p>
      <p style={{ marginBottom: 0 }}>See Estimated Pricing Information below to learn more.</p>
    </div>
  );

  return (
    <div>
      {/* Block hiển thị giá gốc / sale / discount code */}
      <div className="u-flex u-items-center u-flex-wrap">
        {originalPrice && (
          <span className="heading-md-bold u-mr-1xs">
            ${originalPrice.toFixed(2)}
          </span>
        )}
        {salePrice && (
          <span className="heading-md-bold u-text-alert">
            ${salePrice.toFixed(2)}
          </span>
        )}
        {/* discountInfo, ví dụ: "50% off with code" */}
        {discountInfo && (
          <span className="u-text-alert u-ml-1xs">
            {discountInfo}
          </span>
        )}
        {/* Mã code bọc trong overline */}
        {discountCode && (
          <span className="overline u-text-alert u-bg-alert-light u-rounded-4 u-mx-1xs u-px-1x discount-code">
            {discountCode}
          </span>
        )}
      </div>

      {/* Block hiển thị estimated retail */}
      <div className="u-flex u-gap-1xs u-mt-1xs md:u-mt-1x savings">
        {estimatedRetail && (
          <>
            <span className="u-line-through body-copy-bold">
              ${estimatedRetail.toFixed(2)}
            </span>
            <span>
              {estimatedRetailPercent}% off estimated retail
            </span>

            {/* Tooltip icon */}
            <Tippy content={tooltipContent} placement="top">
              <span
                id="estimated-retail-info"
                tabIndex="0"
                style={{ cursor: 'pointer' }}
              >
                <img
                  alt="question-icon"
                  src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
                  style={{ width: '20px', height: '20px', verticalAlign: 'middle' }}
                />
                <span className="u-sr-only">What is estimated retail price?</span>
              </span>
            </Tippy>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductPrices;
