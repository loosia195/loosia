// src/pages/ProductDetailPage/ProductItemDetails.js
import React from 'react';

/**
 * Props:
 *  - itemId (string) => ví dụ "#185644344" (có thể là "185644344" và ta thêm "#" khi hiển thị)
 *  - material (string) => "100% polyester"
 *  - style (string) => "Short sleeve, one-shoulder neckline, bridesmaid, ruched detail, purple, midi-calf length"
 */
function ProductItemDetails({ itemId, material, style }) {
  return (
    <div>
      {/* Tiêu đề + Item ID */}
      <div className="u-flex u-justify-between u-items-center">
        <h2 className="heading-sm-bold">Item details</h2>
        {itemId && (
          <div className="u-ml-2xs u-text-gray-5 u-my-auto">
            #{itemId}
          </div>
        )}
      </div>

      <div className="u-mb-3xs">
        <ul className="u-flex u-flex-col u-gap-1xs u-mt-1x md:u-mt-2xs">
          {/* Liệt kê material, style */}
          {material && <li>{material}</li>}
          {style && <li>{style}</li>}
        </ul>
      </div>
    </div>
  );
}

export default ProductItemDetails;
