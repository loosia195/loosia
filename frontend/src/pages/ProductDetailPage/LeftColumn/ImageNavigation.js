// File: src/pages/ProductDetailPage/LeftColumn/ImageNavigation.js

import React from 'react';
import styles from './ImageNavigation.module.scss';

function ImageNavigation({ onPrev, onNext, disabledPrev, disabledNext }) {
  // Ngăn sự kiện chuột lan truyền (tránh zoom, xoay 3D,...)
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  // Đường dẫn icon
  const arrowLeftSrc = "/tup-assets/pwa/production/assets/arrow-left.svg";
  const arrowRightSrc = "/tup-assets/pwa/production/assets/arrow-right.svg";

  // Hàm click Prev
  const handlePrevClick = (e) => {
    e.stopPropagation();
    if (onPrev) onPrev();
  };

  // Hàm click Next
  const handleNextClick = (e) => {
    e.stopPropagation();
    if (onNext) onNext();
  };

  return (
    <div
      className={styles.navigationContainer}
      onMouseEnter={stopPropagation}
      onMouseMove={stopPropagation}
      onMouseLeave={stopPropagation}
    >
      {/* Nút Prev */}
      <button
        type="button"
        onClick={handlePrevClick}
        disabled={disabledPrev}
        className={styles.navButton}
      >
        <img
          alt="arrow previous"
          src={arrowLeftSrc}
          className={styles.navIcon}
        />
      </button>

      {/* Nút Next */}
      <button
        type="button"
        onClick={handleNextClick}
        disabled={disabledNext}
        className={styles.navButton}
      >
        <img
          alt="arrow next"
          src={arrowRightSrc}
          className={styles.navIcon}
        />
      </button>
    </div>
  );
}

export default ImageNavigation;
