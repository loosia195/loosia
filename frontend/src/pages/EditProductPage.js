// src/pages/EditProductPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct, uploadImage } from '../services/productService';

function EditProductPage() {
  const { id } = useParams();        // productId
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Gọi API lấy thông tin sản phẩm cũ
    const token = localStorage.getItem('token');
    getProductById(token, id).then((product) => {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category || '');
    }).catch(err => {
      console.error(err);
      alert('Không tìm thấy sản phẩm');
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      // 1) Cập nhật thông tin (name, price, category)
      const resUpdate = await updateProduct(token, id, { name, price, category });
      if (!resUpdate.success) {
        return alert(resUpdate.message || 'Cập nhật thất bại');
      }
      // 2) Nếu có file => upload ảnh mới
      if (file) {
        const resUpload = await uploadImage(token, id, file);
        if (!resUpload.success) {
          return alert('Cập nhật thông tin OK, nhưng upload ảnh thất bại: ' + resUpload.message);
        }
      }
      alert('Cập nhật sản phẩm thành công!');
      navigate('/products');
    } catch (error) {
      console.error(error);
      alert('Lỗi khi cập nhật sản phẩm');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <h2>Edit Product</h2>
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
          <label>New Image (optional):</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditProductPage;
