var should = require('chai').should();
var _ = require('lodash');
var get = require('../index');
var chalk = require('chalk');

// Fixtures
// ----------------------------------------------------------------------------
var find = require('./fixture').find;
var doNotFind = require('./fixture').doNotFind;

var getDesc = function(name) {
    return _.compose(
        get('desc'),
        _.partialRight(_.find, function(color) {
            return color.name === name;
        }),
        get('colors')
    );
};

// Tests, dawg
// ----------------------------------------------------------------------------
describe('#composableGet()', function() {

    it('should get properties', function() {
        get('colors')(find).should.have.length(2);
    });

    it('should be composable', function() {
        getDesc('red')(find).should.equal('I am the color used to indicate badness');
    });

    it('should not blow up if a search prop returns undefined', function() {

        // The outermost function returns 'undefined' when a prop isn't found.
        should.not.exist(getDesc('red')(doNotFind));
    });

    it('should explode', function() {
        get('colors')(find).should.have.length(1000);
    });
});
