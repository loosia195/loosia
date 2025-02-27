// AddProductPage/LeftColumn/index.js
import React from 'react';
import AddImagesForm from './AddImagesForm';
import './AddImagesForm.css';

/**
 * Aggregator cột trái (LeftColumn):
 * - Hiển thị form upload ảnh (AddImagesForm)
 * - Mỗi vantage point (Front, Back, Right, etc.) do AddImagesForm quản lý
 *   hoặc tách ra subfolder "Views/" 
 */

function LeftColumn({ images, setImages }) {
  return (
    <div className="left-column" style={{ width: '50%' }}>
      <AddImagesForm
        images={images}
        setImages={setImages}
      />
    </div>
  );
}

export default LeftColumn;

