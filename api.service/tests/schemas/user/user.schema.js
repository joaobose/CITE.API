const relationships = require('./user.relationships.schema');
const attributes = require('./user.attributes.schema');
const schema = require('../../utils/schema');

module.exports = schema(attributes, relationships);
