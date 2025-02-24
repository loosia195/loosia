// tests/product.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

describe("Product API", () => {
  let adminToken;

  // Tạo user admin & login => store token
  beforeAll(async () => {
    // Tạo username random => tránh "Username đã tồn tại"
    const randomAdmin = `adminUser_${Date.now()}`;

    const registerRes = await request(app).post("/api/user/register").send({
      username: randomAdmin,
      password: "123456",
      role: "admin",
    });
    expect(registerRes.statusCode).toBe(200);

    // Login
    const loginRes = await request(app).post("/api/user/login").send({
      username: randomAdmin,
      password: "123456",
    });
    expect(loginRes.statusCode).toBe(200);

    adminToken = loginRes.body.token;
  });

  it("GET /api/product - should return list of products (public)", async () => {
    const res = await request(app).get("/api/product");
    expect(res.statusCode).toBe(200);
    // ...
  });

  it("POST /api/product - should create product if admin", async () => {
    // Dùng token admin
    const res = await request(app)
      .post("/api/product")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Test Product", price: 9999 });
    expect(res.statusCode).toBe(200);
    expect(res.body.product.name).toBe("Test Product");
  });
});

// Đóng DB
afterAll(async () => {
  await mongoose.connection.close();
});
