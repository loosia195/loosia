// File: src/pages/ProductDetailPage/ProductImagesGallery.js

import React, { useState } from 'react';
import ImageThumbnails from './ImageThumbnails';
import ImageMain from './ImageMain';
import Image360 from './Image360';
import './ProductImagesGallery.scss';

function ProductImagesGallery({ images, stickyTop = 72 }) {
  // Vantage points => 7 "views": front, back, right, left, topTag, bottomTag, 3d
  const vantagePoints = [
    { type: 'front' },
    { type: 'back' },
    { type: 'right' },
    { type: 'left' },
    { type: 'topTag' },
    { type: 'bottomTag' },
    { type: '3d' },
  ];

  // Map vantage => vantageImages
  const vantageImages = vantagePoints.map((vp, idx) => {
    const url = images[idx] || '';
    return {
      ...vp,
      thumbUrl: url,
      altText: `${vp.type} view image`,
    };
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentImageObj = vantageImages[selectedIndex] || {};

  const handleNext = () => {
    if (selectedIndex < vantageImages.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };
  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const disabledNext = (selectedIndex === vantageImages.length - 1);
  const disabledPrev = (selectedIndex === 0);

  const vantageType = currentImageObj.type || '';

  return (
    <div
      className="product-images-gallery"
      style={{ position: 'sticky', top: stickyTop }}
    >
      <div className="gallery-wrapper">
        <div className="thumbs-col">
          <ImageThumbnails
            images={vantageImages}
            selectedIndex={selectedIndex}
            onSelect={(idx) => setSelectedIndex(idx)}
          />
        </div>

        <div className="main-col">
          {vantageType === '3d' ? (
            <Image360
              // Sử dụng sprite 3D (ảnh thứ 7, index=6)
              imageUrl={images[6] || ''}
              // 26 frames, 768×1024 => khớp với sprite 19968×1024
              totalFrames={26}
              frameWidth={768}
              frameHeight={1024}
              onNext={handleNext}
              onPrev={handlePrev}
              disabledNext={disabledNext}
              disabledPrev={disabledPrev}
              onFavorite={() => alert('Favorited!')}
              favoriteCount={24}
              lookLink="/look"
            />
          ) : (
            <ImageMain
              imageUrl={currentImageObj.thumbUrl || ''}
              onNext={handleNext}
              onPrev={handlePrev}
              disabledNext={disabledNext}
              disabledPrev={disabledPrev}
              onFavorite={() => alert('Favorited!')}
              favoriteCount={24}
              lookLink="/look"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductImagesGallery;
