// ProductDetailPage/LeftColumn/ProductImagesGallery.js

import React, { useState } from 'react';
import ImageThumbnails from './ImageThumbnails';
import ImageMain from './ImageMain';
import './ProductImagesGallery.css';

/**
 * Props:
 *  - images: array of { type, thumbUrl, urlLarge, alt, overlayIcon, ... }
 *  - stickyTop: number (px offset for sticky)
 */

function ProductImagesGallery({ images, stickyTop = 72 }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Next/Prev
  const handleNext = () => {
    if (selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  // Ảnh hiện tại
  const currentImage = images[selectedIndex];

  return (
    <div
      className="product-images-gallery u-sticky"
      style={{ top: `${stickyTop}px` }}
    >
      <div className="u-flex u-gap-2x u-justify-between gallery-wrapper">
        {/* Thumbnails cột trái */}
        <div className="thumbs-col">
          <ImageThumbnails
            images={images}
            selectedIndex={selectedIndex}
            onSelect={(idx) => setSelectedIndex(idx)}
          />
        </div>

        {/* Main image cột phải */}
        <div className="main-col">
          <ImageMain
            image={currentImage}
            onNext={handleNext}
            onPrev={handlePrev}
            disabledNext={selectedIndex === images.length - 1}
            disabledPrev={selectedIndex === 0}
            onFavorite={() => alert('Favorited!')}
            favoriteCount={24}
            lookLink="/look"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductImagesGallery;

