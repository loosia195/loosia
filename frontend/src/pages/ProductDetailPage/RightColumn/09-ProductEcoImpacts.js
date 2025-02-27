// src/pages/ProductDetailPage/ProductEcoImpacts.js
import React from 'react';

/**
 * Props (gợi ý):
 *  - description (string): mô tả "Buying a dress secondhand..."
 *  - onSourceClick (function): callback khi bấm "Source" (nếu cần)
 * 
 *  - waterIcon (string), waterValue (string), waterLabel (string)
 *  - lightIcon (string), lightValue (string), lightLabel (string)
 *  - milesIcon (string), milesValue (string), milesLabel (string)
 */
function ProductEcoImpacts({
  description,
  onSourceClick,
  waterIcon,
  waterValue,
  waterLabel,
  lightIcon,
  lightValue,
  lightLabel,
  milesIcon,
  milesValue,
  milesLabel
}) {
  return (
    <div>
      <div className="u-flex u-justify-between u-items-center u-mb-2xs eco-impact-header">
        <h2 className="heading-sm-bold">Eco impact</h2>
        <button
          className="u-mt-1xs ui-link"
          type="button"
          onClick={() => {
            if (onSourceClick) {
              onSourceClick();
            } else {
              alert('Show Source info...');
            }
          }}
        >
          Source
        </button>
      </div>

      <p className="u-mb-2xs md:u-mb-2x body-copy">
        {description || 'Buying a dress secondhand instead of new...'}
      </p>

      <div className="u-flex u-justify-between u-gap-1x eco-impact-stats">
        {/* 1) Water */}
        <div className="u-flex u-flex-col u-text-center u-w-full">
          <div className="u-flex u-mx-auto md:u-mb-1x">
            <img
              alt="water-icon"
              src={waterIcon || '/tup-assets/pwa/production/assets/droplet-abc9bc2c5f35fd8a5672.svg'}
              style={{ width: '20px', height: '20px', marginRight: '8px' }}
            />
            <div className="u-my-auto u-font-grotesk u-font-medium u-text-20">
              {waterValue || '1264.88'}
            </div>
          </div>
          <div className="body-copy-sm">
            {waterLabel || 'glasses of drinking water'}
          </div>
        </div>

        {/* 2) Light */}
        <div className="u-flex u-flex-col u-text-center u-w-full">
          <div className="u-flex u-mx-auto md:u-mb-1x">
            <img
              alt="light-icon"
              src={lightIcon || '/tup-assets/pwa/production/assets/lightbulb-...svg'}
              style={{ width: '20px', height: '20px', marginRight: '8px' }}
            />
            <div className="u-my-auto u-font-grotesk u-font-medium u-text-20">
              {lightValue || '537.42'}
            </div>
          </div>
          <div className="body-copy-sm">
            {lightLabel || 'hours of an LED lightbulb'}
          </div>
        </div>

        {/* 3) Miles */}
        <div className="u-flex u-flex-col u-text-center u-w-full">
          <div className="u-flex u-mx-auto md:u-mb-1x">
            <img
              alt="miles-icon"
              src={milesIcon || '/tup-assets/pwa/production/assets/cloud-...svg'}
              style={{ width: '20px', height: '20px', marginRight: '8px' }}
            />
            <div className="u-my-auto u-font-grotesk u-font-medium u-text-20">
              {milesValue || '2.61'}
            </div>
          </div>
          <div className="body-copy-sm">
            {milesLabel || 'miles of driving emissions'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductEcoImpacts;
