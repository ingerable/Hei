let Command = require('../../command');
let request = require('request');
require('dotenv').config();

let baseUrl = "https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&api_key=" + process.env.GELBOORU_TOKEN + "&user_id=" + process.env.GELBOORU_USERID;
const gelbooru = new Command('gelbooru', null, null);

gelbooru.description = " ```Markdown \n **Usage:** " + Command.PREFIX + " gelbooru tag1 tag2 tag3 ...";

gelbooru.action = function (bot, message, args) {
    if (typeof args !== 'undefined' && args.length > 0) {

        //init requested url with baseurl
        let url = baseUrl;

        //concatenate tags
        url += "&tags=";
        for (let arg in args) {
            url += args[arg] + "+";
        }

        request(url, function (error, response, body) {
            if (!body) {
                message.channel.send("déso pas déso, j'ai rien trouvé ...");
                return;
            }

            let arrayResponse = JSON.parse(body);
            let randomPictureIndex = Math.floor(Math.random() * arrayResponse.length) + 1;
            let randomPictureAttributes = arrayResponse[randomPictureIndex];

            message.channel.send("**Score**: " + randomPictureAttributes.score +
                "\n" + "**"  +getRatingName(randomPictureAttributes.rating) + "**" +
                "\n" + randomPictureAttributes.file_url);
        });
    }
};

function getRatingName(rating)
{
    if (rating === 's') {
        return 'Safe';
    } else if (rating === 'q') {
        return 'Questionnable';
    } else if (rating === 'e') {
        return 'Explicit (oof)';
    } else {
        return 'Rating unknow';
    }
}

module.exports = gelbooru;
