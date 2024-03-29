const request = require('supertest');
const config = require('../../test.config.json');
const utils = require('../../utils/utils');
const microserviceUrl = config.microservice;

const route = '/users/2';

let token;

beforeAll(async (done) => {
  token = await utils.login(config.email, config.password);
  done();
});

describe(`Delete ${route}`, () => {
  it('No token should return 401', async (done) => {
    //------------------ API call
    const res = await request(microserviceUrl).delete(route);

    //------------------ Checking response
    expect(res.statusCode).toEqual(401);
    done();
  });

  it('Deleting the user should return 200', async (done) => {
    //------------------ API call
    const res = await request(microserviceUrl)
      .delete(route)
      .set('Authorization', `Bearer ${token}`);

    //------------------ Checking response
    expect(res.statusCode).toEqual(200);
    expect(res.body.meta).toHaveProperty('affectedRows');
    expect(res.body.meta.affectedRows).toEqual(1);

    //------------------ Checking if deleted
    await utils.expectNotFound(route, token);

    done();
  });
});

afterAll((done) => {
  done();
});
