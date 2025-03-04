// File: src/pages/ProductDetailPage/LeftColumn/ImageThumbnails.js

import React from 'react';
import styles from './ImageThumbnails.module.scss';

import FrontView from './Views/01-FrontView';
import BackView from './Views/02-BackView';
import RightView from './Views/03-RightView';
import LeftView from './Views/04-LeftView';
import TopTagView from './Views/05-TopTagView';
import BottomTagView from './Views/06-BottomTagView';
import ThreeDView from './Views/07-ThreeView';

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
    <div className={styles.thumbList}>
      {images.map((img, idx) => {
        const altText = img.altText || `Thumbnail ${idx + 1}`;
        const overlayIcon = img.overlayIcon || null;

        // Props dùng chung cho vantage point (trừ '3d')
        const vantageProps = {
          key: idx,
          onClick: () => onSelect(idx),
          onMouseEnter: () => onSelect(idx),
          isActive: idx === selectedIndex,
          thumbUrl: img.thumbUrl,
          altText,
          overlayIcon,
        };

        switch (img.type) {
          case 'front':
            return <FrontView {...vantageProps} />;
          case 'back':
            return <BackView {...vantageProps} />;
          case 'right':
            return <RightView {...vantageProps} />;
          case 'left':
            return <LeftView {...vantageProps} />;
          case 'topTag':
            return <TopTagView {...vantageProps} />;
          case 'bottomTag':
            return <BottomTagView {...vantageProps} />;
          case '3d':
            // vantage 3D => hiển thị thumbnail = frontview + icon 360
            return (
              <ThreeDView
                key={idx}
                onClick={() => onSelect(idx)}
                onMouseEnter={() => onSelect(idx)}
                isActive={idx === selectedIndex}
                // Dùng ảnh frontview => images[0].thumbUrl, nếu mảng có ít nhất 1 item
                frontUrl={images[0]?.thumbUrl || ''}
                altText="3D / 360 view image"
                // Icon 360° => "/images/360-icon.svg" (hoặc path tuỳ anh)
                overlayIcon="/icons/arrow-360.svg"
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default ImageThumbnails;
