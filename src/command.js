class Command {

    constructor(name, action, description)
    {
        this.name = name.toLowerCase();
        this.action = action
        this.description = description
    }

    static get PREFIX()
    {
        return "hei:";
    }

    static getCommandByName(name)
    {
        for(let i in commands) {
            let command = commands[i];
            if (command.name === name.toLowerCase()) {
                return command;
            }
        }
    }

}

let commands = new Array(
    new Command("test1",
        function () {

        },
        "desc1"),
    new Command("test2",
        function () {

        },
        "desc1")
);

module.exports = Command;
