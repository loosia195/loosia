// AddProductPage/RightColumn/04-AddProductConditions.js

import React from 'react';

/**
 * Props:
 *  - condition (string)
 *  - setCondition (function)
 *  - conditionDescription (string)
 *  - setConditionDescription (function)
 */

function AddProductConditions({
  condition, setCondition,
  conditionDescription, setConditionDescription
}) {
  return (
    <section className="add-product-conditions form-section">
      <h2>Condition</h2>

      <div className="form-field">
        <label>Condition:</label>
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="e.g. excellent"
        />
      </div>

      <div className="form-field">
        <label>Condition Description:</label>
        <textarea
          value={conditionDescription}
          onChange={(e) => setConditionDescription(e.target.value)}
          rows={3}
          placeholder="e.g. Practically new, no obvious signs of wear"
        />
      </div>
    </section>
  );
}

export default AddProductConditions;

