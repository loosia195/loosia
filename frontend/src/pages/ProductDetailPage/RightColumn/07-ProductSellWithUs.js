// src/pages/ProductDetailPage/ProductSellWithUs.js
import React from 'react';

/**
 * Props:
 *  - brand (string) => ví dụ: "Mac Duggal"
 *  - sellLink (string) => ví dụ: "/cleanout"
 *  - iconSrc (string) => đường dẫn icon móc treo (nếu cần)
 */
function ProductSellWithUs({
  brand,
  sellLink = '/cleanout',
  iconSrc = '/tup-assets/pwa/production/assets/hanger-black-...svg'
}) {
  return (
    <section className="u-flex u-items-center u-p-3xs u-bg-gray-0 u-rounded-4 u-gap-2x u-mt-3x sell-with-us">
      <img
        alt="hanger-icon"
        src={iconSrc}
        className="hanger-icon"
        style={{ width: '58px', height: '49px' }}
      />
      <div className="u-flex u-flex-col u-gap-1xs u-my-auto">
        <h3 className="body-copy-bold">
          Have any {brand} items to sell?
        </h3>
        <p className="body-copy-sm">
          Every item on ThredUp is from a closet just like yours. 
          {' '}
          <a className="ui-link" href={sellLink}>Sell with us</a>
        </p>
      </div>
    </section>
  );
}

export default ProductSellWithUs;
