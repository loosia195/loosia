// ProductDetailPage/index.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';
import './ProductDetailPage.css';

/**
 * ProductDetailPage (Aggregator):
 * 1) Lấy id sản phẩm từ URL (useParams).
 * 2) Gọi GET /api/product/:id => lấy product (bao gồm imageURLs).
 * 3) Truyền imageURLs xuống LeftColumn => hiển thị cột trái.
 * 4) Truyền product xuống RightColumn => hiển thị cột phải.
 */

function ProductDetailPage() {
  const { id } = useParams();             // Lấy productId từ URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;                      // Nếu chưa có id => không fetch

    const token = localStorage.getItem('token');   // Lấy token nếu route yêu cầu auth
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,  // kèm token (nếu server yêu cầu)
      },
    };

    // Gọi API GET /api/product/:id
    axios
      .get(`http://localhost:3000/api/product/${id}`, config)
      .then((res) => {
        if (res.data.success) {
          setProduct(res.data.product);    // Lưu product vào state
        } else {
          console.error('Không tìm thấy sản phẩm hoặc success=false');
        }
      })
      .catch((err) => {
        console.error('Lỗi khi tải chi tiết sản phẩm:', err);
      });
  }, [id]);

  // Nếu chưa có product => hiển thị loading
  if (!product) {
    return <div>Loading product details...</div>;
  }

  // Trường imageURLs: mảng link ảnh
  const imageURLs = product.imageURLs || [];

  return (
    <div className="product-detail-page u-flex">
      {/* Cột trái => hiển thị ảnh (thumbnails, vantage points) */}
      <LeftColumn images={imageURLs} />

      {/* Cột phải => hiển thị thông tin sản phẩm */}
      <RightColumn product={product} />
    </div>
  );
}

export default ProductDetailPage;
