const fs = require('fs');

/**
 *
 * @name String Name of the command
 * @action Callback used to trigger command
 * @embedDescription RichEmbed description of the command with RichEmbed message type
 */
module.exports = class Command {

    constructor(name, action, embedDescription)
    {
        this.name = name;
        this.action = action
        this.embedDescription = embedDescription
    }

    static get PREFIX()
    {
        return "-oof";
    }

    static getCommandByName(name)
    {
        for(let i in commands) {
            let command = commands[i];
            if (command.name === name) {
                return command;
            }
        }

        return null;
    }

    // used for help command, we retrieve the string description of the current command from the RichEmbed message object
    getReadableDescription()
    {
        if (this.embedDescription !== null && this.embedDescription.description) {
            return this.embedDescription.description;
        }
    }

    static getCommands()
    {
        return commands;
    }

}

let commands = new Array();

fs.readdirSync(__dirname +"/commands/").forEach(commandsFolder => {

    fs.readdirSync(__dirname+ "/commands/" + commandsFolder).forEach(command => {
        let commandObj = require(__dirname+ "/commands/" + commandsFolder + "/" + command);
        if (command.toLowerCase().includes("command")) {
            commands.push(commandObj);
        }
    });
});

