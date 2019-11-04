const fs = require('fs');

module.exports = class Command {

    constructor(name, action, description)
    {
        this.name = name;
        this.action = action
        this.description = description
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

}

let commands = new Array();

fs.readdirSync(__dirname +'/commands/').forEach(commandsFolder => {
    fs.readdirSync(__dirname+ '/commands/' + commandsFolder).forEach(command => {
        let commandObj = require(__dirname+ '/commands/' + commandsFolder + "/" + command);
        commands.push(commandObj);
    });
});

