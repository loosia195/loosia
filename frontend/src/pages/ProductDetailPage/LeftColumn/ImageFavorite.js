import React, { useState } from 'react';
import styles from './ImageFavorite.module.scss';

function ImageFavorite() {
  // Ban đầu = 0 => không hiển thị text
  const [favoriteCount, setFavoriteCount] = useState(0);

  // Khi bấm, tăng số đếm
  const handleClick = (e) => {
    e.stopPropagation(); // Ngăn sự kiện lan lên parent (zoom)
    setFavoriteCount((prev) => prev + 1);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={styles.favoriteButton}
    >
      {/* Chỉ render span nếu favoriteCount > 0, hoặc luôn render nếu muốn hiển thị 0 */}
      {favoriteCount > 0 && (
        <span className={styles.favoriteCount}>
          {favoriteCount}
        </span>
      )}
      <img
        alt="favorite"
        src="/tup-assets/pwa/production/assets/heart-outline.svg"
        className={styles.icon}
      />
    </button>
  );
}

export default ImageFavorite;
