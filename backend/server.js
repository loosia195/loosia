// server.js
//--------------------------------------------------
console.log('>>> Starting server.js');

// 1) IMPORT APP
//--------------------------------------------------

const app = require('./app'); 
// Chú ý: Đường dẫn "./app" nếu server.js cùng folder với app.js
// Nếu anh đặt app.js ở same folder, thì "./app" là đúng.
// Nếu app.js ở "../app", thì "../app".

// 2) SET PORT
//--------------------------------------------------
const PORT = process.env.PORT || 3000;

// 3) START SERVER
//--------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
