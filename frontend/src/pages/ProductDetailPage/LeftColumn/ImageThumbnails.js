// ProductDetailPage/LeftColumn/ImageThumbnails.js

import FrontView from './Views/01-FrontView';
import BackView from './Views/02-BackView';
import RightView from './Views/03-RightView';
import LeftView from './Views/04-LeftView';
import TopTagView from './Views/05-TopTagView';
import BottomTagView from './Views/06-BottomTagView';
import ThreeDView from './Views/07-ThreeView';

/**
 * Props:
 *  - images: array of { type, thumbUrl, altText, overlayIcon, ... }
 *  - selectedIndex: number (thumbnail đang chọn)
 *  - onSelect: function(idx) => click thumbnail => đổi ảnh
 */

function ImageThumbnails({ images, selectedIndex, onSelect }) {
  return (
    <div className="u-flex u-flex-col u-gap-1x u-overflow-y-auto thumb-list">
      {images.map((img, idx) => {
        switch (img.type) {
          case 'front':
            return (
              <FrontView
                key={idx}
                onClick={() => onSelect(idx)}
                isActive={idx === selectedIndex}
                thumbUrl={img.thumbUrl}
                altText={img.altText}
                overlayIcon={img.overlayIcon}
              />
            );
          case 'back':
            return (
              <BackView
                key={idx}
                onClick={() => onSelect(idx)}
                isActive={idx === selectedIndex}
                thumbUrl={img.thumbUrl}
                altText={img.altText}
                overlayIcon={img.overlayIcon}
              />
            );
          case 'right':
            return (
              <RightView
                key={idx}
                onClick={() => onSelect(idx)}
                isActive={idx === selectedIndex}
                thumbUrl={img.thumbUrl}
                altText={img.altText}
                overlayIcon={img.overlayIcon}
              />
            );
          case 'left':
            return (
              <LeftView
                key={idx}
                onClick={() => onSelect(idx)}
                isActive={idx === selectedIndex}
                thumbUrl={img.thumbUrl}
                altText={img.altText}
                overlayIcon={img.overlayIcon}
              />
            );
          case 'topTag':
            return (
              <TopTagView
                key={idx}
                onClick={() => onSelect(idx)}
                isActive={idx === selectedIndex}
                thumbUrl={img.thumbUrl}
                altText={img.altText}
                overlayIcon={img.overlayIcon}
              />
            );
          case 'bottomTag':
            return (
              <BottomTagView
                key={idx}
                onClick={() => onSelect(idx)}
                isActive={idx === selectedIndex}
                thumbUrl={img.thumbUrl}
                altText={img.altText}
                overlayIcon={img.overlayIcon}
              />
            );
          case '3d':
            return (
              <ThreeDView
                key={idx}
                onClick={() => onSelect(idx)}
                isActive={idx === selectedIndex}
                thumbUrl={img.thumbUrl}
                altText={img.altText}
                overlayIcon={img.overlayIcon}
              />
            );
          default:
            // fallback: if type not matched, or no vantage type
            return null;
        }
      })}
    </div>
  );
}

export default ImageThumbnails;
