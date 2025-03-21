// File: src/pages/ProductDetailPage/LeftColumn/Image360.js

import React, { useState, useEffect } from 'react';
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
  imageUrl = '',
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
   */
  const scaledWidth = 612;   // Chiều rộng khung hiển thị
  const scaledHeight = 816;  // Chiều cao khung hiển thị

  // Tính offset X dựa trên frame hiện tại (đã scale)
  const offsetX = -(currentFrame * scaledWidth);

  // Tổng bề rộng sprite sau khi scale (thay vì 19968, nay còn ~15912)
  const spriteTotalWidth = scaledWidth * totalFrames; // 612 * 26 = 15912

  // Hiển thị "Drag to see 360°" sau khi auto-rotate xong
  const [showDragLabel, setShowDragLabel] = useState(false);

  // ------------------------------
  // TỰ ĐỘNG XOAY => 2×totalFrames để đảm bảo từ front -> back -> front
  // ------------------------------
  useEffect(() => {
    let frameCount = 0;
    const intervalId = setInterval(() => {
      setCurrentFrame((prev) => {
        const nextFrame = (prev + 1) % totalFrames;
        frameCount++;
        // Sau 2×totalFrames bước => dừng => về lại frame 0
        if (frameCount >= totalFrames * 2) {
          clearInterval(intervalId);
          setShowDragLabel(true); // Hiển thị nút "Drag to see 360°"
        }
        return nextFrame;
      });
    }, 50); // tốc độ xoay 100ms / frame

    return () => clearInterval(intervalId);
  }, [totalFrames]);

  // ------------------------------
  // DRAG CHUỘT ĐỂ XOAY THỦ CÔNG
  // ------------------------------
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setShowDragLabel(false); // Khi drag => ẩn label
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;

    // Kéo 5px => đổi 1 frame
    if (Math.abs(deltaX) > 5) {
      if (deltaX > 0) {
        setCurrentFrame((prev) => (prev + 1) % totalFrames);
      } else {
        setCurrentFrame((prev) => (prev - 1 + totalFrames) % totalFrames);
      }
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // ------------------------------
  // CHẶN DRAG KHI DI CHUỘT VÀO ICON
  // ------------------------------
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
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
          backgroundImage: `url(${imageUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${spriteTotalWidth}px ${scaledHeight}px`,
          backgroundPosition: `${offsetX}px 0`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      />

      {/* Nút "Drag to see 360°" ở giữa ảnh, chỉ hiện khi showDragLabel = true */}
      {showDragLabel && (
        <div className={styles.dragLabel}>
          Drag to see 360°
        </div>
      )}

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
