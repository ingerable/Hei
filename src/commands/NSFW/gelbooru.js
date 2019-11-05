let Command = require('../../command');
let request = require('request');
var urlParser = require('url');
require('dotenv').config();

let baseUrl = "https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&api_key=" + process.env.GELBOORU_TOKEN + "&user_id=" + process.env.GELBOORU_USERID;
let baseRandomUrl = "https://gelbooru.com/index.php?page=post&s=random&api_key=" + process.env.GELBOORU_TOKEN + "&user_id=" + process.env.GELBOORU_USERID;
const gelbooru = new Command('gelbooru', null, null);

gelbooru.description = " ```Markdown \n **Usage:** " + Command.PREFIX + " gelbooru [tag1 tag2 tag3 ...]";

gelbooru.action = function (bot, message, args) {
    if (typeof args !== 'undefined') {

        //init requested url with baseurl
        let url = baseUrl;

        //random picture because there is not tags
        if (args.length === 0 ){
            //we make non api request to get a random post (random post is not available with api call so we have to do this:sad: )
            request(baseRandomUrl, function (e, response) {
                //then we retrieve the id of that post
                let idPost = urlParser.parse(response.request.uri.href, true).query.id;
                //and we make a real api url with the random id we retrived from the earlier request
                baseUrl += "&id="+idPost;
            })
            // nice we have tags ! lets add the tags to the url
        } else if (args.length > 0) {
            //concatenate tags
            url += "&tags=";
            for (let arg in args) {
                url += args[arg] + "+";
            }
        }

        request(url, function (error, response, body) {
            parseAndSend(error, response, body, message, bot);
        });
    }

    return;
};

function parseAndSend(error,response, body, message, bot)
{
    if (!body) {
        message.channel.send("déso pas déso, j'ai rien trouvé ...");
        return;
    }

    let arrayResponse = JSON.parse(body);
    let randomPictureIndex = Math.floor(Math.random() * arrayResponse.length);
    let randomPictureAttributes = arrayResponse[randomPictureIndex];
    if (randomPictureAttributes === undefined) {
        console.log("randomPictureIndex:" + randomPictureIndex, "randomPictureAttributes.length:" + randomPictureAttributes)
        return;
    }
    message.channel.send("**Score**: " + randomPictureAttributes.score +
        "\n" + "**"  +getRatingName(randomPictureAttributes.rating) + "**" +
        "\n" + randomPictureAttributes.file_url);
}
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
