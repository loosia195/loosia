// src/pages/ProductDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

// Material-UI
import {
  Container,
  Typography,
  Button,
  Paper,
  TextField,
  Box
} from '@mui/material';

function ProductDetailPage() {
  const { id } = useParams(); // Lấy productId từ URL
  const [product, setProduct] = useState(null);

  // State cho review
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]); // Danh sách review

  useEffect(() => {
    const token = localStorage.getItem('token');

    // 1) Lấy chi tiết sản phẩm
    axios
      .get(`http://localhost:3000/api/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success) {
          setProduct(res.data.product);
        } else {
          alert(res.data.message || 'Không tìm thấy sản phẩm');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Lỗi khi tải chi tiết sản phẩm');
      });

    // 2) Lấy danh sách review cho sản phẩm
    axios
      .get(`http://localhost:3000/api/product/${id}/review`)
      .then((res) => {
        if (res.data.success) {
          setReviews(res.data.reviews);
        } else {
          console.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  // Xử lý submit review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:3000/api/product/${id}/review`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        alert('Đánh giá thành công!');
        // Thêm review mới vào đầu mảng
        setReviews([res.data.review, ...reviews]);
        // Reset form
        setRating(5);
        setComment('');
      } else {
        alert(res.data.message || 'Lỗi khi đánh giá');
      }
    } catch (error) {
      console.error(error);
      alert('Error submitting review');
    }
  };

  // Hàm xóa ảnh cụ thể
  const handleDeleteImage = async (imgPath) => {
    try {
      const token = localStorage.getItem('token');
      // Gửi DELETE /api/product/:id/image với body { imageURL: imgPath }
      const res = await axios.delete(
        `http://localhost:3000/api/product/${product._id}/image`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { imageURL: imgPath }, // Body JSON
        }
      );
      if (res.data.success) {
        alert('Xoá ảnh thành công');
        // Cập nhật state product => lấy product mới từ backend
        setProduct(res.data.product);
      } else {
        alert(res.data.message || 'Xoá ảnh thất bại');
      }
    } catch (error) {
      console.error(error);
      alert('Lỗi khi xóa ảnh');
    }
  };

  // Hàm thêm sản phẩm vào giỏ (quantity mặc định = 1)
  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:3000/api/cart',
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        alert('Đã thêm sản phẩm vào giỏ');
      } else {
        alert('Lỗi khi thêm vào giỏ');
      }
    } catch (error) {
      console.error(error);
      alert('Server error');
    }
  };

  if (!product) {
    return (
      <Typography variant="h6" sx={{ mt: 2 }}>
        Loading product details...
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Product Detail
      </Typography>

      {/* Thông tin chính */}
      <Typography variant="h6" gutterBottom>
        {product.brand} - {product.category} 
      </Typography>
      {product.size && product.availability && (
        <Typography variant="body2" gutterBottom>
          Size: {product.size} - {product.availability}
        </Typography>
      )}

      {/* Original / Sale price */}
      {product.originalPrice && (
        <Typography variant="body2">
          Original Price: {product.originalPrice} VND
        </Typography>
      )}
      {product.salePrice && product.salePrice > 0 && (
        <Typography variant="body2" color="error">
          Sale Price: {product.salePrice} VND
        </Typography>
      )}
      {product.discountInfo && (
        <Typography variant="body2">
          Discount Info: {product.discountInfo}
        </Typography>
      )}
      {product.estimatedRetailPrice && product.estimatedRetailPrice > 0 && (
        <Typography variant="body2">
          Estimated Retail: {product.estimatedRetailPrice} 
        </Typography>
      )}

      {/* Condition */}
      {product.condition && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Condition: {product.condition}
        </Typography>
      )}
      {product.conditionDescription && (
        <Typography variant="body2">
          {product.conditionDescription}
        </Typography>
      )}

      {/* Item details */}
      {product.itemID && (
        <Typography variant="body2">
          Item ID: {product.itemID}
        </Typography>
      )}
      {product.material && (
        <Typography variant="body2">
          Material: {product.material}
        </Typography>
      )}
      {product.style && (
        <Typography variant="body2">
          Style: {product.style}
        </Typography>
      )}
      {product.sizeFit && (
        <Typography variant="body2">
          Size & Fit: {product.sizeFit}
        </Typography>
      )}

      {/* Shipping & Returns */}
      {product.shippingReturns && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          <strong>Shipping & Returns:</strong> {product.shippingReturns}
        </Typography>
      )}

      {/* Eco Impact */}
      {product.ecoImpact && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>Eco Impact:</strong> {product.ecoImpact}
        </Typography>
      )}

      {/* Nút Thêm vào giỏ */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleAddToCart}
      >
        Thêm vào giỏ
      </Button>

      {/* Hiển thị nhiều ảnh + nút Xoá ảnh */}
      {product.imageURLs && product.imageURLs.length > 0 ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
          {product.imageURLs.map((imgPath, idx) => (
            <Paper
              key={idx}
              sx={{ p: 1, textAlign: 'center' }}
              elevation={3}
            >
              <img
                src={`http://localhost:3000/${imgPath}`}
                alt={`img-${idx}`}
                width="150"
              />
              <Button
                variant="outlined"
                color="error"
                sx={{ mt: 1 }}
                onClick={() => handleDeleteImage(imgPath)}
              >
                Xoá ảnh
              </Button>
            </Paper>
          ))}
        </Box>
      ) : (
        <Typography sx={{ mt: 2 }}>No images available</Typography>
      )}

      {/* Form review */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Đánh giá sản phẩm
        </Typography>
        <Box component="form" onSubmit={handleReviewSubmit} sx={{ mb: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2">Rating (1-5):</Typography>
            <TextField
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              inputProps={{ min: 1, max: 5 }}
              required
              size="small"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2">Comment:</Typography>
            <TextField
              multiline
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              size="small"
            />
          </Box>
          <Button type="submit" variant="contained" color="secondary">
            Gửi đánh giá
          </Button>
        </Box>
      </Box>

      {/* Danh sách review */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Danh sách đánh giá
        </Typography>
        {reviews.length === 0 ? (
          <Typography>Chưa có đánh giá nào.</Typography>
        ) : (
          reviews.map((rv) => (
            <Paper
              key={rv._id}
              sx={{ p: 2, mb: 2 }}
              elevation={2}
            >
              <Typography variant="body2" gutterBottom>
                <strong>User:</strong> {rv.user?.username || rv.user}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Rating:</strong> {rv.rating}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {rv.comment}
              </Typography>
              <Typography variant="caption" sx={{ color: '#666' }}>
                {new Date(rv.createdAt).toLocaleString()}
              </Typography>
            </Paper>
          ))
        )}
      </Box>
    </Container>
  );
}

export default ProductDetailPage;
