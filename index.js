/**
 * @file Provides a composable get function that doesn't explode.
 */

var _ = require('lodash');

/**
 * Predicate to define the existence of something.
 * @param {*} x - the thing to test, duh.
 * @returns {Boolean}
 *
 * Borrowed from Functional Javascript p.19 - http://oreil.ly/1q4leGp
 */
var _existy = function(x) {
    return x != null;
};

/**
 * Predicate to determine if something should be considered a synonym for true.
 * @param {*} x - the thing to test, duh.
 * @returns {Boolean}
 *
 * Borrowed from Functional Javascript p.19 - http://oreil.ly/1q4leGp
 */
var _truthy = function(x) {
    return (x !== false) && _existy(x);
};

/**
 * Predicate to determine if a nested object should be considered a synonym for true.
 * @param {Object} obj - the object to search.
 * @param {string} prop - the piece to find.
 * @returns {*}
 */
var _nestedTruthy = function(obj, prop) {
    return _truthy(_.reduce(prop.split('.'), function(o, p) {
        return !_truthy(o) ? o : o[p];
    }, obj));
};

/**
 * Return a piece of an object if it exists.
 * @param {string} prop - the piece to find.
 * @param {Object} obj - the object to search.
 * @returns {*}
 */
var composableGet = _.curry(function(prop, obj) {

    // If the object or the object.property aren't available, just return
    // nothing. For your health.
    if (_nestedTruthy(obj, prop)) {
        return obj[prop];
    } else {
        return;
    }
});

module.exports = composableGet;
