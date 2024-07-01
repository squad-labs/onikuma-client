import fetch from 'node-fetch';

describe('Home Page Response', () => {
  it('should return status code 200', async () => {
    const response = await fetch('http://localhost:3000');
    expect(response.status).toBe(200);
  });
});