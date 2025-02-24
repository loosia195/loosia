// src/pages/AddProductPage.js
import React, { useState } from 'react';
import { createProduct, uploadMultipleImages } from '../services/productService';

function AddProductPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  // Thay file => files (mảng)
  const [files, setFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const data = { name, price: Number(price), category };

      // 1) Tạo sản phẩm
      const res = await createProduct(token, data);
      if (res.success) {
        // 2) Nếu có files => gọi API uploadMultipleImages
        if (files.length > 0) {
          const productId = res.product._id;
          const uploadRes = await uploadMultipleImages(token, productId, files);
          if (uploadRes.success) {
            alert('Thêm sản phẩm và upload nhiều ảnh thành công!');
          } else {
            alert('Thêm sản phẩm OK, nhưng upload ảnh thất bại: ' + uploadRes.message);
          }
        } else {
          alert('Thêm sản phẩm thành công (không upload ảnh)!');
        }
        // Reset form
        setName('');
        setPrice('');
        setCategory('');
        setFiles([]);
      } else {
        alert(res.message || 'Có lỗi khi thêm sản phẩm');
      }
    } catch (error) {
      console.error(error);
      alert('Error adding product');
    }
  };

  // Xử lý chọn nhiều file
  const handleFileChange = (e) => {
    // e.target.files là FileList => chuyển thành array
    setFiles(Array.from(e.target.files));
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input 
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input 
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label>Images (multiple):</label>
          <input 
            type="file"
            multiple      // Cho phép chọn nhiều file
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddProductPage;
