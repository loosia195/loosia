// src/services/productService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

// 1) Tạo sản phẩm => POST /api/product
export async function createProduct(token, data) {
  const res = await axios.post(`${BASE_URL}/product`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

// 2) Lấy danh sách sản phẩm => GET /api/product
export async function getProducts(token) {
  const res = await axios.get(`${BASE_URL}/product`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

// 3) Upload 1 ảnh (cũ)
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

/*
  4) Hàm mới: Upload nhiều ảnh (uploadMultipleImages)
     - Gửi nhiều file trong 1 request
     - route backend: POST /api/product/:id/uploadImages
     - key: "images" (phải trùng với upload.array('images', <limit>) phía server)
*/
export async function uploadMultipleImages(token, productId, files) {
  const formData = new FormData();
  // Lặp qua mảng files, append vào formData
  for (let i = 0; i < files.length; i++) {
    formData.append('images', files[i]);
  }

  const res = await axios.post(`${BASE_URL}/product/${productId}/uploadImages`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
}

// 5) Lấy 1 sản phẩm => GET /api/product/:id
export async function getProductById(token, productId) {
  const res = await axios.get(`${BASE_URL}/product/${productId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data; // { success: true, product: {...} }
}

// 6) Cập nhật sản phẩm => PUT /api/product/:id
export async function updateProduct(token, productId, data) {
  const res = await axios.put(`${BASE_URL}/product/${productId}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}
