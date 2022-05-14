const supertest = require('supertest');
const server = require('../server');

const request = supertest(server);

test('/api', async () => {
	const { body } = await request.get('/api').expect(200);
	expect(body.message).toBe('ok');
});

describe('GET /api/recipes', () => {
	test('200: responds with an array of recipe objects', async () => {
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

describe('ERROR HANDLING - GET /api/recipes', () => {
	test('404: return "Path not found" error when invalid URL is passed', async () => {
		const { body } = await request.get('/api/badpath').expect(404);
		expect(body.msg).toEqual('Path not found');
	});
});
