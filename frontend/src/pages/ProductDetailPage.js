// src/pages/ProductDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

function ProductDetailPage() {
  const { id } = useParams(); // Lấy productId từ URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Khi component mount, gọi API GET /api/product/:id
    const token = localStorage.getItem('token');
    axios
      .get(`http://localhost:3000/api/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success) {
          setProduct(res.data.product);
        } else {
          alert(res.data.message || 'Không tìm thấy sản phẩm');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Lỗi khi tải chi tiết sản phẩm');
      });
  }, [id]);

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div>
      <h2>Product Detail</h2>
      <h3>{product.name} - {product.price} VND</h3>
      <p>Category: {product.category}</p>

      {/* Hiển thị nhiều ảnh */}
      {product.imageURLs && product.imageURLs.length > 0 ? (
        product.imageURLs.map((imgPath, idx) => (
          <img
            key={idx}
            src={`http://localhost:3000/${imgPath}`}
            alt={`img-${idx}`}
            width="150"
            style={{ marginRight: '8px' }}
          />
        ))
      ) : (
        <p>No images available</p>
      )}
    </div>
  );
}

export default ProductDetailPage;
