// ProductDetailPage/LeftColumn/ImageMain.js

import React from 'react';
import ImageNavigation from './ImageNavigation';
import ImageFavorite from './ImageFavorite';
import ImageLook from './ImageLook';

/**
 * Props:
 *  - image: object => { urlLarge, alt, ... }
 *  - onNext(): callback next
 *  - onPrev(): callback prev
 *  - disabledNext: boolean
 *  - disabledPrev: boolean
 *  - onFavorite(): callback favorite
 *  - favoriteCount: number
 *  - lookLink (string) => link “Shop look” (trước là “Shop similar”)
 */
function ImageMain({
  image,
  onNext,
  onPrev,
  disabledNext,
  disabledPrev,
  onFavorite,
  favoriteCount,
  lookLink
}) {
  if (!image) return null;

  return (
    <div
      className="u-relative u-h-full u-isolate main-image-container"
      role="button"
      tabIndex="0"
    >
      {/* Ảnh chính */}
      <img
        alt={image.alt || 'Main product image'}
        className="u-rounded-4 u-block u-cursor-pointer main-image"
        src={image.urlLarge}
        width="612"
        height="821"
      />

      {/* Overlay background effect (mờ 10%) */}
      <div
        className="u-rounded-4 main-image-overlay"
        style={{
          backgroundImage: `url(${image.urlLarge})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          opacity: 0.1,
          pointerEvents: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      />

      {/* Nút next/prev (góc dưới phải) */}
      <ImageNavigation
        onPrev={onPrev}
        onNext={onNext}
        disabledPrev={disabledPrev}
        disabledNext={disabledNext}
      />

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

