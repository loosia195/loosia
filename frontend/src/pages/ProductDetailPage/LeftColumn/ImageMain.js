// ProductDetailPage/LeftColumn/ImageMain.js
// Thay thế logic cũ bằng ZoomableImage (zoom advanced)

import React, { useState } from 'react';
import ImageNavigation from './ImageNavigation';
import ImageFavorite from './ImageFavorite';
import ImageLook from './ImageLook';

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
  const [hovered, setHovered] = useState(false);
  const [hoveringIcons, setHoveringIcons] = useState(false);
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(50);

  if (!imageUrl) return null;

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    const px = (x / width) * 100;
    const py = (y / height) * 100;
    setPosX(px);
    setPosY(py);
  };

  const overlayUrl = retinaUrl || imageUrl;

  // Nếu chuột đang hover trên vùng chứa icon => tắt hiệu ứng zoom (opacity=0)
  const overlayOpacity = (hovered && !hoveringIcons) ? 1 : 0;

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

      {/* Overlay zoom */}
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
          opacity: overlayOpacity,
        }}
      />

      {/* Các nút và icon - khi hover vào vùng này thì ảnh sẽ trở lại trạng thái bình thường */}
      <div
        onMouseEnter={() => setHoveringIcons(true)}
        onMouseLeave={() => setHoveringIcons(false)}
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

      <div
        onMouseEnter={() => setHoveringIcons(true)}
        onMouseLeave={() => setHoveringIcons(false)}
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
        <ImageLook href={lookLink} />
        <ImageFavorite
          favoriteCount={favoriteCount}
          onClick={onFavorite}
        />
      </div>
    </div>
  );
}

export default ImageMain;
