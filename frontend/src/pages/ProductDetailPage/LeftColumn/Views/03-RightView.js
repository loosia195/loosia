// ProductDetailPage/LeftColumn/Thumbnails/03-RightView.js
import React from 'react';

/**
 * Props:
 *  - onClick: function => gọi khi user click thumbnail
 *  - isActive: boolean => thumbnail đang được chọn
 *  - thumbUrl: string => link ảnh
 *  - altText: string => alt cho <img>, default "Right view image"
 *  - overlayIcon: string => link icon overlay (nếu cần)
 */

function RightView({
  onClick,
  isActive = false,
  thumbUrl = '',
  altText = 'Right view image',
  overlayIcon,
}) {
  const imgClass = isActive
    ? 'u-block u-border u-border-solid u-rounded-4 u-overflow-hidden u-border-black u-opacity-100'
    : 'u-block u-border u-border-solid u-rounded-4 u-overflow-hidden u-border-transparent u-opacity-60';

  if (!thumbUrl) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label={altText}
      className={`thumbnail-btn ${isActive ? 'active' : ''} u-cursor-default`}
      onClick={onClick}
    >
      <img
        alt={altText}
        className={imgClass}
        src={thumbUrl}
        width="60"
        height="80"
      />
      {overlayIcon && (
        <div
          className="u-absolute u-left-1/2 u-top-1/2 u-rounded-full u-object-contain"
          style={{ backgroundColor: '#FFFFFF80', padding: '6px', transform: 'translate(-50%, -50%)' }}
        >
          <img alt="overlay icon" className="u-block" src={overlayIcon} width="24" height="24" />
        </div>
      )}
    </button>
  );
}

export default RightView;


