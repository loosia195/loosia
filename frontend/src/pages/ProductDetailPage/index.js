// ProductDetailPage/index.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';
import './ProductDetailPage.css';

/**
 * Trang chi tiết sản phẩm (ProductDetailPage):
 * - Lấy productId từ match.params.id (React Router v5 style)
 * - Gọi GET http://localhost:3000/api/product/:id kèm token
 * - Hiển thị cột trái (LeftColumn) và cột phải (RightColumn)
 */

function ProductDetailPage({ match }) {
  // Lấy id từ match.params
  const productId = match?.params?.id;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Nếu productId undefined => không gọi API
    if (!productId) return;

    // Lấy token từ localStorage
    const token = localStorage.getItem('token');

    // Tạo config header Authorization
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    // Gọi API GET /api/product/:id
    axios
      .get(`http://localhost:3000/api/product/${productId}`, config)
      .then((res) => {
        if (res.data.success) {
          setProduct(res.data.product);
        } else {
          console.error('Không tìm thấy sản phẩm hoặc success=false');
        }
      })
      .catch((err) => {
        console.error('Lỗi khi tải chi tiết sản phẩm:', err);
      });
  }, [productId]);

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="product-detail-page u-flex">
      {/* Cột trái hiển thị ảnh sản phẩm */}
      <LeftColumn images={product.images || []} />

      {/* Cột phải hiển thị thông tin (brand, price, condition, v.v.) */}
      <RightColumn product={product} />
    </div>
  );
}

export default ProductDetailPage;

