// src/pages/ProductListPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Material-UI
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box
} from '@mui/material';

function ProductListPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:3000/api/product', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Backend trả về { success: true, products: [...] }
        if (res.data.success) {
          setProducts(res.data.products);
        } else {
          alert(res.data.message || 'Error loading products');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Error loading products');
      });
  }, []);

  // Hàm xem chi tiết sản phẩm (nếu anh muốn)
  const handleViewDetail = (productId) => {
    // Chuyển trang => /product/:id
    // (Anh có thể dùng useNavigate hoặc Link)
    window.location.href = `/product/${productId}`;
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Danh sách sản phẩm
      </Typography>

      {products.length === 0 ? (
        <Typography>Không có sản phẩm</Typography>
      ) : (
        <Grid container spacing={2}>
          {products.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Nếu có nhiều ảnh, ta chỉ hiển thị ảnh đầu, hoặc anh tùy ý */}
                {p.imageURLs && p.imageURLs.length > 0 ? (
                  <CardMedia
                    component="img"
                    image={`http://localhost:3000/${p.imageURLs[0]}`}
                    alt={p.name}
                    height="160"
                  />
                ) : (
                  <Box
                    sx={{
                      height: 160,
                      backgroundColor: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography>No images</Typography>
                  </Box>
                )}

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {p.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {p.price} VND
                  </Typography>

                  {/* Nếu anh muốn hiển thị nhiều ảnh:
                      p.imageURLs.map((imgPath) => ...)
                      => Tạo 1 gallery nho nhỏ
                  */}
                </CardContent>

                <Button
                  variant="contained"
                  sx={{ m: 2 }}
                  onClick={() => handleViewDetail(p._id)}
                >
                  Xem chi tiết
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default ProductListPage;
