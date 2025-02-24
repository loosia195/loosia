// src/pages/UploadMultipleImagesPage.js (ví dụ)
import React, { useState } from 'react';
import axios from 'axios';

function UploadMultipleImagesPage({ productId }) {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files); 
    // e.target.files là FileList, có thể loop
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      // Lặp qua từng file, append vào formData với key "images"
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }

      const res = await axios.post(
        `http://localhost:3000/api/product/${productId}/uploadImages`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(res.data);
      if (res.data.success) {
        alert('Upload multiple images thành công!');
      } else {
        alert('Upload thất bại');
      }
    } catch (error) {
      console.error(error);
      alert('Lỗi upload');
    }
  };

  return (
    <div>
      <h2>Upload Multiple Images</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleFileChange} accept="image/*" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadMultipleImagesPage;