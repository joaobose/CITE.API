const joi = require('joi');

const roleAttributes = require('../role/role.attributes.schema');
const projectAttributes = require('../project/project.attributes.schema');
const userAttributes = require('../user/user.attributes.schema');

const data = (schema) =>
  joi.object().keys({
    data: schema
  });

module.exports = joi.object().keys({
  role: data(
    joi.object().keys({
      id: joi.number().integer().min(0).required(),
      type: 'role',
      attributes: roleAttributes.optional()
    })
  ).required(),
  projects: data(
    joi.array().items({
      id: joi.number().integer().min(0).required(),
      type: 'project',
      attributes: projectAttributes
    })
  ).optional(),
  managedProjects: data(
    joi.array().items({
      id: joi.number().integer().min(0).required(),
      type: 'project',
      attributes: projectAttributes
    })
  ).optional(),
  applicants: data(
    joi.array().items({
      id: joi.number().integer().min(0).required(),
      type: 'user',
      attributes: userAttributes
    })
  ).optional()
});
