// routes/paymentRoutes.js

//--------------------------------------------------
// 1) IMPORT
//--------------------------------------------------
const express = require('express');
const paymentController = require('../controllers/paymentController');
const auth = require('../middlewares/auth');

//--------------------------------------------------
// 2) CREATE ROUTER
//--------------------------------------------------
const router = express.Router();

/*
  CHÍNH SÁCH:
  1) GET /api/payment/vnpay/:orderId => Tạo link thanh toán VNPAY => user login => route này
  2) GET /api/payment/vnpay_return => VNPAY redirect user => check sign => update order => redirect success/fail
*/

//--------------------------------------------------
// 3) DEFINE ROUTES
//--------------------------------------------------

// a) GET /vnpay/:orderId => tạo link thanh toán => cần login (auth)
router.get('/vnpay/:orderId', auth, paymentController.createVnpayPayment);

// b) GET /vnpay_return => callback => VNPAY redirect => check sign => update order => success/fail
//    => thường không cần auth
router.get('/vnpay_return', paymentController.handleVnpayReturn);

//--------------------------------------------------
// 4) EXPORT
//--------------------------------------------------
module.exports = router;
