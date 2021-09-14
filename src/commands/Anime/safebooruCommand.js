let Command = require('../../command');
let request = require('request');
let Booru = require('./Booru');

var urlParser = require('url');
const Discord = require('discord.js');
require('dotenv').config();



const commandName = "safebooru";
const safebooru = new Command(commandName, null, null);

safebooru.embedDescription = new Discord.RichEmbed()
    .setTitle(commandName)
    .setDescription("Random picture :thinking:")
    .addField("Usage", Command.PREFIX + " " + commandName + " [tags1 tags2 ...]");

safebooru.action = function (bot, message, args) {
	let baseRandomUrl = "https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1";
	let baseUrl = "https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1";

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
		console.log(randomPictureAttributes)
    if (randomPictureAttributes === undefined) {
        console.log("randomPictureIndex:" + randomPictureIndex, "randomPictureAttributes.length:" + randomPictureAttributes)
        return;
    }

    message.channel.send(Booru.createEmbedMessage(randomPictureAttributes));
}


module.exports = safebooru;
