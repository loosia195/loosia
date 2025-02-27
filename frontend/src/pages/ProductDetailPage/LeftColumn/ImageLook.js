// ProductDetailPage/LeftColumn/ImageLook.js

import React from 'react';

/**
 * Props:
 *  - href (string): link sang trang "Shop look" (thay cho "Shop similar")
 *  - label (string): text hiển thị (mặc định "Shop look")
 */
function ImageLook({
  href = '/look',
  label = 'Shop look'
}) {
  return (
    <a
      className="u-flex u-overflow-hidden ui-button-floating inverted u-space-x-1x"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        alt=""
        src="/tup-assets/pwa/production/assets/shop-similar.svg"
        width="24"
        height="24"
      />
      <span className="body-copy-sm u-font-medium">{label}</span>
    </a>
  );
}

export default ImageLook;

