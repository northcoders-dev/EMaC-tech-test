const supertest = require('supertest');
const server = require('../server');

const request = supertest(server);

describe('GET /api', () => {
  describe('200: ok response', () => {
    test('/api', async () => {
      const { body } = await request.get('/api').expect(200);
      expect(body.message).toBe('ok');
    });
  });
});

describe('GET /api/recipes', () => {
  describe('HAPPY PATH', () => {
    describe('200: ok response', () => {
      test('/api/recipes', async () => {
        const { body } = await request.get('/api/recipes').expect(200);
      });
    });
    describe('200: get list of recipes', () => {
      test('/api/recipes', async () => {
        const { body } = await request.get('/api/recipes');

        body.recipes.forEach((recipe) => {
          expect(recipe).toEqual(
            expect.objectContaining({
              id: expect.any(String),
              imageUrl: expect.any(String),
              instructions: expect.any(String),
              ingredients: expect.any(Array),
            })
          );
          recipe.ingredients.forEach((ingredient) => {
            expect(ingredient).toEqual(
              expect.objectContaining({
                name: expect.any(String),
                grams: expect.any(Number),
              })
            );
          });
        });
      });
    });
    describe('200: get recipes excluding one ingredients', () => {
      test('/api/recipes?exclude_ingredients=coffee', async () => {
        const { body } = await request.get(
          '/api/recipes?exclude_ingredients=coffee'
        );

        body.recipes.forEach((recipe) => {
          recipe.ingredients.forEach((ingredient) => {
            expect(ingredient).toMatchObject({
              name: expect.not.stringContaining('coffee'),
              grams: expect.any(Number),
            });
          });
        });
      });
      test('/api/recipes?exclude_ingredients=apples,bananas,carrots', async () => {
        const { body } = await request.get(
          '/api/recipes?exclude_ingredients=apples,bananas,carrots'
        );

        body.recipes.forEach((recipe) => {
          recipe.ingredients.forEach((ingredient) => {
            expect(ingredient).toMatchObject({
              name: expect.not.stringContaining('apples'),
              grams: expect.any(Number),
            });
            expect(ingredient).toMatchObject({
              name: expect.not.stringContaining('bananas'),
              grams: expect.any(Number),
            });
            expect(ingredient).toMatchObject({
              name: expect.not.stringContaining('carrots'),
              grams: expect.any(Number),
            });
          });
        });
      });
    });
    describe('200: get a single recipe by id', () => {
      test('/api/recipes/:id', async () => {
        const id = 'recipe-31';
        const { body } = await request.get(`/api/recipes/${id}`).expect(200);

        const expected = {
          id: 'recipe-31',
          imageUrl: 'http://www.images.com/21',
          instructions: 'spin it, twist it, pull it, flick it... bop it!',
          ingredients: [
            { name: 'strawberries', grams: 187 },
            { name: 'kale', grams: 41 },
            { name: 'apple juice', grams: 64 },
            { name: 'coffee', grams: 146 },
            { name: 'cocoa nibs', grams: 154 },
          ],
        };

        expect(body.recipe).toEqual(expected);
      });
    });
  });
  describe('UNHAPPY PATH', () => {
    describe('404: path not found', () => {
      test('/api/wrongpath', async () => {
        const { body } = await request.get('/api/wrongpath').expect(404);
        expect(body).toEqual({ msg: 'not found!' });
      });
    });
    describe('404: recipe not found', () => {
      test('/api/recipes/:id', async () => {
        const id = 'recipe-330';
        const { body } = await request.get(`/api/recipes/${id}`).expect(404);
        expect(body).toEqual({ msg: 'not found!' });
      });
    });
  });
});

describe('POST /api/recipes', () => {
  describe('HAPPY PATH', () => {
    describe('201: created', () => {
      test('/api/recipes', async () => {
        const postRequest = {
          imageUrl: 'http://www.images.com/121',
          instructions: 'spin it, twist it, pull it, flick it... bop it!',
          ingredients: [
            { name: 'blueberries', grams: 195 },
            { name: 'banana', grams: 113 },
            { name: 'strawberries', grams: 105 },
            { name: 'cocoa nibs', grams: 18 },
            { name: 'raspberries', grams: 31 },
          ],
        };

        const { body } = await request
          .post('/api/recipes')
          .send(postRequest)
          .expect(201);

        expect(body).toEqual(
          expect.objectContaining({ id: expect.any(String) })
        );

        // const expected = {
        //   id: body.id,
        //   imageUrl: 'http://www.images.com/121',
        //   instructions: 'spin it, twist it, pull it, flick it... bop it!',
        //   ingredients: [
        //     { name: 'blueberries', grams: 195 },
        //     { name: 'banana', grams: 113 },
        //     { name: 'strawberries', grams: 105 },
        //     { name: 'cocoa nibs', grams: 18 },
        //     { name: 'raspberries', grams: 31 },
        //   ],
        // };

        // console.log(body.id);

        // const { response } = await request
        //   .get(`/api/recipes/${body.id}`)
        //   .expect(200);
        // console.log(response, '<< response');
        // expect(response.recipe).toEqual(expected);
      });
    });
  });
});
