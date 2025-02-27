// AddProductPage/LeftColumn/Views/02-AddBackView.js
import React, { useState } from 'react';
import axios from 'axios';

/**
 * Props:
 *  - backUrl (string)
 *  - setBackUrl (function)
 */
function AddBackView({ backUrl, setBackUrl }) {
  const [previewUrl, setPreviewUrl] = useState(backUrl || '');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        const absoluteUrl = "http://localhost:3000" + res.data.url;
        setBackUrl(absoluteUrl);
        setPreviewUrl(absoluteUrl);
      } else {
        alert('Upload failed: ' + (res.data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error(error);
      alert('Server error: ' + error.message);
    }
  };

  return (
    <div className="add-back-view vantage-upload">
      <h4>Back View</h4>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Back preview"
          width="60"
          height="80"
          style={{ border: '1px solid #ccc', borderRadius: '4px', marginLeft: '8px' }}
        />
      )}
    </div>
  );
}

export default AddBackView;
