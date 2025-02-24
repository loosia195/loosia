// src/pages/ProductListPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductListPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:3000/api/product', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Backend trả về { success: true, products: [...] }
        // => Chỉ gán res.data.products vào state
        if (res.data.success) {
          setProducts(res.data.products);
        } else {
          alert(res.data.message || 'Error loading products');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Error loading products');
      });
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      {products.map((p) => (
        <div key={p._id}>
          <h3>
            {p.name} - {p.price} VND
          </h3>
          {/* Hiển thị nhiều ảnh */}
          {p.imageURLs && p.imageURLs.length > 0 ? (
            p.imageURLs.map((imgPath, idx) => (
              <img
                key={idx}
                src={`http://localhost:3000/${imgPath}`}
                alt={`img-${idx}`}
                width="100"
                style={{ marginRight: '8px' }}
              />
            ))
          ) : (
            <p>No images</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProductListPage;
