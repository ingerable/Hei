let Command = require('../../command');
let request = require('request');
const Discord = require('discord.js');
require('dotenv').config();

// number of character for kitsu api, using in hard code so there is no need to fetch the whole collection and count it
const characterCount = 105772;
const animeCount = 14705;
const urlPrefix = "https://kitsu.io/api/edge/";

const commandName = "kitsu";
const kitsuCommand = new Command(commandName, null, null);

kitsuCommand.embedDescription = new Discord.RichEmbed()
    .setTitle(commandName)
    .setDescription("Random anime or manga character | Random anime")
    .addField("Usage", Command.PREFIX + " " + commandName + " anime")
    .addField("Usage", Command.PREFIX + " " + commandName + " character");

kitsuCommand.action = function (bot, message, args) {

    if (args[0] && args[0] === "anime") {
        requestRandomAnime(message, bot);
    } else if (args[0] && args[0] === "character") {
        requestRandomCharacter(message, bot);
    } else {
        message.channel.send(this.embedDescription)
        return;
    }
};


function requestRandomAnime(message, bot)
{
    let randomAnimeID = (Math.round(Math.random() * animeCount) + 1);
    let urlGetAnime = urlPrefix + "anime/" + randomAnimeID;

    request(urlGetAnime, function (error, response, body) {
        if (response && response.statusCode === 200 && body) {
            let arrayResponse = JSON.parse(body);
            message.channel.send(createEmbedKitsuAnimeMessage(arrayResponse.data));
        } else {
            console.log(error, response);
            if (response.statusCode == 404) {
                message.channel.send("please retry");
            }
            return;
        }
    })
}

function requestRandomCharacter(message, bot)
{
    let randomCharacterID = (Math.round(Math.random() * characterCount) + 1);
    let urlGetCharacterID = urlPrefix + "characters/" + randomCharacterID;

    request(urlGetCharacterID, function (error, response, body) {
        if (response && response.statusCode === 200 && body) {
            let arrayResponse = JSON.parse(body);
            message.channel.send(createEmbedKitsuCharacterMessage(arrayResponse.data));
        } else {
            console.log(error, response);
            return;
        }
    })
}

function createEmbedKitsuAnimeMessage(anime)
{
    let animeAttributes = anime.attributes;
    return new Discord.RichEmbed()
        .setTitle( (animeAttributes.titles.en_jp || " ") + " | " + (animeAttributes.titles.ja_jp || " "))
        .setDescription(animeAttributes.synopsis || " ")
        .setImage(animeAttributes.coverImage ? animeAttributes.coverImage.original : " ")
        .setThumbnail(animeAttributes.posterImage ? animeAttributes.posterImage.small : " ")
        .addField("Start - End", (animeAttributes.startDate || "?") + " / " + (animeAttributes.endDate || "?"))
        .addField("Episodes", animeAttributes.episodeCount || "?")
        .addField("Average Rating", (animeAttributes.averageRating == " " ? (animeAttributes.averageRating + "/100") : "?"))
        .addField("Popularity Rank", animeAttributes.popularityRank || "?")
}

function createEmbedKitsuCharacterMessage(character)
{
    let characterAttributes = character.attributes;
    return new Discord.RichEmbed()
        .setTitle((characterAttributes.names.en || "") + " | " + (characterAttributes.names.ja_jp || ""))
        .setImage(characterAttributes.image ? characterAttributes.image.original : "")
        .setDescription(characterAttributes.description);
}

module.exports = kitsuCommand;
