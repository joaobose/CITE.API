const BaseValidator = require('../../../classes/src/BaseValidator');
const Errors = require('../../errors');
const fun = require('../../../functions/general/errors.fun');
const joi = require('joi');
const R = require('ramda');

class UserShowWithValidator extends BaseValidator {
  constructor() {
    super();
    this.name = 'User show with validator';
  }

  async validate(req, res) {
    //---------------------- validate with existance ---------------------//

    let validator = joi.object().keys({
      relationships: joi.string().required()
    });

    let params = {
      relationships: req.query.relationships
    };

    await joi
      .validate(params, validator)
      .catch(fun.catch(req, res, new Errors.BadRequestError()));

    //---------------------- validate params value ----------------------//

    validator = joi.object().keys({
      id: joi.number().integer().required(),
      with: joi
        .array()
        .items(
          joi
            .string()
            .valid('projects', 'managedProjects', 'role', 'applicants')
        )
    });

    params = {
      id: req.params.id,
      with: params.relationships.split(',')
    };

    await joi
      .validate(params, validator)
      .catch(fun.catch(req, res, new Errors.BadRequestError()));

    params.relationships = R.map((rel) => {
      return { rel: rel, entity: this.entityForRel(rel) };
    }, params.with);

    return params;
  }

  entityForRel(relationship) {
    switch (relationship) {
      case 'projects':
        return 'project';
      case 'managedProjects':
        return 'project';
      case 'role':
        return 'role';
      case 'applicants':
        return 'user';
    }
  }
}

module.exports = UserShowWithValidator;
