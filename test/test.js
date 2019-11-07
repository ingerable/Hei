import describe from "mocha";
let assert = require('chai').assert
    , foo = 'bar'
    , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

let commandParser = require('../src/commandParser');
let command = require('../src/command');

describe('commandParser', function () {
    let command1 = "-oof myCommand arg1 arg2 arg3";
    it('should return oof', function () {
        assert(commandParser.prefix(command1) === '-oof');
    });

    it('should return myCommand', function () {
        assert(commandParser.command(command1) === 'myCommand')
    });

    it('should return [arg1, arg2, arg3]', function () {
        assert.deepEqual(commandParser.args(command1),['arg1','arg2','arg3'])
    });
});


