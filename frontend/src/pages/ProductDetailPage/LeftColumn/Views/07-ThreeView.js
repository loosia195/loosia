// ProductDetailPage/LeftColumn/Thumbnails/07-ThreeView.js
import React from 'react';
import styles from '../ImageThumbnails.module.scss';

/**
 * Props:
 *  - onClick
 *  - onMouseEnter
 *  - isActive
 *  - frontUrl: string => ảnh đầu tiên (frontview) dùng cho thumbnail 3D
 *  - altText => default "3D / 360 view image"
 *  - overlayIcon => icon 360°, mặc định "/images/360-icon.svg"
 */

function ThreeDView({
  onClick,
  onMouseEnter,
  isActive = false,
  frontUrl = '',
  altText = '3D / 360 view image',
  overlayIcon = '/icons/arrow-360.svg',
}) {
  // Nếu không có frontUrl => không hiển thị
  if (!frontUrl) {
    return null;
  }

  // Gộp class .thumbnailBtn + .active (nếu vantage đang được chọn)
  const buttonClass = isActive
    ? `${styles.thumbnailBtn} ${styles.active}`
    : styles.thumbnailBtn;

  return (
    <button
      type="button"
      aria-label={altText}
      className={buttonClass}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {/* Ảnh tĩnh (frontview) hiển thị ở thumbnail 3D */}
      <img
        alt={altText}
        src={frontUrl}
        width="60"
        height="80"
        className={styles.thumbnailImg}
      />

      {/* Overlay icon 360° => báo hiệu vantage 3D */}
      {overlayIcon && (
        <div className={styles.overlayIconContainer}>
          <img
            alt="3D icon"
            src={overlayIcon}
            width="24"
            height="24"
          />
        </div>
      )}
    </button>
  );
}

export default ThreeDView;
