// src/services/productService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

// Hàm tạo sản phẩm
export async function createProduct(token, data) {
  const res = await axios.post(`${BASE_URL}/product`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

// Hàm lấy danh sách sản phẩm
export async function getProducts(token) {
  const res = await axios.get(`${BASE_URL}/product`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

// Hàm upload ảnh cho sản phẩm
export async function uploadImage(token, productId, file) {
  const formData = new FormData();
  formData.append('image', file);

  const res = await axios.post(`${BASE_URL}/product/${productId}/uploadImage`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
}

// Lấy 1 sản phẩm theo id => GET /api/product/:id
export async function getProductById(token, productId) {
  const res = await axios.get(`http://localhost:3000/api/product/${productId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data; // { success: true, product: { ... } } hoặc product object
}

// Cập nhật sản phẩm => PUT /api/product/:id
export async function updateProduct(token, productId, data) {
  const res = await axios.put(`http://localhost:3000/api/product/${productId}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}
// Các hàm khác (updateProduct, deleteProduct, ...) có thể được thêm tương tự.
