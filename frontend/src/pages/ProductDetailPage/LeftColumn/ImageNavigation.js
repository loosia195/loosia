// ProductDetailPage/LeftColumn/ImageNavigation.js

import React from 'react';

function ImageNavigation({ onPrev, onNext, disabledPrev, disabledNext }) {
  // Chặn sự kiện chuột lan truyền để tránh kích hoạt hiệu ứng zoom ở ImageMain
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="u-flex u-gap-2x u-right-1x u-bottom-1x u-absolute navigation-container"
      onMouseEnter={stopPropagation}
      onMouseMove={stopPropagation}
      onMouseLeave={stopPropagation}
    >
      <button
        className="ui-button-floating inverted"
        type="button"
        onClick={onPrev}
        disabled={disabledPrev}
      >
        <img
          alt="arrow previous"
          src={process.env.PUBLIC_URL + "/tup-assets/pwa/production/assets/arrow-left.svg"}
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
          src={process.env.PUBLIC_URL + "/tup-assets/pwa/production/assets/arrow-right.svg"}
          width="20"
          height="20"
        />
      </button>
    </div>
  );
}

export default ImageNavigation;
