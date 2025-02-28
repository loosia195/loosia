// ProductDetailPage/LeftColumn/ProductImagesGallery.js

import React, { useState } from 'react';
import ImageThumbnails from './ImageThumbnails';
import ImageMain from './ImageMain';
import './ProductImagesGallery.css';

/**
 * Props:
 *  - images: array of string (e.g. ["http://.../img1.jpg", "http://.../img2.jpg", ...])
 *  - stickyTop: number => px offset for sticky
 *
 * Logic:
 * 1) selectedIndex => ảnh hiện tại
 * 2) handleNext / handlePrev => di chuyển index
 * 3) currentImageUrl = images[selectedIndex]
 * 4) Truyền images xuống <ImageThumbnails> => hiển thị list
 * 5) Truyền currentImageUrl => <ImageMain> => hiển thị ảnh lớn
 */

function ProductImagesGallery({ images, stickyTop = 72 }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Ảnh hiện tại => URL
  const currentImageUrl = images[selectedIndex] || '';

  // Next
  const handleNext = () => {
    if (selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  // Prev
  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  // Disabled logic
  const disabledNext = (selectedIndex === images.length - 1);
  const disabledPrev = (selectedIndex === 0);

  return (
    <div
      className="product-images-gallery u-sticky"
      style={{ top: `${stickyTop}px` }}
    >
      <div className="u-flex u-gap-2x u-justify-between gallery-wrapper">
        {/* Thumbnails cột trái */}
        <div className="thumbs-col">
          <ImageThumbnails
            images={images}            // array of strings
            selectedIndex={selectedIndex}
            onSelect={(idx) => setSelectedIndex(idx)}
          />
        </div>

        {/* Main image cột phải */}
        <div className="main-col">
          <ImageMain
            imageUrl={currentImageUrl}  // URL ảnh
            onNext={handleNext}
            onPrev={handlePrev}
            disabledNext={disabledNext}
            disabledPrev={disabledPrev}
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