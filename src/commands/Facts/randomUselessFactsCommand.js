let Command = require('../../command');
let request = require('request');
const Discord = require('discord.js');

let url = "https://uselessfacts.jsph.pl/random.json?language=en"
const commandName = "fact";

const randomUselessFactsCommand = new Command(commandName, null, null);

randomUselessFactsCommand.description =
    new Discord.RichEmbed()
        .setTitle(commandName)
        .setDescription("Useless important fact")
        .addField("Usage", Command.PREFIX + " " + commandName);

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