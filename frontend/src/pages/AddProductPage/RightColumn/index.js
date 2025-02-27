// AddProductPage/RightColumn/index.js

import React from 'react';
import './AddProductDetailInfo.css';

// Import các form con
import AddProductBrands from './01-AddProductBrands';
import AddProductPrices from './02-AddProductPrices';
import AddProductConditions from './04-AddProductConditions';
import AddProductItemDetails from './05-AddProductItemDetails';
import AddProductSizeFit from './06-AddProductSizeFit';
import AddProductShippingReturns from './08-AddProductShippingReturns';
import AddProductEcoImpact from './09-AddProductEcoImpact';

/**
 * Aggregator cột phải (RightColumn) cho AddProductPage
 *
 * Props (VD):
 *  - brand, setBrand
 *  - category, setCategory
 *  - size, setSize
 *  - availability, setAvailability
 *  - originalPrice, setOriginalPrice
 *  - salePrice, setSalePrice
 *  - discountInfo, setDiscountInfo
 *  - estimatedRetailPrice, setEstimatedRetailPrice
 *  - condition, setCondition
 *  - conditionDescription, setConditionDescription
 *  - itemID, setItemID
 *  - material, setMaterial
 *  - style, setStyle
 *  - sizeFit, setSizeFit
 *  - shippingReturns, setShippingReturns
 *  - ecoImpact, setEcoImpact
 *  - onSubmit => callback khi user bấm nút Tạo Sản Phẩm
 */

function RightColumn(props) {
  const {
    // Brand & Category
    brand, setBrand,
    category, setCategory,
    size, setSize,
    availability, setAvailability,

    // Pricing
    originalPrice, setOriginalPrice,
    salePrice, setSalePrice,
    discountInfo, setDiscountInfo,
    estimatedRetailPrice, setEstimatedRetailPrice,

    // Condition
    condition, setCondition,
    conditionDescription, setConditionDescription,

    // Item details
    itemID, setItemID,
    material, setMaterial,
    style, setStyle,

    // Size & Fit
    sizeFit, setSizeFit,

    // Shipping & Returns
    shippingReturns, setShippingReturns,

    // Eco Impact
    ecoImpact, setEcoImpact,

    // Form submit
    onSubmit
  } = props;

  return (
    <div className="right-column" style={{ width: '50%' }}>
      {/* Gom tất cả form vào 1 <form> => bấm submit => onSubmit */}
      <form onSubmit={onSubmit} className="add-product-form">
        {/* 1) Brand, Category */}
        <AddProductBrands
          brand={brand}
          setBrand={setBrand}
          category={category}
          setCategory={setCategory}
          size={size}
          setSize={setSize}
          availability={availability}
          setAvailability={setAvailability}
        />

        {/* 2) Pricing */}
        <AddProductPrices
          originalPrice={originalPrice}
          setOriginalPrice={setOriginalPrice}
          salePrice={salePrice}
          setSalePrice={setSalePrice}
          discountInfo={discountInfo}
          setDiscountInfo={setDiscountInfo}
          estimatedRetailPrice={estimatedRetailPrice}
          setEstimatedRetailPrice={setEstimatedRetailPrice}
        />

        {/* 4) Condition */}
        <AddProductConditions
          condition={condition}
          setCondition={setCondition}
          conditionDescription={conditionDescription}
          setConditionDescription={setConditionDescription}
        />

        {/* 5) Item details */}
        <AddProductItemDetails
          itemID={itemID}
          setItemID={setItemID}
          material={material}
          setMaterial={setMaterial}
          style={style}
          setStyle={setStyle}
        />

        {/* 6) Size & Fit */}
        <AddProductSizeFit
          sizeFit={sizeFit}
          setSizeFit={setSizeFit}
        />

        {/* 7) Shipping & Returns */}
        <AddProductShippingReturns
          shippingReturns={shippingReturns}
          setShippingReturns={setShippingReturns}
        />

        {/* 9) Eco Impact */}
        <AddProductEcoImpact
          ecoImpact={ecoImpact}
          setEcoImpact={setEcoImpact}
        />

        {/* Nút Submit */}
        <div className="form-submit">
          <button type="submit" className="submit-btn">
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default RightColumn;
