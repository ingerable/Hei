const Discord = require('discord.js');
const seluj = new Discord.Client();
const CommandParser = require('./commandParser')
const Command = require('./command.js');
require('dotenv').config();


seluj.on('ready', () => {

});

seluj.on('message', msg => {

    if (CommandParser.prefixe(msg.content) !== Command.PREFIX) {
        return;
    }

    let command = Command.getCommandByName(CommandParser.command(msg.content));

});


seluj.login(process.env.TOKEN);