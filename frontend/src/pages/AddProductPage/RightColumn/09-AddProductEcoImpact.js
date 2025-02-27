// AddProductPage/RightColumn/09-AddProductEcoImpact.js

import React from 'react';

/**
 * Props:
 *  - ecoImpact (string)
 *  - setEcoImpact (function)
 */

function AddProductEcoImpact({
  ecoImpact,
  setEcoImpact
}) {
  return (
    <section className="add-product-eco-impact form-section">
      <h2>Eco Impact</h2>
      <div className="form-field">
        <label>Eco Impact:</label>
        <textarea
          value={ecoImpact}
          onChange={(e) => setEcoImpact(e.target.value)}
          rows={3}
          placeholder="e.g. Buying a dress secondhand instead of new..."
        />
      </div>
    </section>
  );
}

export default AddProductEcoImpact;
