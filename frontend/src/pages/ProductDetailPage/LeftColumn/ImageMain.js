// ProductDetailPage/LeftColumn/ImageMain.js
// Thay thế logic cũ bằng ZoomableImage (zoom advanced)

import React, { useState } from 'react';
import ImageNavigation from './ImageNavigation';
import ImageFavorite from './ImageFavorite';
import ImageLook from './ImageLook';

/**
 * Zoomable Image (Advanced):
 * - imageUrl: ảnh xlarge
 * - retinaUrl: ảnh 2x (nếu có)
 * - altText: string => alt cho ảnh
 * - onNext, onPrev => navigation
 * - disabledNext, disabledPrev => logic arrow
 * - onFavorite, favoriteCount => top-right
 * - lookLink => "Shop look"
 */

function ImageMain({
  imageUrl = '',
  retinaUrl = '',        // optional, for better zoom
  altText = 'Main product image',
  onNext,
  onPrev,
  disabledNext,
  disabledPrev,
  onFavorite,
  favoriteCount,
  lookLink,
}) {
  // Zoom states
  const [hovered, setHovered] = useState(false);
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(50);

  // Nếu không có ảnh => không hiển thị
  if (!imageUrl) return null;

  // handle mouse events for zoom overlay
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    // convert to background-position
    const px = (x / width) * 100;
    const py = (y / height) * 100;
    setPosX(px);
    setPosY(py);
  };

  // actual retina link to use
  const overlayUrl = retinaUrl || imageUrl; // fallback

  return (
    <div
      className="main-image-container"
      style={{ position: 'relative', width: '100%', cursor: 'zoom-in' }}
      role="button"
      tabIndex="0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Ảnh gốc */}
      <img
        alt={altText}
        src={imageUrl}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          borderRadius: '4px',
          transition: 'opacity 0.2s',
        }}
      />

      {/* Overlay background (zoom) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          backgroundImage: `url(${overlayUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '200%', // phóng to 2x
          backgroundPosition: `${posX}% ${posY}%`,
          borderRadius: '4px',
          transition: 'opacity 0.2s',
          opacity: hovered ? 1 : 0, // hover => hiện overlay
        }}
      />

      {/* Khi hover => ảnh gốc mờ đi */}
      {hovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundColor: 'transparent',
            transition: 'opacity 0.2s',
          }}
        >
          {/* Ẩn ảnh gốc => set opacity=0 */}
        </div>
      )}

      {/* Nút next/prev (góc dưới phải) */}
      <div
        className="navigation-container"
        style={{
          position: 'absolute',
          right: '8px',
          bottom: '8px',
          display: 'flex',
          gap: '8px',
          zIndex: 1,
        }}
      >
        <ImageNavigation
          onPrev={onPrev}
          onNext={onNext}
          disabledPrev={disabledPrev}
          disabledNext={disabledNext}
        />
      </div>

      {/* Shop look + favorite (góc trên phải) */}
      <div
        className="u-absolute u-top-1x u-right-1x u-flex u-gap-2x"
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          display: 'flex',
          gap: '8px',
          zIndex: 1,
        }}
      >
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
