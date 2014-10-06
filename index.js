/**
 * @file
 *
 * Predicate functions for determining the existiness and truthiness of values.
 * Borrowed from the book "Functional Javascript", pg.19
 */

var _ = require('lodash');

/**
 * Define the existence of something.
 * @param {*}
 * @returns {Boolean}
 *
 * JavaScript * has two values—null and undefined—that signify nonexistence.
 * Thus, existy * checks that its argument is neither of these things.
 */
var _existy = function existy(x) {
    return x != null;
};

/**
 * Determine if something should be considered a synonym for true.
 * @param {*}
 * @returns {Boolean}
 */
var _truthy = function truthy(x) {
    return (x !== false) && _existy(x);
};

/**
 * Check if a property exists on an object.
 * @param {string} prop -
 * @param {Object} obj -
 * @returns {Object}
 */
composableCheckNested = _.curry(function(prop, obj) {
    return _.reduce(prop.split('.'), function(o, p) {
        return !existy(o) ? o : o[p];
    }, obj);
});

/**
 * Check if an object contains a property.
 * @param {string} prop -
 * @param {Object} obj -
 * @returns {Boolean}
 */
var composableHas = _.curry(function(prop, obj) {
    return _.every(prop.split('.'), function(x) {

        // Explain this.
        if (typeof obj != 'object' || obj === null || ! x in obj) {
            return false;
        }
        obj = obj[x];
        return true;
    });
};

/**
 * Return a piece of an object.
 * @param {string} prop -
 * @param {Object} obj -
 * @returns {*}
 */
var composableGet = _.curry(function(prop, obj) {

    // If the object or the object.property aren't available, just return
    // nothing.
    if (_.isUndefined(obj)) {
        return;
    } else if (_.isUndefined(obj[prop])){
        return;
    } else {
        return obj[prop];
    }
});
