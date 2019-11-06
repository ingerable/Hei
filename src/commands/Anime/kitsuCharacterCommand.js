let Command = require('../../command');
let request = require('request');
const Discord = require('discord.js');
require('dotenv').config();

// number of character for kitsu api, using in hard code so there is no need to fetch the whole collection and count it
const characterCount = 105772;
const urlPrefix = "https://kitsu.io/api/edge/";

const commandName = "kitsuCharacter";
const kitsuCharacter = new Command(commandName, null, null);

kitsuCharacter.embedDescription = new Discord.RichEmbed()
    .setTitle(commandName)
    .setDescription("Random anime or manga character")
    .addField("Usage", Command.PREFIX + " " + commandName);

kitsuCharacter.action = function (bot, message, args) {

    let randomCharacterUrl = urlPrefix + "characters/" + (Math.round(Math.random() *105772) + 1);

    request(randomCharacterUrl, function (error, response, body) {
        if (response && response.statusCode === 200 && body) {
            let arrayResponse = JSON.parse(body);
            message.channel.send(createEmbedKitsuCharacterMessage(arrayResponse.data));
        } else {
            console.log(error, response);
            return;
        }

    })
};

function createEmbedKitsuCharacterMessage(character)
{
    let characterAttributes = character.attributes;
    console.log(characterAttributes.)
    let embedMessage = new Discord.RichEmbed();
    return embedMessage
        .setTitle((characterAttributes.names.en || "") + " | " + (characterAttributes.names.ja_jp || ""))
        .setImage(characterAttributes.image ? characterAttributes.image.original : "")
        .setDescription(characterAttributes.description);
}

module.exports = kitsuCharacter;
