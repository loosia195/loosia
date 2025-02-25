// src/components/MyNavBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function MyNavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Tiêu đề */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Loosia Shop
        </Typography>

        {/* Link đến trang chủ */}
        <Button
          component={Link}
          to="/"
          color="inherit"
        >
          Trang chủ
        </Button>

        {/* Link đến danh sách sản phẩm */}
        <Button
          component={Link}
          to="/products"
          color="inherit"
        >
          Sản phẩm
        </Button>

        {/* Link đến giỏ hàng */}
        <Button
          component={Link}
          to="/cart"
          color="inherit"
        >
          Giỏ hàng
        </Button>

        {/* Link đến danh sách đơn hàng */}
        <Button
          component={Link}
          to="/orders"
          color="inherit"
        >
          Đơn hàng
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default MyNavBar;
