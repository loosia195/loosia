// ProductDetailPage/LeftColumn/index.js

import React from 'react';
import ProductImagesGallery from './ProductImagesGallery';

/**
 * Aggregator cho cột trái:
 * - Gọi ProductImagesGallery, truyền props images (mảng ảnh)
 * - Có thể style cột trái (width, v.v.) nếu muốn
 */

function LeftColumn({ images }) {
  return (
    <div className="left-column" style={{ width: '50%' }}>
      <ProductImagesGallery images={images} stickyTop={72} />
    </div>
  );
}

export default LeftColumn;
