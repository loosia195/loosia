import React, { useState } from 'react';
import styles from './ImageMain.module.scss';

import ImageNavigation from './ImageNavigation';
import ImageFavorite from './ImageFavorite';
import ImageLook from './ImageLook';

function ImageMain({
  imageUrl = '',
  retinaUrl = '',
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
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(50);

  if (!imageUrl) return null;

  const overlayUrl = retinaUrl || imageUrl;

  // Bật zoom khi chuột vào vùng ảnh
  const handleMouseEnter = () => setHovered(true);
  // Tắt zoom khi chuột rời vùng ảnh
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

  // Hàm chặn zoom khi chuột vào vùng icon
  const handleIconMouseEnter = (e) => {
    e.stopPropagation();
    setHovered(false); // tắt zoom ngay
  };
  const handleIconMouseMove = (e) => e.stopPropagation();
  const handleIconMouseLeave = (e) => e.stopPropagation();

  return (
    <div
      className={styles.mainImageContainer}
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
        className={styles.mainImage}
      />

      {/* Overlay zoom */}
      <div
        className={styles.zoomOverlay}
        style={{
          backgroundImage: `url(${overlayUrl})`,
          backgroundSize: '200%', 
          backgroundPosition: `${posX}% ${posY}%`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {hovered && (
        <div className={styles.hoverMask} />
      )}

      {/* Nút next/prev (góc dưới phải) */}
      <div
        className={styles.navigationContainer}
        onMouseEnter={handleIconMouseEnter}
        onMouseMove={handleIconMouseMove}
        onMouseLeave={handleIconMouseLeave}
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
        className={styles.topRightContainer}
        onMouseEnter={handleIconMouseEnter}
        onMouseMove={handleIconMouseMove}
        onMouseLeave={handleIconMouseLeave}
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
