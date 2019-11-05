let Command = require('../../command');
let request = require('request');

var urlParser = require('url');
const Discord = require('discord.js');
require('dotenv').config();

let baseUrl = "https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&api_key=" + process.env.GELBOORU_TOKEN + "&user_id=" + process.env.GELBOORU_USERID;
let baseRandomUrl = "https://gelbooru.com/index.php?page=post&s=random&api_key=" + process.env.GELBOORU_TOKEN + "&user_id=" + process.env.GELBOORU_USERID;
const commandName = "gelbooru";
const gelbooru = new Command(commandName, null, null);

gelbooru.embedDescription = new Discord.RichEmbed()
    .setTitle(commandName)
    .setDescription("Random picture (may be explicit) :thinking:")
    .addField("Usage", Command.PREFIX + " " + commandName + " [tags1 tags2 ...]");

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

    let rating = getRating(randomPictureAttributes.rating);
    let messageEmbed = new Discord.RichEmbed()
        .setTitle(rating.name)
        .setImage(randomPictureAttributes.file_url)
        .setColor(rating.color)
        .addField("Score",randomPictureAttributes.score)

    message.channel.send(messageEmbed);

}

function getRating(rating)
{
    if (rating === 's') {
        return {
            name: "Safe :innocent:",
            color: "#5cff02"
        };
    } else if (rating === 'q') {
        return {
            name: "Questionnable :thinking:",
            color: "#ff6805"
        };
    } else if (rating === 'e') {
        return {
            name: "Explicit (oof) :scream:",
            color: "#ff0000"
        };
    } else {
        return {
            name: 'Rating unknow',
            color: "#faf1ff"
        };
    }
}

module.exports = gelbooru;
