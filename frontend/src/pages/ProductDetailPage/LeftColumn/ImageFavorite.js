// ProductDetailPage/LeftColumn/ImageFavorite.js

import React from 'react';

/**
 * Props:
 *  - favoriteCount (number): số lượt yêu thích (VD: 24)
 *  - onClick(): callback khi user bấm nút yêu thích
 */

function ImageFavorite({ favoriteCount = 24, onClick }) {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <button
      className="ui-button-floating inverted"
      type="button"
      onClick={onClick}
      onMouseEnter={stopPropagation}
      onMouseMove={stopPropagation}
      onMouseLeave={stopPropagation}
    >
      <span className="body-copy-sm-bold u-mr-1xs">
        {favoriteCount}
      </span>
      <img
        alt="favorite"
        src="/tup-assets/pwa/production/assets/heart-outline.svg"
        width="16"
        height="16"
      />
    </button>
  );
}

export default ImageFavorite;

