// ProductDetailPage/LeftColumn/ImageNavigation.js

import React from 'react';

/**
 * Props gợi ý:
 *  - onPrev(): callback khi bấm nút prev
 *  - onNext(): callback khi bấm nút next
 *  - disabledPrev: boolean, nếu true => disable nút prev
 *  - disabledNext: boolean, nếu true => disable nút next
 */

function ImageNavigation({ onPrev, onNext, disabledPrev, disabledNext }) {
  return (
    <div className="u-flex u-gap-2x u-right-1x u-bottom-1x u-absolute navigation-container">
      <button
        className="ui-button-floating inverted"
        type="button"
        onClick={onPrev}
        disabled={disabledPrev}
      >
        <img
          alt="arrow previous"
          src="/tup-assets/pwa/production/assets/arrow-left-gray-6.svg"
          width="20"
          height="20"
        />
      </button>

      <button
        className="ui-button-floating inverted"
        type="button"
        onClick={onNext}
        disabled={disabledNext}
      >
        <img
          alt="arrow next"
          src="/tup-assets/pwa/production/assets/arrow-right.svg"
          width="20"
          height="20"
        />
      </button>
    </div>
  );
}

export default ImageNavigation;
