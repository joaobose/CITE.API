const request = require('supertest');
const config = require('../../test.config.json');
const utils = require('../../utils/utils');
const schema = require('../../schemas/user/user.schema');
const microserviceUrl = config.microservice;

const matchers = require('../../utils/jest.joi');
expect.extend(matchers);

const route = '/users/';

let token;

beforeAll(async () => {
  token = await utils.login(config.email, config.password);
});

describe(`Post ${route}`, () => {
  let body = {
    email: 'jhondoe@email.com',
    password: 'develop',
    name: 'Jhon',
    lastname: 'Doe',
    description: 'Blank face',
    roleId: 2
  };

  it('No token should return 401', async () => {
    //------------------ API call
    const res = await request(microserviceUrl).post(route);

    //------------------ Checking response
    expect(res.statusCode).toEqual(401);
  });

  it('Missing a parameter returns 400', async () => {
    //------------------ Setting variables
    let parameters = Object.keys(body);

    await Promise.all(
      parameters.map(async (parameter) => {
        //------------------ Setting variables
        let { ...localBody } = body;
        delete localBody[parameter];

        //------------------ API call
        const res = await request(microserviceUrl)
          .post(route)
          .set('Authorization', `Bearer ${token}`)
          .send(localBody);

        //------------------ Checking response
        expect(res.statusCode).toEqual(400);
      })
    );
  });

  it('Create the user should return 201 and store the resource', async () => {
    //------------------ Setting variables
    let { ...localBody } = body;

    //------------------ API call
    const res = await request(microserviceUrl)
      .post(route)
      .set('Authorization', `Bearer ${token}`)
      .send(localBody);

    //------------------ Checking response
    expect(res.statusCode).toEqual(201);
    expect(typeof res.body.data.id).toBe('number');

    //------------------ Checking if it was created
    let modelId = res.body.data.id;
    let { password, roleId, ...expectedBody } = localBody;

    await utils.expectEntityMatch(
      `${route}/${modelId}`,
      modelId,
      expectedBody,
      schema.schema,
      token
    );
  });
});

afterAll(async () => {});
