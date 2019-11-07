const Discord = require('discord.js');
const bot = new Discord.Client();
const CommandParser = require('./commandParser')
const Command = require('./command.js');
require('dotenv').config();

bot.on('ready', () => {
    bot.user.setActivity("-oof help");
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

    let args = CommandParser.args(msg.content);

    if (args.length == 1 && args[0] === 'help') {
        msg.channel.send(command.embedDescription || "no description found");
        return;
    }

    command.action(bot, msg, args);
});


bot.login(process.env.TOKEN);