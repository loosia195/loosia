// src/pages/AddProductPage.js
import React, { useState } from 'react';
import { createProduct, uploadImage } from '../services/productService';

function AddProductPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null); // State lưu file ảnh

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const data = { name, price: Number(price), category };
      const res = await createProduct(token, data);
      if (res.success) {
        // Nếu có file ảnh được chọn, gọi API upload ảnh
        if (file) {
          const uploadRes = await uploadImage(token, res.product._id, file);
          if (uploadRes.success) {
            alert('Thêm sản phẩm và upload ảnh thành công!');
          } else {
            alert('Thêm sản phẩm thành công nhưng upload ảnh thất bại: ' + uploadRes.message);
          }
        } else {
          alert('Thêm sản phẩm thành công!');
        }
        // Reset form
        setName('');
        setPrice('');
        setCategory('');
        setFile(null);
      } else {
        alert(res.message || 'Có lỗi khi thêm sản phẩm');
      }
    } catch (error) {
      console.error(error);
      alert('Error adding product');
    }
  };

  // Xử lý chọn file
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
          <label>Image:</label>
          <input 
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddProductPage;
