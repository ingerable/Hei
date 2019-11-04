let Command = require('../../command');
let request = require('request');
let url = "https://uselessfacts.jsph.pl/random.json?language=en"

const randomUselessFactsCommand = new Command('fact', null, null);

randomUselessFactsCommand.description = " ```Markdown \n **Usage:** " + Command.PREFIX + " fact";

randomUselessFactsCommand.action = function (bot, message, args) {
    request(url, function (error, response, body) {
        let decodedBody = JSON.parse(body);
        if (response && response.statusCode === 200) {
            message.channel.send(decodedBody.text);
        } else if (response) {
            message.channel.send("Error");
            console.log(response.statusCode, error, response.body);
        } else {
            console.log("response is null")
        }

    })
};

module.exports = randomUselessFactsCommand;