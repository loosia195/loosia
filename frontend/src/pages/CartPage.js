// src/pages/CartPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// 1) Import Material-UI components
import { 
  Container, 
  Typography, 
  Button, 
  Paper 
} from '@mui/material';

function CartPage() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    // Gọi GET /api/cart
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:3000/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success) {
          setCart(res.data.cart);
        } else {
          alert('Lỗi khi tải giỏ hàng');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Server error');
      });
  }, []);

  // Hàm xóa 1 sản phẩm
  const handleDeleteItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.delete(`http://localhost:3000/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setCart(res.data.cart);
      } else {
        alert('Lỗi khi xóa sản phẩm khỏi giỏ');
      }
    } catch (error) {
      console.error(error);
      alert('Server error');
    }
  };

  // Hàm "Thanh toán" => Tạo đơn hàng, xóa giỏ
  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:3000/api/order',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        alert('Đã đặt hàng thành công! Order ID: ' + res.data.order._id);
        // Xóa cart items => setCart({ items: [] });
        setCart({ items: [] });
      } else {
        alert(res.data.message || 'Lỗi khi đặt hàng');
      }
    } catch (error) {
      console.error(error);
      alert('Server error');
    }
  };

  if (!cart) {
    return <Typography variant="h6" sx={{ mt: 2 }}>Loading cart...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Giỏ hàng của bạn
      </Typography>

      {cart.items && cart.items.length > 0 ? (
        <div>
          {cart.items.map((item) => (
            <Paper 
              key={item.product._id} 
              sx={{ p: 2, mb: 2 }}
              elevation={3}
            >
              <Typography variant="body1">
                Sản phẩm: <strong>{item.product.name}</strong> 
                {' '} - Số lượng: <strong>{item.quantity}</strong>
              </Typography>
              <Button 
                variant="outlined" 
                color="error" 
                sx={{ mt: 1 }}
                onClick={() => handleDeleteItem(item.product._id)}
              >
                Xóa
              </Button>
            </Paper>
          ))}

          {/* Nút "Thanh toán" */}
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleCheckout}
          >
            Thanh toán
          </Button>
        </div>
      ) : (
        <Typography variant="body1">
          Giỏ hàng trống
        </Typography>
      )}
    </Container>
  );
}

export default CartPage;
