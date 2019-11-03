class Command {

    constructor(name, action, description)
    {
        this.name = name;
        this.action = action
        this.description = description
    }

    static get PREFIX()
    {
        return "oof:";
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
            message.channel.send("test");
        },
        ""),
    new Command("test2",
        function () {

        },
        "desc1")
);

module.exports = Command;
