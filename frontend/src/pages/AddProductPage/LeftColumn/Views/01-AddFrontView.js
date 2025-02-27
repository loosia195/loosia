// AddProductPage/LeftColumn/Views/01-AddFrontView.js
import React, { useState } from 'react';
import axios from 'axios';

/**
 * Props:
 *  - frontUrl (string)
 *  - setFrontUrl (function)
 */
function AddFrontView({ frontUrl, setFrontUrl }) {
  const [previewUrl, setPreviewUrl] = useState(frontUrl || '');

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
        // serverUrl = "/uploads/filename"
        const absoluteUrl = "http://localhost:3000" + res.data.url;
        setFrontUrl(absoluteUrl);
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
    <div className="add-front-view vantage-upload">
      <h4>Front View</h4>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Front preview"
          width="60"
          height="80"
          style={{ border: '1px solid #ccc', borderRadius: '4px', marginLeft: '8px' }}
        />
      )}
    </div>
  );
}

export default AddFrontView;


