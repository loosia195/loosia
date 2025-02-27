// AddProductPage/RightColumn/06-AddProductSizeFit.js

import React from 'react';

/**
 * Props:
 *  - size (string) - (nếu anh cần tách size & measure)
 *  - setSize (function) - optional
 *  - measure (string) - (nếu anh cần tách)
 *  - setMeasure (function) - optional
 *
 *  - sizeFit (string)
 *  - setSizeFit (function)
 *
 * Tuỳ logic: 
 *   - Có thể tách "size" & "measure" 
 *   - Hoặc chỉ 1 field "sizeFit"
 */

function AddProductSizeFit({
  sizeFit,
  setSizeFit,
  // size, setSize, measure, setMeasure => tuỳ logic
}) {
  return (
    <section className="add-product-size-fit form-section">
      <h2>Size &amp; Fit</h2>

      <div className="form-field">
        <label>Size Fit Info:</label>
        <textarea
          value={sizeFit}
          onChange={(e) => setSizeFit(e.target.value)}
          rows={2}
          placeholder="e.g. Measured at 45.75” length (approx.)"
        />
      </div>
    </section>
  );
}

export default AddProductSizeFit;
