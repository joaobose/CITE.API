const request = require('supertest');
const config = require('../../test.config.json');
const utils = require('../../utils/utils');
const schema = require('../../schemas/user/user.schema');
const microserviceUrl = config.microservice;

const matchers = require('../../utils/jest.joi');
expect.extend(matchers);

const route = '/users/1';

let token;

beforeAll(async (done) => {
  await utils.resetDatabase();
  token = await utils.login(config.email, config.password);
  done();
});

describe(`Get ${route}`, () => {
  it('No token should return 401', async (done) => {
    //------------------ API call
    const res = await request(microserviceUrl).get(route);

    //------------------ Checking response
    expect(res.statusCode).toEqual(401);
    done();
  });

  it('Get the user should return its data', async (done) => {
    //------------------ API call
    const res = await request(microserviceUrl)
      .get(route)
      .set('Authorization', `Bearer ${token}`);

    //------------------ Checking response
    expect(res.statusCode).toEqual(200);

    //------------------ Check attributes
    expect(res.body).toMatchSchema(schema.schema, {});
    expect(res.body.data.id).toBe(1);

    done();
  });
});

afterAll((done) => {
  done();
});
