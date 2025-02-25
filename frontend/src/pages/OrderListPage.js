// src/pages/OrderListPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Material-UI
import {
  Container,
  Typography,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

function OrderListPage() {
  const [orders, setOrders] = useState([]);
  const [role, setRole] = useState(''); // Lưu role để biết user hay admin
  // Lưu tạm trạng thái mới cho từng order (trước khi bấm "Cập nhật")
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');

    // 1) Gọi API lấy danh sách order
    axios
      .get('http://localhost:3000/api/order', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success) {
          setOrders(res.data.orders);

          // Khởi tạo statusMap = { orderId: order.status, ... }
          const initialMap = {};
          res.data.orders.forEach((od) => {
            initialMap[od._id] = od.status;
          });
          setStatusMap(initialMap);
        } else {
          alert('Lỗi khi tải danh sách đơn hàng');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Server error');
      });

    // 2) Gọi thêm 1 API (hoặc decode token) để biết role
    axios
      .get('http://localhost:3000/api/user/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success) {
          setRole(res.data.user.role);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Xử lý khi user chọn 1 status mới trong dropdown
  const handleSelectChange = (orderId, newStatus) => {
    setStatusMap((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  // Hàm cập nhật trạng thái (chỉ admin)
  const handleUpdateStatus = async (orderId) => {
    try {
      const newStatus = statusMap[orderId]; // Lấy giá trị từ statusMap
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `http://localhost:3000/api/order/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        alert('Cập nhật trạng thái đơn hàng thành công!');

        // Cập nhật state orders => thay order cũ bằng order mới
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? res.data.order : o))
        );

        // Cập nhật statusMap
        setStatusMap((prev) => ({
          ...prev,
          [orderId]: res.data.order.status,
        }));
      } else {
        alert(res.data.message || 'Lỗi khi cập nhật đơn hàng');
      }
    } catch (error) {
      console.error(error);
      alert('Server error');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Danh sách đơn hàng
      </Typography>

      {orders.length === 0 ? (
        <Typography>Chưa có đơn hàng</Typography>
      ) : (
        orders.map((order) => (
          <Paper
            key={order._id}
            elevation={3}
            sx={{ p: 2, mb: 2 }}
          >
            <Typography variant="subtitle1" gutterBottom>
              <strong>Order ID:</strong> {order._id}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Trạng thái:</strong> {order.status}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Tổng tiền:</strong> {order.totalPrice}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Ngày đặt:</strong> {new Date(order.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Items:</strong>
            </Typography>
            {order.items.map((item, idx) => (
              <Typography key={idx} variant="body2" sx={{ ml: 2 }}>
                Sản phẩm: {item.product?.name} - Số lượng: {item.quantity}
              </Typography>
            ))}

            {/* Nếu role=admin => hiển thị dropdown + nút Cập nhật */}
            {role === 'admin' && (
              <div style={{ marginTop: '8px' }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Cập nhật trạng thái:
                </Typography>
                <FormControl size="small" sx={{ mr: 1 }}>
                  <InputLabel id={`status-label-${order._id}`}>Trạng thái</InputLabel>
                  <Select
                    labelId={`status-label-${order._id}`}
                    label="Trạng thái"
                    value={statusMap[order._id] || order.status}
                    onChange={(e) => handleSelectChange(order._id, e.target.value)}
                    sx={{ width: 150 }}
                  >
                    <MenuItem value="pending">pending</MenuItem>
                    <MenuItem value="shipped">shipped</MenuItem>
                    <MenuItem value="done">done</MenuItem>
                    <MenuItem value="cancelled">cancelled</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdateStatus(order._id)}
                >
                  Cập nhật
                </Button>
              </div>
            )}
          </Paper>
        ))
      )}
    </Container>
  );
}

export default OrderListPage;
