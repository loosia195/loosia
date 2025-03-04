// ProductDetailPage/LeftColumn/Thumbnails/06-BottomTagView.js
import React from 'react';
import styles from '../ImageThumbnails.module.scss';

/**
 * Props:
 *  - onClick
 *  - onMouseEnter
 *  - isActive
 *  - thumbUrl
 *  - altText => default "Bottom Tag view image"
 *  - overlayIcon
 */

function BottomTagView({
  onClick,
  onMouseEnter,
  isActive = false,
  thumbUrl = '',
  altText = 'Bottom Tag view image',
  overlayIcon,
}) {
  if (!thumbUrl) {
    return null;
  }

  // Gộp class .thumbnailBtn + .active (nếu isActive)
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

export default BottomTagView;
