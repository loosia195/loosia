// AddProductPage/LeftColumn/AddImagesForm.js

import React, { useState } from 'react';

// Import vantage points
import AddFrontView from './Views/01-AddFrontView';
import AddBackView from './Views/02-AddBackView';
import AddRightView from './Views/03-AddRightView';
import AddLeftView from './Views/04-AddLeftView';
import AddTopTag from './Views/05-AddTopTag';
import AddBottomTag from './Views/06-AddBottomTag';
import AddThreeDView from './Views/07-AddThreeView';

/**
 * Props:
 *  - images: array of string => "All Images So Far"
 *  - setImages: function => cập nhật images
 */
function AddImagesForm({ images, setImages }) {
  // 7 vantage point states
  const [frontUrl, setFrontUrl] = useState('');
  const [backUrl, setBackUrl] = useState('');
  const [rightUrl, setRightUrl] = useState('');
  const [leftUrl, setLeftUrl] = useState('');
  const [topTagUrl, setTopTagUrl] = useState('');
  const [bottomTagUrl, setBottomTagUrl] = useState('');
  const [threeDUrl, setThreeDUrl] = useState('');

  // Bấm "Add Images" => gộp vantage points => push vào images[]
  const handleAddImages = () => {
    const vantagePoints = [];
    if (frontUrl) vantagePoints.push(frontUrl);
    if (backUrl) vantagePoints.push(backUrl);
    if (rightUrl) vantagePoints.push(rightUrl);
    if (leftUrl) vantagePoints.push(leftUrl);
    if (topTagUrl) vantagePoints.push(topTagUrl);
    if (bottomTagUrl) vantagePoints.push(bottomTagUrl);
    if (threeDUrl) vantagePoints.push(threeDUrl);

    // Gộp vantagePoints vào images cũ
    const newImages = [...images, ...vantagePoints];
    setImages(newImages);

    // Reset vantage point states (tùy anh)
    setFrontUrl('');
    setBackUrl('');
    setRightUrl('');
    setLeftUrl('');
    setTopTagUrl('');
    setBottomTagUrl('');
    setThreeDUrl('');
  };

  return (
    <section className="add-images-form">
      <h2>Upload Images</h2>

      {/* Mỗi vantage point => pass state + setter */}
      <AddFrontView frontUrl={frontUrl} setFrontUrl={setFrontUrl} />
      <AddBackView backUrl={backUrl} setBackUrl={setBackUrl} />
      <AddRightView rightUrl={rightUrl} setRightUrl={setRightUrl} />
      <AddLeftView leftUrl={leftUrl} setLeftUrl={setLeftUrl} />
      <AddTopTag topTagUrl={topTagUrl} setTopTagUrl={setTopTagUrl} />
      <AddBottomTag bottomTagUrl={bottomTagUrl} setBottomTagUrl={setBottomTagUrl} />
      <AddThreeDView threeDUrl={threeDUrl} setThreeDUrl={setThreeDUrl} />

      <button type="button" onClick={handleAddImages}>
        Add Images
      </button>

      {/* Preview all images so far */}
      <div className="image-preview">
        <h4>All Images So Far:</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {images.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`img-${idx}`}
              width="60"
              height="80"
              style={{ border: '1px solid #ccc', borderRadius: '4px' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AddImagesForm;

