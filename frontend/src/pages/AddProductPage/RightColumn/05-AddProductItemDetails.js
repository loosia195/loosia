// AddProductPage/RightColumn/05-AddProductItemDetails.js

import React from 'react';

/**
 * Props:
 *  - itemID (string)
 *  - setItemID (function)
 *  - material (string)
 *  - setMaterial (function)
 *  - style (string)
 *  - setStyle (function)
 */

function AddProductItemDetails({
  itemID, setItemID,
  material, setMaterial,
  style, setStyle
}) {
  return (
    <section className="add-product-item-details form-section">
      <h2>Item Details</h2>

      <div className="form-field">
        <label>Item ID:</label>
        <input
          type="text"
          value={itemID}
          onChange={(e) => setItemID(e.target.value)}
          placeholder="e.g. #185644344"
        />
      </div>

      <div className="form-field">
        <label>Material:</label>
        <input
          type="text"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          placeholder="e.g. 100% polyester"
        />
      </div>

      <div className="form-field">
        <label>Style:</label>
        <textarea
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          rows={2}
          placeholder="e.g. Short sleeve, one-shoulder neckline..."
        />
      </div>
    </section>
  );
}

export default AddProductItemDetails;
