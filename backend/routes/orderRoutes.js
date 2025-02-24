const express = require('express');
const orderController = require('../controllers/orderController'); // Nếu file orderController đã được di chuyển sang folder controllers
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

const router = express.Router();

/*
  CHÍNH SÁCH:
  1. GET /api/order
     - Nếu role là 'admin': xem tất cả đơn hàng
     - Nếu role khác: chỉ xem đơn hàng của người dùng đó
  2. GET /api/order/:id
     - Xem chi tiết đơn hàng (với logic kiểm tra: admin có thể xem tất cả, user chỉ xem đơn của mình)
  3. PUT /api/order/:id
     - Cập nhật trạng thái đơn hàng
     - Chỉ cho phép admin và employee thực hiện thao tác này
*/

// Lấy danh sách đơn hàng
router.get('/', auth, orderController.getOrders);

// Lấy chi tiết một đơn hàng
router.get('/:id', auth, orderController.getOrderById);

// Cập nhật trạng thái đơn hàng (chỉ admin và employee)
router.put('/:id', auth, checkRole(['admin', 'employee']), orderController.updateOrderStatus);

module.exports = router;
