// ProductDetailPage/RightColumn/index.js

import React from 'react';
import './ProductDetailInfo.css';

// Import các component cột phải
import ProductBrands from './01-ProductBrands';
import ProductPrices from './02-ProductPrices';
import ProductCarts from './03-ProductCarts';
import ProductConditions from './04-ProductConditions';
import ProductItemDetails from './05-ProductItemDetails';
import ProductSizeFit from './06-ProductSizeFit';
import ProductSellWithUs from './07-ProductSellWithUs';
import ProductShippingReturns from './08-ProductShippingReturns';
import ProductEcoImpacts from './09-ProductEcoImpacts';

/**
 * Aggregator cột phải (RightColumn):
 * - Nhận prop `product` => { brand, size, category, availability, ... }
 * - Nhận prop `onAddToCart` => hàm callback cho nút Add to cart
 * - Hiển thị brand, prices, condition, v.v.
 */
function RightColumn({ product, onAddToCart }) {
  if (!product) return null;

  // Tính % off estimated retail (nếu cần)
  let estimatedRetailPercent = 0;
  if (product.estimatedRetailPrice && product.salePrice) {
    estimatedRetailPercent = Math.round(
      100 - (product.salePrice / product.estimatedRetailPrice) * 100
    );
  }

  return (
    <div className="right-column">
      {/* Thông tin thương hiệu, size, category, availability */}
      <ProductBrands
        brand={product.brand}
        brandLink={`/brand/${product.brand}`} 
        size={product.size}
        category={product.category}
        availability={product.availability}
      />

      {/* Giá gốc, sale, discount, estimated retail */}
      <ProductPrices
        originalPrice={product.originalPrice}
        salePrice={product.salePrice}
        discountInfo={product.discountInfo}
        discountCode="FIRST50"
        estimatedRetail={product.estimatedRetailPrice}
        estimatedRetailPercent={estimatedRetailPercent}
      />

      {/* Nút Add to cart */}
      <ProductCarts onAddToCart={onAddToCart} />

      {/* Tình trạng sản phẩm */}
      <ProductConditions
        condition={product.condition}
        conditionDescription={product.conditionDescription}
      />

      {/* Thông tin item details */}
      <ProductItemDetails
        itemId={product.itemID}
        material={product.material}
        style={product.style}
      />

      {/* Size & Fit */}
      <ProductSizeFit
        size={product.size}
        measure={product.sizeFit}
      />

      {/* Sell with us */}
      <ProductSellWithUs
        brand={product.brand}
        sellLink="/cleanout"
        iconSrc="/tup-assets/pwa/production/assets/hanger-black-...svg"
      />

      {/* Shipping & Returns */}
      <ProductShippingReturns
        shippingReturns={product.shippingReturns}
      />

      {/* Eco Impact */}
      <ProductEcoImpacts
        description="Buying a dress secondhand instead of new and wearing it 10 times saves the equivalent of:"
        onSourceClick={() => alert('Eco impact source...')}
        waterIcon="/tup-assets/pwa/production/assets/droplet-..."
        waterValue="1264.88"
        waterLabel="glasses of drinking water"
        lightIcon="/tup-assets/pwa/production/assets/lightbulb-..."
        lightValue="537.42"
        lightLabel="hours of an LED lightbulb"
        milesIcon="/tup-assets/pwa/production/assets/cloud-..."
        milesValue="2.61"
        milesLabel="miles of driving emissions"
      />
    </div>
  );
}

export default RightColumn;
