let Command = require('../../command');
const Discord = require('discord.js');

const commandName = "help";

const helpCommand = new Command(commandName, null, null);



helpCommand.embedDescription =
    new Discord.RichEmbed()
        .setTitle(commandName)
        .setDescription(Command.PREFIX + " [commandName] [help]")
        .addField("Usage", Command.PREFIX + " " + commandName);

helpCommand.action = function (bot, message, args) {
    let messageContent = new Discord.RichEmbed()
        .setTitle("Help");

    Command.getCommands().forEach(function (command) {
        messageContent.addField(command.name, command.getReadableDescription())
    })

    message.channel.send(messageContent);
};

module.exports = helpCommand;