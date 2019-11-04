const Command = require('./command.js');

let request = require('request');

let randomUselessFactsCommand = new Command('facts', null, null);
randomUselessFactsCommand.description = " ```Markdown \n **Usage:** " + Command.PREFIX + " fact";
randomUselessFactsCommand.action = function () {
    request('https://uselessfacts.jsph.pl/random.json?language=en', function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
    })
};

modules.exports = randomUselessFactsCommand;