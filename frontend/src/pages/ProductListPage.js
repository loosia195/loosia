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

  // Hàm xem chi tiết sản phẩm
  const handleViewDetail = (productId) => {
    // Tạm dùng window.location.href => /product/:id
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
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Hiển thị ảnh đầu tiên nếu có */}
                {p.imageURLs && p.imageURLs.length > 0 ? (
                  <CardMedia
                    component="img"
                    image={`http://localhost:3000/${p.imageURLs[0]}`}
                    alt={p.brand || 'No brand'}
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
                  {/* Hiển thị brand + category */}
                  <Typography variant="h6" gutterBottom>
                    {p.brand} - {p.category}
                  </Typography>

                  {/* size + availability */}
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Size: {p.size} 
                    {p.availability && ` - ${p.availability}`}
                  </Typography>

                  {/* originalPrice / salePrice */}
                  {p.originalPrice && (
                    <Typography variant="body2" color="text.secondary">
                      Original: {p.originalPrice} VND
                    </Typography>
                  )}
                  {p.salePrice && p.salePrice > 0 && (
                    <Typography variant="body2" color="error">
                      Sale: {p.salePrice} VND
                    </Typography>
                  )}

                  {/* discountInfo */}
                  {p.discountInfo && (
                    <Typography variant="body2" color="text.secondary">
                      {p.discountInfo}
                    </Typography>
                  )}

                  {/* condition */}
                  {p.condition && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Condition: {p.condition}
                    </Typography>
                  )}
                </CardContent>

                {/* Nút xem chi tiết */}
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
