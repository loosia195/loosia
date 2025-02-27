// ProductDetailPage/index.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // <--- Dùng useParams
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';
import './ProductDetailPage.css';

/**
 * Trang chi tiết sản phẩm (ProductDetailPage):
 * - Lấy id từ useParams() (React Router v6 style)
 * - Gọi GET http://localhost:3000/api/product/:id kèm token (nếu cần)
 * - Hiển thị cột trái (LeftColumn) và cột phải (RightColumn)
 */

function ProductDetailPage() {
  // Lấy id từ useParams
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Nếu id undefined => không gọi API
    if (!id) return;

    // Lấy token từ localStorage
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log("useEffect triggered, id =", id); // debug

    // Gọi API GET /api/product/:id
    axios
      .get(`http://localhost:3000/api/product/${id}`, config)
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
  }, [id]);

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="product-detail-page u-flex">
      {/* Cột trái hiển thị ảnh sản phẩm (nếu code cột trái) */}
      <LeftColumn images={product.imageURLs || []} />

      {/* Cột phải hiển thị thông tin (brand, price, condition, v.v.) */}
      <RightColumn product={product} />
    </div>
  );
}

export default ProductDetailPage;
