// tests/product.test.js
const request = require('supertest');
const app = require('../app');

describe('Product API', () => {
  let adminToken;

  beforeAll(async () => {
    // Tạo user admin & login => adminToken
    // ...
  });

  it('GET /api/product - should return list of products', async () => {
    const res = await request(app).get('/api/product');
    expect(res.statusCode).toBe(200);
    // ...
  });

  it('POST /api/product - should create product if admin', async () => {
    const res = await request(app)
      .post('/api/product')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Test Product', price: 9999 });
    expect(res.statusCode).toBe(200);
    expect(res.body.product.name).toBe('Test Product');
  });
});
