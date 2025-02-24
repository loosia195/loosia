// controllers/paymentController.js
const Order = require('../models/order');
const crypto = require('crypto');
const moment = require('moment');
const querystring = require('qs');

function sortObject(obj) {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  keys.forEach((key) => {
    sorted[key] = obj[key];
  });
  return sorted;
}

const paymentController = {
  // 1) Tạo URL thanh toán VNPAY
  createVnpayPayment: async (req, res) => {
    try {
      // Lấy order ID
      const { orderId } = req.params;
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }

      // Lấy config VNPAY
      const tmnCode = process.env.VNPAY_TMNCODE;
      const secretKey = process.env.VNPAY_HASHSECRET;
      const returnUrl = process.env.VNPAY_RETURNURL;
      const vnpUrl = process.env.VNPAY_APIURL; // sandbox or live

      // Số tiền => *100 (nếu 100 = 1 VND)
      const amount = order.totalPrice * 100;

      // Tạo param
      const date = new Date();
      const createDate = moment(date).format('YYYYMMDDHHmmss');
      const ipAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const txnRef = `${order._id}-${createDate}`; // unique

      let vnp_Params = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: tmnCode,
        vnp_Locale: 'vn',
        vnp_CurrCode: 'VND',
        vnp_TxnRef: txnRef,
        vnp_OrderInfo: `Thanh toan Loosia Order #${order._id}`,
        vnp_OrderType: 'other',
        vnp_Amount: amount,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate
      };

      // Sort param
      vnp_Params = sortObject(vnp_Params);

      // Tạo sign
      const signData = querystring.stringify(vnp_Params, { encode: false });
      const hmac = crypto.createHmac('sha512', secretKey);
      const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
      vnp_Params['vnp_SecureHash'] = signed;

      // Build paymentUrl
      const paymentUrl = vnpUrl + '?' + querystring.stringify(vnp_Params, { encode: false });

      // Trả link
      res.json({ success: true, paymentUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'VNPAY create payment error' });
    }
  },

  // 2) Xử lý return URL VNPAY
  handleVnpayReturn: async (req, res) => {
    try {
      let vnp_Params = req.query;
      // Lấy secureHash
      const secureHash = vnp_Params['vnp_SecureHash'];
      delete vnp_Params['vnp_SecureHash'];
      delete vnp_Params['vnp_SecureHashType'];

      // Sort param
      vnp_Params = sortObject(vnp_Params);

      // Tạo sign
      const secretKey = process.env.VNPAY_HASHSECRET;
      const signData = querystring.stringify(vnp_Params, { encode: false });
      const hmac = crypto.createHmac('sha512', secretKey);
      const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

      if (secureHash === signed) {
        // Kiểm tra responseCode
        if (vnp_Params['vnp_ResponseCode'] === '00') {
          // Thành công
          const txnRef = vnp_Params['vnp_TxnRef']; // "orderId-createDate"
          const orderId = txnRef.split('-')[0];
          const order = await Order.findById(orderId);
          if (order) {
            order.status = 'paid';
            await order.save();
          }
          return res.redirect('/payment-success.html');
        } else {
          // Thất bại
          return res.redirect('/payment-failed.html');
        }
      } else {
        // Sai chữ ký
        return res.redirect('/payment-failed.html');
      }
    } catch (error) {
      console.error(error);
      return res.redirect('/payment-failed.html');
    }
  }
};

module.exports = paymentController;
