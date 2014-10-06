var parser = require('../index.js'),
    fixture = require('./fixture'),
    should = require('chai').should(),
    _ = require('lodash');

describe('gHoursParser', function() {

    describe('#parseHoursString()', function() {

        it('should return an array with a length > 0', function() {
            parser.test.parseHoursString(fixture.twentyFour).length.should.equal(7);
            parser.test.parseHoursString(fixture.amPm).length.should.equal(7);
        });

    });

    describe('#isPm()', function() {

        it('should return true when PM is passed', function() {
            parser.test.isPm(fixture.isPm).should.equal(true);
        });

        it('should return false when AM is passed', function() {
            parser.test.isPm('AM').should.equal(false);
        });

    });

    describe('#convertTo24Hour()', function() {

        it('should return an int', function() {
            parser.test.convertTo24Hour('AM', 10).should.equal(10);
        });

        it('should add 12 when PM', function() {
            parser.test.convertTo24Hour('PM', 0).should.equal(12);
        });

    });

    describe('#makeHoursObjs()', function() {

        it('should return an array of objects', function() {
            var withAmPm = parser.test.makeHoursObjs(fixture.makeHoursObjs1),
                withoutAmPm = parser.test.makeHoursObjs(fixture.makeHoursObjs1);

            _.isArray(withAmPm).should.equal(true);
            _.isArray(withoutAmPm).should.equal(true);
            _.isObject(withAmPm[0]).should.equal(true);
            _.isObject(withoutAmPm[0]).should.equal(true);
        });

    });

    describe('#parse()', function() {

        it('should return an object that has the expected data', function() {
            _.isEqual(parser.parse(fixture.amPm), fixture.parse).should.equal(true);
        });

    });

});
