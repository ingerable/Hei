const Discord = require('discord.js');
const bot = new Discord.Client();
const CommandParser = require('./commandParser')
const Command = require('./command.js');
require('dotenv').config();


bot.on('ready', () => {

});

bot.on('message', msg => {

    if (CommandParser.prefix(msg.content) !== Command.PREFIX) {
        return;
    }

    let command = Command.getCommandByName(CommandParser.command(msg.content));

    if (command === null) {
        msg.channel.send("command not found (fais pas le malin)");
        return;
    }

    command.action(bot, msg);
});


bot.login(process.env.TOKEN);