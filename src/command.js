const fs = require('fs');

class Command {

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

let commands = new Array(
    new Command("help",
        function (bot, message) {
            message.channel.send(
                ' ```Markdown\n' +
                '# MonText\n' +
                '``` '
            );
        }
));

fs.readdirSync(__dirname +'/commands/').forEach(file => {
    console.log(file);
});

module.exports = Command;
