let Command = require('../../command');
let request = require('request');
let convert = require('xml-js');
let url = "https://gelbooru.com/index.php?page=dapi&s=post&q=index&tags=";

const gelbooru = new Command('gelbooru', null, null);

gelbooru.description = " ```Markdown \n **Usage:** " + Command.PREFIX + " gelbooru tag1 tag2 tag3 ...";

gelbooru.action = function (bot, message, args) {
    if (typeof args !== 'undefined' && args.length > 0) {

        for (let arg in args) {
            url += args[arg];
        }

        request(url, function (error, response, body) {
            let jsonResponse = convert.xml2json(body, {compact: true, spaces: 4});

            if (JSON.parse(jsonResponse).posts._attributes.count === '0') {
                message.channel.send("déso pas déso, j'ai rien trouvé ...");
                return;
            }

            console.log(JSON.parse(jsonResponse).posts._attributes.count);

            // if (response && response.statusCode === 200) {
            //     console.log(decodedBody);
            // } else if (response) {
            //     message.channel.send("Error");
            //     console.log(response.statusCode, error, response.body);
            // } else {
            //     console.log("response is null")
            // }
        });
    }
};

module.exports = gelbooru;

//&tags=arg1+arg2+arg3