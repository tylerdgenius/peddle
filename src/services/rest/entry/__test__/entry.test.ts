import { app } from 'app';
import request from 'supertest';

test('index route works', (done) => {
  request(app)
    .get('/api')
    .expect({
      message: 'Welcome to peddle products api service',
      status: 200,
      success: true,
    })
    .expect(200, done);
});

test('test route works', (done) => {
  request(app)
    .get('/api/test')
    .expect({
      message: 'Entry route is open and available',
      status: 200,
      success: true,
    })
    .expect(200, done);
});
