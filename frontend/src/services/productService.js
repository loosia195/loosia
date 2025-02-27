// src/services/productService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

// 1) Tạo sản phẩm => POST /api/product
export async function createProduct(token, data) {
  const res = await axios.post(`${BASE_URL}/product`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data; // { success, product, message }
}

// 2) Lấy danh sách sản phẩm => GET /api/product
export async function getProducts(token) {
  const res = await axios.get(`${BASE_URL}/product`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data; // { success, products }
}

// 3) Upload 1 ảnh (single)
export async function uploadImage(token, productId, file) {
  const formData = new FormData();
  formData.append('image', file);

  const res = await axios.post(`${BASE_URL}/product/${productId}/uploadImage`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data; // { success, product, ... }
}

/*
  4) Hàm mới: Upload nhiều ảnh (uploadMultipleImages)
     - Thay đổi để nhận formData trực tiếp, 
       vì trong AddProductPage.js anh đã tạo formData sẵn.
     - route backend: POST /api/product/:id/uploadImages
*/
export async function uploadMultipleImages(token, productId, formData) {
  const res = await axios.post(
    `${BASE_URL}/product/${productId}/uploadImages`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  return res.data; // { success, product, message }
}

// 5) Lấy 1 sản phẩm => GET /api/product/:id
export async function getProductById(token, productId) {
  const res = await axios.get(`${BASE_URL}/product/${productId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data; // { success, product }
}

// 6) Cập nhật sản phẩm => PUT /api/product/:id
export async function updateProduct(token, productId, data) {
  const res = await axios.put(`${BASE_URL}/product/${productId}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data; // { success, product }
}
