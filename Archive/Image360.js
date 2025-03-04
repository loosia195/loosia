// File: src/pages/ProductDetailPage/LeftColumn/Image360.js

import React, { useState } from 'react';
import styles from './Image360.module.scss';

// Các icon components
import ImageNavigation from './ImageNavigation';
import ImageFavorite from './ImageFavorite';
import ImageLook from './ImageLook';

/**
 * Props:
 * - imageUrl: string => Đường dẫn sprite 3D
 * - totalFrames: number => Tổng số khung (vd. 26)
 * - frameWidth: number => Rộng gốc 1 khung (vd. 768)
 * - frameHeight: number => Cao gốc 1 khung (vd. 1024)
 *
 * - onNext, onPrev, disabledNext, disabledPrev => Điều khiển vantage
 * - onFavorite, favoriteCount => Nút Favorite
 * - lookLink => Link "Shop Look"
 */
function Image360({
  imageUrl = 'sprite_360_desktop.jpg',
  totalFrames = 26,
  frameWidth = 768,
  frameHeight = 1024,
  onNext,
  onPrev,
  disabledNext,
  disabledPrev,
  onFavorite,
  favoriteCount,
  lookLink,
}) {
  // State để xoay 3D
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  /**
   * Thay vì hiển thị mỗi frame đúng kích thước gốc (768×1024),
   * ta muốn thu nhỏ xuống, ví dụ 612×816.
   * => scale = 612/768 = 0.796875 (hoặc 816/1024 = 0.796875).
   * Anh có thể tùy chỉnh 2 giá trị scaledWidth/scaledHeight này
   * cho khớp layout mong muốn.
   */
  const scaledWidth = 612;  // frame hiển thị: 612
  const scaledHeight = 816; // frame hiển thị: 816

  // Tính offset X dựa trên frame hiện tại (đã scale)
  const offsetX = -(currentFrame * scaledWidth);

  // Tổng bề rộng sprite sau khi scale (thay vì 19968, nay còn ~15912)
  const spriteTotalWidth = scaledWidth * totalFrames; // 612 * 26 = 15912

  // Bắt đầu kéo
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  // Kéo chuột => xoay frame
  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;
    // Kéo 5px => đổi 1 frame (tuỳ chỉnh)
    if (Math.abs(deltaX) > 5) {
      if (deltaX > 0) {
        // Kéo phải => frame kế tiếp
        setCurrentFrame((prev) => (prev + 1) % totalFrames);
      } else {
        // Kéo trái => frame lùi
        setCurrentFrame((prev) => (prev - 1 + totalFrames) % totalFrames);
      }
      // Reset lại startX
      setStartX(e.clientX);
    }
  };

  // Thả chuột => ngừng kéo
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Chặn drag khi di chuột vào icon
  const handleIconMouseEnter = (e) => {
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleIconMouseMove = (e) => e.stopPropagation();
  const handleIconMouseLeave = (e) => e.stopPropagation();

  return (
    <div
      className={styles.spriteContainer}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Khung 3D */}
      <div
        className={styles.sprite3D}
        style={{
          // Thay vì frameWidth × frameHeight gốc, ta hiển thị scaledWidth × scaledHeight
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,

          // Sử dụng sprite gốc, phóng to/thu nhỏ bằng backgroundSize
          backgroundImage: `url(${imageUrl})`,
          backgroundRepeat: 'no-repeat',

          /**
           * backgroundSize = spriteTotalWidth × scaledHeight
           * => Thu nhỏ toàn bộ sprite
           */
          backgroundSize: `${spriteTotalWidth}px ${scaledHeight}px`,

          /**
           * backgroundPosition = offsetX px 0
           * => Di chuyển theo frame
           */
          backgroundPosition: `${offsetX}px 0`,

          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      />

      {/* Navigation icons (góc dưới phải) */}
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

      {/* Favorite + ShopLook (góc trên phải) */}
      <div
        className={styles.topRightContainer}
        onMouseEnter={handleIconMouseEnter}
        onMouseMove={handleIconMouseMove}
        onMouseLeave={handleIconMouseLeave}
      >
        <ImageLook href={lookLink} />
        <ImageFavorite
          onClick={onFavorite}
          favoriteCount={favoriteCount}
        />
      </div>
    </div>
  );
}

export default Image360;
