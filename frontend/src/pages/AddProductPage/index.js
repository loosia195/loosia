// AddProductPage/index.js

import React, { useState } from 'react';
import axios from 'axios';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';
import './AddProductPage.css';

/**
 * Aggregator toàn trang AddProductPage:
 * - Cột trái (LeftColumn) => upload ảnh vantage points => images[]
 * - Cột phải (RightColumn) => brand, price, condition, etc.
 * - Khi user bấm "Create Product" => POST /api/product (kèm token)
 */
function AddProductPage() {
  // State cột phải
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [availability, setAvailability] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [discountInfo, setDiscountInfo] = useState('');
  const [estimatedRetailPrice, setEstimatedRetailPrice] = useState('');
  const [condition, setCondition] = useState('');
  const [conditionDescription, setConditionDescription] = useState('');
  const [itemID, setItemID] = useState('');
  const [material, setMaterial] = useState('');
  const [style, setStyle] = useState('');
  const [sizeFit, setSizeFit] = useState('');
  const [shippingReturns, setShippingReturns] = useState('');
  const [ecoImpact, setEcoImpact] = useState('');

  // State cột trái => images[]
  const [images, setImages] = useState([]);

  // handleSubmit => POST /api/product kèm token
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      brand,
      category,
      size,
      availability,
      originalPrice: Number(originalPrice),
      salePrice: Number(salePrice),
      discountInfo,
      estimatedRetailPrice: Number(estimatedRetailPrice),
      condition,
      conditionDescription,
      itemID,
      material,
      style,
      sizeFit,
      shippingReturns,
      ecoImpact,
      images, // => mảng link "/uploads/..."
    };

    try {
      // Lấy token (VD: user đăng nhập => localStorage.setItem("token", ...)
      const token = localStorage.getItem('token');
      console.log("images array to server:", images);
      // Gọi API => kèm Authorization header
      const res = await axios.post('http://localhost:3000/api/product', newProduct, {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer token
        },
      });

      if (res.data.success) {
        alert('Tạo sản phẩm thành công!');
        // Reset form nếu muốn
      } else {
        alert('Lỗi khi tạo sản phẩm: ' + (res.data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error(error);
      alert('Server error: ' + error.message);
    }
  };

  return (
    <div className="add-product-page u-flex">
      {/* Cột trái => form upload ảnh vantage points */}
      <LeftColumn images={images} setImages={setImages} />

      {/* Cột phải => form brand, price, condition, etc. */}
      <RightColumn
        brand={brand} setBrand={setBrand}
        category={category} setCategory={setCategory}
        size={size} setSize={setSize}
        availability={availability} setAvailability={setAvailability}
        originalPrice={originalPrice} setOriginalPrice={setOriginalPrice}
        salePrice={salePrice} setSalePrice={setSalePrice}
        discountInfo={discountInfo} setDiscountInfo={setDiscountInfo}
        estimatedRetailPrice={estimatedRetailPrice} setEstimatedRetailPrice={setEstimatedRetailPrice}
        condition={condition} setCondition={setCondition}
        conditionDescription={conditionDescription} setConditionDescription={setConditionDescription}
        itemID={itemID} setItemID={setItemID}
        material={material} setMaterial={setMaterial}
        style={style} setStyle={setStyle}
        sizeFit={sizeFit} setSizeFit={setSizeFit}
        shippingReturns={shippingReturns} setShippingReturns={setShippingReturns}
        ecoImpact={ecoImpact} setEcoImpact={setEcoImpact}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default AddProductPage;

