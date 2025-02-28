// ProductDetailPage/LeftColumn/ProductImagesGallery.js

import React, { useState } from 'react';
import ImageThumbnails from './ImageThumbnails';
import ImageMain from './ImageMain';
import './ProductImagesGallery.css';

/**
 * Mảng `images` => array of string (VD: [ "http://.../img1.jpg", "http://.../img2.jpg" ])
 * HOẶC => array of objects { type, thumbUrl, ... } => tuỳ DB
 * 
 * selectedIndex => state => main image
 * vantagePoints => cứng: [ front, back, right, left, topTag, bottomTag, 3d ]
 */

function ProductImagesGallery({ images, stickyTop = 72 }) {
  // 1) Tạo vantagePoints cứng (nếu DB chỉ trả array string)
  const vantagePoints = [
    { type: 'front' },
    { type: 'back' },
    { type: 'right' },
    { type: 'left' },
    { type: 'topTag' },
    { type: 'bottomTag' },
    { type: '3d' },
  ];

  // 2) Gộp vantagePoints + images => vantageImages
  //    Mỗi vantage point => vantageImages[i] = { type, thumbUrl: images[i] }
  const vantageImages = vantagePoints.map((vp, idx) => {
    // images[idx] có thể undefined => fallback ''
    const url = images[idx] || '';
    return {
      ...vp,
      thumbUrl: url,
      altText: `${vp.type} view image`,
      // overlayIcon: ... // if needed
    };
  });

  // 3) selectedIndex => hiển thị vantageImages[selectedIndex]
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentImageObj = vantageImages[selectedIndex] || {};

  // Next/Prev
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

  // 4) imageUrl => main image
  // vantage points code => `thumbUrl` or `urlLarge`
  const imageUrl = currentImageObj.thumbUrl || '';

  return (
    <div
      className="product-images-gallery"
      style={{ position: 'sticky', top: stickyTop }}
    >
      <div className="gallery-wrapper">
        {/* Bên trái: Thumbnails (vertical) */}
        <div className="thumbs-col">
          <ImageThumbnails
            images={vantageImages}       // array of objects
            selectedIndex={selectedIndex}
            onSelect={(idx) => setSelectedIndex(idx)}
          />
        </div>

        {/* Bên phải: Main Image */}
        <div className="main-col">
          <ImageMain
            imageUrl={imageUrl}
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
