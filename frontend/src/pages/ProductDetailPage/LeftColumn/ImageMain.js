// ProductDetailPage/LeftColumn/ImageMain.js

import React from 'react';
import ImageNavigation from './ImageNavigation';
import ImageFavorite from './ImageFavorite';
import ImageLook from './ImageLook';

/**
 * Props:
 *  - imageUrl (string) => URL ảnh chính
 *  - altText (string) => alt cho ảnh (optional)
 *  - onNext(): callback next
 *  - onPrev(): callback prev
 *  - disabledNext: boolean
 *  - disabledPrev: boolean
 *  - onFavorite(): callback favorite
 *  - favoriteCount: number
 *  - lookLink (string) => link “Shop look” (hoặc “Shop similar”)
 */

function ImageMain({
  imageUrl,
  altText = 'Main product image',
  onNext,
  onPrev,
  disabledNext,
  disabledPrev,
  onFavorite,
  favoriteCount,
  lookLink,
}) {
  if (!imageUrl) {
    // Nếu không có URL => không hiển thị
    return null;
  }

  return (
    <div
      className="main-image-container"
      role="button"
      tabIndex="0"
    >
      {/* Ảnh chính */}
      <img
        alt={altText}
        className="main-image"
        src={imageUrl}
      />

      {/* Overlay background effect (mờ 10%) */}
      <div
        className="main-image-overlay"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />

      {/* Nút next/prev (góc dưới phải) */}
      <div className="navigation-container">
        <ImageNavigation
          onPrev={onPrev}
          onNext={onNext}
          disabledPrev={disabledPrev}
          disabledNext={disabledNext}
        />
      </div>

      {/* Shop look + favorite (góc trên phải) */}
      <div className="u-absolute u-top-1x u-right-1x u-flex u-gap-2x">
        <ImageLook href={lookLink} label="Shop look" />
        <ImageFavorite
          favoriteCount={favoriteCount}
          onClick={onFavorite}
        />
      </div>
    </div>
  );
}

export default ImageMain;
