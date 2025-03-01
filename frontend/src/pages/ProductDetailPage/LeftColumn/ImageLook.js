// ProductDetailPage/LeftColumn/ImageLook.js

import React from 'react';

function ImageLook({ href = '/look' }) {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <a
      className="u-flex u-overflow-hidden ui-button-floating inverted u-space-x-1x"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={stopPropagation}
      onMouseMove={stopPropagation}
      onMouseLeave={stopPropagation}
    >
      <img
        alt=""
        src="/tup-assets/pwa/production/assets/shop-similar.svg"
        width="24"
        height="24"
      />
    </a>
  );
}

export default ImageLook;
