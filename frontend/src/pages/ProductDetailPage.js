// src/pages/ProductDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

function ProductDetailPage() {
  const { id } = useParams(); // Lấy productId từ URL
  const [product, setProduct] = useState(null);

  // Thêm state cho review
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
      .get(`http://localhost:3000/api/product/${id}/review`, {
        // GET /api/product/:id/review (không nhất thiết cần token nếu review public)
      })
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

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div>
      <h2>Product Detail</h2>
      <h3>{product.name} - {product.price} VND</h3>
      <p>Category: {product.category}</p>

      {/* Hiển thị nhiều ảnh */}
      {product.imageURLs && product.imageURLs.length > 0 ? (
        product.imageURLs.map((imgPath, idx) => (
          <img
            key={idx}
            src={`http://localhost:3000/${imgPath}`}
            alt={`img-${idx}`}
            width="150"
            style={{ marginRight: '8px' }}
          />
        ))
      ) : (
        <p>No images available</p>
      )}

      {/* Form review */}
      <div style={{ marginTop: '20px' }}>
        <h4>Đánh giá sản phẩm</h4>
        <form onSubmit={handleReviewSubmit}>
          <div>
            <label>Rating (1-5):</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
              required
            />
          </div>
          <div>
            <label>Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button type="submit">Gửi đánh giá</button>
        </form>
      </div>

      {/* Danh sách review */}
      <div style={{ marginTop: '20px' }}>
        <h4>Danh sách đánh giá</h4>
        {reviews.length === 0 ? (
          <p>Chưa có đánh giá nào.</p>
        ) : (
          reviews.map((rv) => (
            <div key={rv._id} style={{ border: '1px solid #ccc', margin: '8px 0', padding: '8px' }}>
              <p><strong>User:</strong> {rv.user?.username || rv.user}</p>
              <p><strong>Rating:</strong> {rv.rating}</p>
              <p>{rv.comment}</p>
              <p style={{ fontSize: '0.85em', color: '#666' }}>
                {new Date(rv.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
