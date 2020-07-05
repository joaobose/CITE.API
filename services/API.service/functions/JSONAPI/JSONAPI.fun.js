const R = require('ramda');
const BaseError = require('../../classes/src/BaseError');
const errorFun = require('../general/errors.fun');

let data = (res, code) => {
  return (data, transformFunction = (item) => item, { meta, links } = {}) => {
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
  return (id, type, { meta, links, dataAttr } = {}) => {
    let document = {
      data: {
        id: id,
        type: type,
        links: { self: '/' + type + '/' + id }
      }
    };

    // adding optionals
    if (meta) document.meta = meta;
    if (links) document.links = links;
    if (dataAttr && typeof dataAttr === 'object')
      document.data = R.mergeRight(document.data, dataAttr);

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
