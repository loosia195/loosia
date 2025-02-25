// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 1) Import MUI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// 2) Tạo theme (có thể tùy chỉnh palette, typography...)
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // xanh lam mặc định MUI
    },
    secondary: {
      main: '#9c27b0', // tím
    },
  },
  // typography, shape, v.v. có thể tùy chỉnh thêm
});

// 3) Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Bọc App trong ThemeProvider + CssBaseline */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// 4) Đo hiệu năng (tuỳ chọn)
reportWebVitals();
