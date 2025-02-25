// src/pages/CartPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    return <div>Loading cart...</div>;
  }

  return (
    <div>
      <h2>Giỏ hàng của bạn</h2>
      {cart.items && cart.items.length > 0 ? (
        <div>
          {cart.items.map((item) => (
            <div key={item.product._id} style={{ margin: '8px 0' }}>
              <p>
                Sản phẩm: {item.product.name} - Số lượng: {item.quantity}
              </p>
              <button onClick={() => handleDeleteItem(item.product._id)}>
                Xóa
              </button>
            </div>
          ))}

          {/* Nút "Thanh toán" */}
          <button onClick={handleCheckout}>Thanh toán</button>
        </div>
      ) : (
        <p>Giỏ hàng trống</p>
      )}
    </div>
  );
}

export default CartPage;
