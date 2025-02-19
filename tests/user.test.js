// tests/user.test.js
const request = require('supertest');
const app = require('../app'); // Import app từ app.js

describe('User API', () => {
  let token; // lưu token để test

  // Test đăng ký user
  it('POST /api/user/register - should create new user', async () => {
    const res = await request(app)
      .post('/api/user/register')
      .send({
        username: 'testUser',
        password: '123456',
        role: 'employee'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.username).toBe('testUser');
  });

  // Test đăng nhập user
  it('POST /api/user/login - should login and return token', async () => {
    const res = await request(app)
      .post('/api/user/login')
      .send({
        username: 'testUser',
        password: '123456'
      });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    token = res.body.token; // lưu token để test route cần auth
  });

  // Test GET /api/user (phải là admin => 403)
  it('GET /api/user - should return 403 if role not admin', async () => {
    const res = await request(app)
      .get('/api/user')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toBe(403);
  });
});
