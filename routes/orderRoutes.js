// routes/orderRoutes.js
const express = require('express');
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

const router = express.Router();

/*
  * CHÍNH SÁCH:
  * 1) GET /api/order => admin => xem ALL, user => xem đơn của họ (logic trong orderController.getOrders).
  * 2) PUT /api/order/:id => update order => admin, employee => confirm/shipped...
  * 3) GET /api/order/:id => logic check (admin => all, user => own).
*/

// 1) GET / => orderController.getOrders
//    Trong getOrders: if role='admin' => all orders, else => user orders
router.get('/', auth, orderController.getOrders);

// 2) GET /:id => chi tiết 1 đơn
router.get('/:id', auth, orderController.getOrderById);

// 3) PUT /:id => update status => only admin, employee
router.put('/:id', auth, checkRole(['admin','employee']), orderController.updateOrderStatus);

module.exports = router;
