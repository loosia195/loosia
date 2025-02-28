// ProductDetailPage/LeftColumn/ImageThumbnails.js

import React from 'react';
import FrontView from './Views/01-FrontView';
import BackView from './Views/02-BackView';
import RightView from './Views/03-RightView';
import LeftView from './Views/04-LeftView';
import TopTagView from './Views/05-TopTagView';
import BottomTagView from './Views/06-BottomTagView';
import ThreeDView from './Views/07-ThreeView';
import './ImageThumbnails.css';

/**
 * Mô hình aggregator:
 *  - `images` = array of objects: { type, thumbUrl, altText, overlayIcon, ... }
 *  - Mỗi object mô tả 1 vantage point (front, back, etc.)
 *  - Ta render vantage point component tuỳ theo `type`
 *
 * Props:
 *  - images: array of { type, thumbUrl, altText, overlayIcon, ... }
 *  - selectedIndex: number (thumbnail đang chọn)
 *  - onSelect: function(idx) => click thumbnail => đổi ảnh chính
 */

function ImageThumbnails({ images, selectedIndex, onSelect }) {
  if (!images || images.length === 0) {
    return <div>No thumbnails</div>;
  }

  return (
    <div className="thumb-list">
      {images.map((img, idx) => {
        // fallback altText, overlayIcon
        const altText = img.altText || `Thumbnail ${idx + 1}`;
        const overlayIcon = img.overlayIcon || null;

        // vantage point -> component
        switch (img.type) {
          case 'front':
            return (
              <FrontView
                key={idx}
                onClick={() => onSelect(idx)}
                isActive={idx === selectedIndex}
                thumbUrl={img.thumbUrl}
                altText={altText}
                overlayIcon={overlayIcon}
              />
            );
          case 'back':
            return (
              <BackView
                key={idx}
                onClick={() => onSelect(idx)}
                isActive={idx === selectedIndex}
                thumbUrl={img.thumbUrl}
                altText={altText}
                overlayIcon={overlayIcon}
              />
            );
          case 'right':
            return (
              <RightView
                key={idx}
                onClick={() => onSelect(idx)}
                isActive={idx === selectedIndex}
                thumbUrl={img.thumbUrl}
                altText={altText}
                overlayIcon={overlayIcon}
              />
            );
          case 'left':
            return (
              <LeftView
                key={idx}
                onClick={() => onSelect(idx)}
                isActive={idx === selectedIndex}
                thumbUrl={img.thumbUrl}
                altText={altText}
                overlayIcon={overlayIcon}
              />
            );
          case 'topTag':
            return (
              <TopTagView
                key={idx}
                onClick={() => onSelect(idx)}
                isActive={idx === selectedIndex}
                thumbUrl={img.thumbUrl}
                altText={altText}
                overlayIcon={overlayIcon}
              />
            );
          case 'bottomTag':
            return (
              <BottomTagView
                key={idx}
                onClick={() => onSelect(idx)}
                isActive={idx === selectedIndex}
                thumbUrl={img.thumbUrl}
                altText={altText}
                overlayIcon={overlayIcon}
              />
            );
          case '3d':
            return (
              <ThreeDView
                key={idx}
                onClick={() => onSelect(idx)}
                isActive={idx === selectedIndex}
                thumbUrl={img.thumbUrl}
                altText={altText}
                overlayIcon={overlayIcon}
              />
            );
          default:
            // fallback: nếu type không khớp => không render
            return null;
        }
      })}
    </div>
  );
}

export default ImageThumbnails;
