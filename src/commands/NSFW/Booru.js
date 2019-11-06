const Discord = require('discord.js');

/**
 *
 * @param postAttributes array containing interesting attributes of the post (name, file_url, score ...)
 * This function create an embed message based on given attributes and return it
 */
function createEmbedMessage(postAttributes)
{
    let rating = getRating(postAttributes.rating);

    let messageEmbed = new Discord.RichEmbed()
        .setTitle(rating.name)
        .setImage(postAttributes.file_url)
        .setColor(rating.color)
        .addField("Score",postAttributes.score)

    return messageEmbed;
}


/**
 *
 * @param rating
 * @returns {{color: string, name: string}}
 * the embed smiley are self explicit :)
 */
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

module.exports =  { getRating, createEmbedMessage }