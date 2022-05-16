const supertest = require('supertest');
const server = require('../server');

const request = supertest(server);

describe('Check server is online', () => {
  test('/api', async () => {
    const { body } = await request.get('/api').expect(200);
    expect(body.message).toBe('ok');
  });
});

describe('/api/recipes', () => {
  test('returns 200 and list of recipes', async () => {
    const { body } = await request.get('/api/recipes').expect(200);
    const { recipes } = body;
    expect(recipes).toBeInstanceOf(Array);
    recipes.forEach((recipe) => {
      expect(recipe).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          imageUrl: expect.any(String),
          instructions: expect.any(String),
          ingredients: expect.any(Array),
        })
      );
    });
  });
});
