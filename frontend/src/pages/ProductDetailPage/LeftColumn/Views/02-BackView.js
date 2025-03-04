// ProductDetailPage/LeftColumn/Thumbnails/02-BackView.js
import React from 'react';
import styles from '../ImageThumbnails.module.scss';

/**
 * Props:
 *  - onClick: function => gọi khi user click thumbnail
 *  - onMouseEnter: function => gọi khi hover thumbnail
 *  - isActive: boolean => true nếu thumbnail đang được chọn
 *  - thumbUrl: string => link ảnh
 *  - altText: string => alt cho <img>, default "Back view image"
 *  - overlayIcon: string => link icon overlay (nếu cần)
 */

function BackView({
  onClick,
  onMouseEnter,
  isActive = false,
  thumbUrl = '',
  altText = 'Back view image',
  overlayIcon,
}) {
  // Nếu thumbUrl rỗng => không hiển thị
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

export default BackView;
