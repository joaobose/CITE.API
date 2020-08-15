const uuid = require('uuid/v1');
const R = require('ramda');

/**
 * Base error representation.
 *
 * @since      0.1.0
 * @access     public
 *
 * @constructs BaseError
 */
class BaseError {
  /**
   * Unique error identifier.
   *
   * @since  0.1.0
   * @access public
   *
   * @type     {String}
   *
   * @member   {String} id
   * @memberof BaseError
   */
  id = undefined;

  /**
   * Error JSONAPI Links object
   *
   * @since  0.1.0
   * @access public
   *
   * @type     {Object | undefined}
   *
   * @member   {Object | undefined} links
   * @memberof BaseError
   */
  links = undefined;

  /**
   * Error HTTP status code
   *
   * @since  0.1.0
   * @access public
   *
   * @type     {Number}
   *
   * @member   {Number} status
   * @memberof BaseError
   */
  status = 500;

  /**
   * Error custom internal code
   *
   * @since  0.1.0
   * @access public
   *
   * @type     {String | Number | undefined}
   *
   * @member   {String | Number | undefined} code
   * @memberof BaseError
   */
  code = undefined;

  /**
   * Error descriptive title
   *
   * @since  0.1.0
   * @access public
   *
   * @type     {String}
   *
   * @member   {String} title
   * @memberof BaseError
   */
  title = 'genericInternalServerError';

  /**
   * Error human readable detail string
   *
   * @since  0.1.0
   * @access public
   *
   * @type     {String | undefined}
   *
   * @member   {String | undefined} detail
   * @memberof BaseError
   */
  detail = undefined;

  /**
   * Error JSONAPI source object
   *
   * @since  0.1.0
   * @access public
   *
   * @type     {Object | undefined}
   *
   * @member   {Object | undefined} source
   * @memberof BaseError
   */
  source = undefined;

  /**
   * Error JSONAPI meta object
   *
   * @since  0.1.0
   * @access public
   *
   * @type     {Object | undefined}
   *
   * @member   {Object | undefined} meta
   * @memberof BaseError
   */
  meta = {};

  /**
   * BaseError constructor, given a feed Object creates a JSONAPI Error representation
   *
   * @since      0.1.0
   * @access     public
   *
   * @constructs BaseError
   *
   * @param {Object} feed Feed Object, this objects holds the data to build the error.
   */
  constructor(feed) {
    this.id = uuid();

    R.pipe(
      R.keys,
      R.filter((property) => R.has(property)(this)),
      R.forEach((property) => {
        this[property] = feed[property];
      })
    )(feed);
  }

  /**
   * Gets the JSONAPI compact Object representation of the Error
   *
   * @since      0.1.0
   * @access     public
   * @memberof BaseError
   *
   * @returns {Object} The JSONAPI compact representation
   */
  compact() {
    return R.pipe(
      R.keys,
      R.filter((property) => this[property]),
      R.map((property) => {
        return R.objOf(property, this[property]);
      }),
      R.mergeAll
    )(this);
  }
}

module.exports = BaseError;
