const R = require('ramda');
const BaseError = require('../../../../classes/src/BaseError');
const errorFun = require('../../../general/errors.fun');

let data = (res, code) => {
  return (data, transformFunction, links, meta) => {
    // validating transform
    if (typeof transformFunction === 'function') {
      // transforming
      let transformed = transformFunction(data);
      let document = {
        data: transformed
      };

      // adding optionals
      if (links) document.links = links;
      if (meta) document.meta = meta;

      // sending response
      res.status(code).json(document);
    } else {
      errorFun.throw(
        null,
        res,
        new BaseError({
          status: 500,
          title: 'invalidTransformFunction',
          detail: 'invalid transform function for JSONAPI response',
          meta: {
            JSONAPIMethod: 'data'
          }
        })
      );
    }
  };
};

let meta = (res, code) => {
  return (meta) => {
    res.status(code).json({ meta: meta });
  };
};

let reference = (res, code) => {
  return (id, type, refLinks, links, meta) => {
    let document = {
      data: {
        id: id,
        type: type,
        links: { self: '/' + type + '/' + id }
      }
    };

    // adding optionals
    if (refLinks) document.data.links = refLinks;
    if (meta) document.meta = meta;
    if (links) document.links = links;

    // sending response
    res.status(code).json(document);
  };
};

module.exports = (res, code) => {
  return {
    data: data(res, code),
    meta: meta(res, code),
    reference: reference(res, code)
  };
};
