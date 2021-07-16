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
  token = await utils.login(config.email, config.password);
  done();
});

describe(`Put ${route}`, () => {
  let body = {
    description: 'Do not learn for work, work for learning',
    name: 'Joao Bose',
    lastname: 'Pinto Diaz'
  };

  it('No token should return 401', async (done) => {
    //------------------ API call
    const res = await request(microserviceUrl).put(route);

    //------------------ Checking response
    expect(res.statusCode).toEqual(401);
    done();
  });

  it('Updating a direct attribute of the user actually updates the attribute', async (done) => {
    //------------------ Setting variables
    let directAttributes = []; // Example: ['foo', 'bar']

    await Promise.all(
      directAttributes.map(async (parameter) => {
        //------------------ Setting variables
        let localBody = {};
        localBody[parameter] = body[parameter];

        //------------------ API call
        const update = await request(microserviceUrl)
          .put(route)
          .set('Authorization', `Bearer ${token}`)
          .send(localBody);

        //------------------ Checking response
        expect(update.statusCode).toEqual(200);

        //------------------ GET call
        const res = await request(microserviceUrl)
          .get(route)
          .set('Authorization', `Bearer ${token}`);

        //------------------ Checking changes
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes[parameter]).toEqual(
          localBody[parameter]
        );
      })
    );

    // await Promise.all(
    //   directAttributes.map((parameter) => {
    //     return (async () => {
    //       //------------------ Setting variables
    //       let localBody = {};
    //       localBody[parameter] = body[parameter];

    //       //------------------ API call
    //       const update = await request(microserviceUrl)
    //         .put(route)
    //         .set('Authorization', `Bearer ${token}`)
    //         .send(localBody);

    //       //------------------ Checking response
    //       expect(update.statusCode).toEqual(200);

    //       //------------------ GET call
    //       const res = await request(microserviceUrl)
    //         .get(route)
    //         .set('Authorization', `Bearer ${token}`);

    //       //------------------ Checking changes
    //       expect(res.statusCode).toEqual(200);
    //       expect(res.body.data.attributes[parameter]).toEqual(
    //         localBody[parameter]
    //       );
    //     })();
    //   })
    // );

    done();
  });

  it('Updating all parameters of the user returns 200', async (done) => {
    //------------------ Setting variables
    let { ...localBody } = body;

    //------------------ API call
    const res = await request(microserviceUrl)
      .put(route)
      .set('Authorization', `Bearer ${token}`)
      .send(localBody);

    //------------------ Checking response
    expect(res.statusCode).toEqual(200);

    //------------------ Checking if it was updated
    let modelId = Number(res.body.data.id);

    await utils.expectEntityMatch(
      `${route}`,
      modelId,
      localBody,
      schema.schema,
      token
    );

    done();
  });

  it('Update some parameters of the user returns 200', async (done) => {
    //------------------ Setting variables
    let parameters = Object.keys(body);

    await Promise.all(
      parameters.map(async (parameter) => {
        //------------------ Setting variables
        let { ...localBody } = body;
        delete localBody[parameter];

        //------------------ API call
        const res = await request(microserviceUrl)
          .put(route)
          .set('Authorization', `Bearer ${token}`)
          .send(localBody);

        //------------------ Checking response
        expect(res.statusCode).toEqual(200);

        //------------------ Checking if it was updated
        let modelId = Number(res.body.data.id);

        await utils.expectEntityMatch(
          `${route}`,
          modelId,
          localBody,
          schema.schema,
          token
        );
      })
    );

    // await Promise.all(
    //   parameters.map((parameter) => {
    //     return (async () => {
    //       //------------------ Setting variables
    //       let { ...localBody } = body;
    //       delete localBody[parameter];

    //       //------------------ API call
    //       const res = await request(microserviceUrl)
    //         .put(route)
    //         .set('Authorization', `Bearer ${token}`)
    //         .send(localBody);

    //       //------------------ Checking response
    //       expect(res.statusCode).toEqual(200);

    //       //------------------ Checking if it was updated
    //       let modelId = res.body.data.id;

    //       await utils.expectEntityMatch(
    //         `${route}`,
    //         modelId,
    //         localBody,
    //         schema.schema,
    //         token
    //       );
    //     })();
    //   })
    // );

    done();
  });
});

afterAll((done) => {
  done();
});
