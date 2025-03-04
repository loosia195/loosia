// File: src/pages/ProductDetailPage/LeftColumn/ImageLook.js

import React from 'react';
import styles from './ImageLook.module.scss';

function ImageLook({ href = '/look' }) {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={stopPropagation}
      onMouseMove={stopPropagation}
      onMouseLeave={stopPropagation}
      className={styles.lookButton}
    >
      <img
        alt="Shop similar icon"
        src="/tup-assets/pwa/production/assets/shop-similar.svg"
        className={styles.icon}
      />
    </a>
  );
}

export default ImageLook;
