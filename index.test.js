const server = require('./main'); // adjust if your file is named differently
const http = require('http');

const PORT = 3000;

function httpGet(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${PORT}${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

beforeAll(done => {
  server.listen(PORT, done);
});

afterAll(done => {
  server.close(done);
});

test('GET / returns 200 and HTML content', async () => {
  const res = await httpGet('/');
  expect(res.status).toBe(200);
  expect(res.data).toContain('<!DOCTYPE html>'); // Assuming your index.html starts with this
});

test('GET /nonexistent returns 404', async () => {
  const res = await httpGet('/nonexistent');
  expect(res.status).toBe(404);
  expect(res.data).toContain('404 Not Found');
});
