const supertest = require('supertest');
const server = require('../server');

const request = supertest(server);

test.only('/api', async () => {
	const { body } = await request.get('/api').expect(200);
	expect(body.message).toBe('ok');
});

describe('GET /api/recipes', () => {
	test.only('200: responds with an array of recipe objects', async () => {
		const { body } = await request.get('/api/recipes').expect(200);
		expect(body.recipes).toBeInstanceOf(Array);
		body.recipes.forEach((recipe) => {
			expect(recipe).toMatchObject({
				id: expect.any(String),
				imageUrl: expect.any(String),
				instructions: expect.any(String),
			});
			recipe.ingredients.forEach((ingredient) => {
				expect(ingredient).toMatchObject({
					name: expect.any(String),
					grams: expect.any(Number),
				});
			});
		});
	});
});
