// ProductDetailPage/LeftColumn/Thumbnails/04-LeftView.js
import React from 'react';
import styles from '../ImageThumbnails.module.scss'; 
// Import SCSS module

/**
 * Props:
 *  - onClick: function => click thumbnail
 *  - onMouseEnter: function => hover thumbnail
 *  - isActive: boolean => highlight
 *  - thumbUrl: string => link ảnh
 *  - altText: string => default "Left view image"
 *  - overlayIcon: string => optional icon overlay
 */

function LeftView({
  onClick,
  onMouseEnter,
  isActive = false,
  thumbUrl = '',
  altText = 'Left view image',
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

export default LeftView;
