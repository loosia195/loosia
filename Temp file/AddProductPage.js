// src/pages/AddProductPage.js
import React, { useState } from 'react';
// Material-UI
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material';

// (Nếu anh có sẵn createProduct, uploadMultipleImages in productService)
import { createProduct, uploadMultipleImages } from '../services/productService';

function AddProductPage() {
  // 1) Basic Info
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [availability, setAvailability] = useState('');

  // 2) Pricing & Discounts
  const [originalPrice, setOriginalPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [discountInfo, setDiscountInfo] = useState('');
  const [estimatedRetailPrice, setEstimatedRetailPrice] = useState('');

  // 3) Condition & Description
  const [condition, setCondition] = useState('excellent'); 
  const [conditionDescription, setConditionDescription] = useState('');
  const [itemID, setItemID] = useState('');
  const [material, setMaterial] = useState('');
  const [style, setStyle] = useState('');
  const [sizeFit, setSizeFit] = useState('');

  // 4) Policy & Additional Info
  const [shippingReturns, setShippingReturns] = useState('');
  const [ecoImpact, setEcoImpact] = useState('');

  // Upload multiple images
  const [files, setFiles] = useState([]);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      // Tạo object data cho product
      const productData = {
        brand,
        category,
        size,
        availability,
        originalPrice: Number(originalPrice),
        salePrice: salePrice ? Number(salePrice) : 0,
        discountInfo,
        estimatedRetailPrice: estimatedRetailPrice ? Number(estimatedRetailPrice) : 0,
        condition,
        conditionDescription,
        itemID,
        material,
        style,
        sizeFit,
        shippingReturns,
        ecoImpact,
      };

      // 1) Gửi productData => /api/product
      const resCreate = await createProduct(token, productData);
      if (!resCreate.success) {
        return alert(resCreate.message || 'Có lỗi khi thêm sản phẩm');
      }

      // 2) Upload nhiều ảnh (nếu có)
      if (files.length > 0) {
        const productId = resCreate.product._id;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append('images', files[i]);
        }
        const resUpload = await uploadMultipleImages(token, productId, formData);
        if (!resUpload.success) {
          alert('Thêm sản phẩm OK, nhưng upload ảnh thất bại: ' + resUpload.message);
        } else {
          alert('Thêm sản phẩm + upload ảnh thành công!');
        }
      } else {
        alert('Thêm sản phẩm thành công (không upload ảnh)!');
      }

      // Reset form
      setBrand('');
      setCategory('');
      setSize('');
      setAvailability('');
      setOriginalPrice('');
      setSalePrice('');
      setDiscountInfo('');
      setEstimatedRetailPrice('');
      setCondition('excellent');
      setConditionDescription('');
      setItemID('');
      setMaterial('');
      setStyle('');
      setSizeFit('');
      setShippingReturns('');
      setEcoImpact('');
      setFiles([]);
    } catch (error) {
      console.error(error);
      alert('Error adding product');
    }
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Thêm Sản Phẩm
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          {/* 1) Basic Info */}
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            1. Thông tin cơ bản
          </Typography>
          <TextField
            label="Brand (Thương hiệu)"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <TextField
            label="Category (Loại sản phẩm)"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <TextField
            label="Size"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <TextField
            label="Availability (Tình trạng kho)"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />

          {/* 2) Pricing & Discounts */}
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            2. Giá và khuyến mãi
          </Typography>
          <TextField
            label="Original Price (Giá gốc)"
            type="number"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
          <TextField
            label="Sale Price (Giá sau giảm)"
            type="number"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
          />
          <TextField
            label="Discount Info (Thông tin giảm giá)"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={discountInfo}
            onChange={(e) => setDiscountInfo(e.target.value)}
          />
          <TextField
            label="Estimated Retail Price (Giá bán lẻ ước tính)"
            type="number"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={estimatedRetailPrice}
            onChange={(e) => setEstimatedRetailPrice(e.target.value)}
          />

          {/* 3) Condition & Description */}
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            3. Tình trạng và mô tả
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="condition-label">Condition</InputLabel>
            <Select
              labelId="condition-label"
              label="Condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <MenuItem value="excellent">excellent</MenuItem>
              <MenuItem value="like new">like new</MenuItem>
              <MenuItem value="good">good</MenuItem>
              <MenuItem value="fair">fair</MenuItem>
              <MenuItem value="flawed gem">flawed gem</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Condition Description"
            multiline
            rows={2}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={conditionDescription}
            onChange={(e) => setConditionDescription(e.target.value)}
          />
          <TextField
            label="Item ID (SKU)"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={itemID}
            onChange={(e) => setItemID(e.target.value)}
          />
          <TextField
            label="Material"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          />
          <TextField
            label="Style (short sleeve, color, length...)"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          />
          <TextField
            label="Size & Fit"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={sizeFit}
            onChange={(e) => setSizeFit(e.target.value)}
          />

          {/* 4) Policy & Additional Info */}
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            4. Chính sách và thông tin bổ sung
          </Typography>
          <TextField
            label="Shipping & Returns"
            multiline
            rows={2}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={shippingReturns}
            onChange={(e) => setShippingReturns(e.target.value)}
          />
          <TextField
            label="Eco Impact"
            multiline
            rows={2}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={ecoImpact}
            onChange={(e) => setEcoImpact(e.target.value)}
          />

          {/* Upload nhiều ảnh */}
          <Box sx={{ mb: 2 }}>
            <Typography>Images (multiple):</Typography>
            <Button variant="contained" component="label" sx={{ mt: 1 }}>
              Chọn ảnh
              <input
                type="file"
                multiple
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            {files.length > 0 && (
              <Typography sx={{ mt: 1 }}>
                Đã chọn {files.length} ảnh
              </Typography>
            )}
          </Box>

          {/* Submit */}
          <Button type="submit" variant="contained" color="primary">
            Thêm sản phẩm
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default AddProductPage;
