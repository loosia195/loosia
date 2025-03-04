// ProductDetailPage/LeftColumn/Thumbnails/03-RightView.js
import React from 'react';
import styles from '../ImageThumbnails.module.scss'; 
// Import SCSS module

/**
 * Props:
 *  - onClick: function => gọi khi user click thumbnail
 *  - onMouseEnter: function => gọi khi hover
 *  - isActive: boolean => thumbnail đang được chọn
 *  - thumbUrl: string => link ảnh
 *  - altText: string => alt cho <img>, default "Right view image"
 *  - overlayIcon: string => link icon overlay (nếu cần)
 */

function RightView({
  onClick,
  onMouseEnter,
  isActive = false,
  thumbUrl = '',
  altText = 'Right view image',
  overlayIcon,
}) {
  if (!thumbUrl) {
    return null;
  }

  // Gộp class thumbnailBtn + active (nếu isActive)
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
      <img
        alt={altText}
        src={thumbUrl}
        width="60"
        height="80"
        className={styles.thumbnailImg}
      />

      {overlayIcon && (
        <div className={styles.overlayIconContainer}>
          <img
            alt="overlay icon"
            src={overlayIcon}
            width="24"
            height="24"
          />
        </div>
      )}
    </button>
  );
}

export default RightView;
