// src/pages/OrderListPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderListPage() {
  const [orders, setOrders] = useState([]);
  const [role, setRole] = useState(''); // Lưu role để biết user hay admin
  // Lưu tạm trạng thái mới cho từng order (trước khi bấm "Cập nhật")
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Gọi API lấy danh sách order
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

    // Gọi thêm 1 API (hoặc decode token) để biết role
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
    <div>
      <h2>Danh sách đơn hàng</h2>
      {orders.length === 0 ? (
        <p>Chưa có đơn hàng</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{ border: '1px solid #ccc', margin: '8px 0', padding: '8px' }}
          >
            <p>Order ID: {order._id}</p>
            <p>Trạng thái: {order.status}</p>
            <p>Tổng tiền: {order.totalPrice}</p>
            <p>Ngày đặt: {new Date(order.createdAt).toLocaleString()}</p>
            <p>Items:</p>
            {order.items.map((item, idx) => (
              <div key={idx}>
                <span>Sản phẩm: {item.product?.name}</span>
                <span> - Số lượng: {item.quantity}</span>
              </div>
            ))}

            {/* Nếu role=admin => hiển thị dropdown + nút Cập nhật */}
            {role === 'admin' && (
              <div style={{ marginTop: '8px' }}>
                <label>Cập nhật trạng thái: </label>
                <select
                  value={statusMap[order._id] || order.status}
                  onChange={(e) => handleSelectChange(order._id, e.target.value)}
                >
                  <option value="pending">pending</option>
                  <option value="shipped">shipped</option>
                  <option value="done">done</option>
                  <option value="cancelled">cancelled</option>
                </select>
                <button
                  onClick={() => handleUpdateStatus(order._id)}
                  style={{ marginLeft: '8px' }}
                >
                  Cập nhật
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default OrderListPage;
