let Command = require('../../command');
let request = require('request');
require('dotenv').config();

let baseUrlSummonerId = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
let baseUrlSummonerData = "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/";

let baseUrlddragonCdn = "http://ddragon.leagueoflegends.com/cdn/";


let ddragonRiotCdn = {
    version: "9.21.1",
    image: {
        profileicon: "/img/profileicon/",
        extension: "png"
    }
};

const lol_summoner = new Command('lol:summoner', null, null);

lol_summoner.description = " ```Markdown \n **Usage:** " + Command.PREFIX + " lol summoner [summonerName]";

lol_summoner.action = function (bot, message, args) {

    if (typeof args !== 'undefined' && args.length == 1) {

        let urlSummonerId =  baseUrlSummonerId + args[0] + "?api_key=" + process.env.RIOT_GAMES_TOKEN;

        request(urlSummonerId, function (error, response, body) {
            if (response && response.statusCode == 200) {
                requestSummonderData(JSON.parse(body), bot, message);
            } else {
                console.log(error, response.statusCode);
                return null;
            }
        });
    }

};

function requestSummonderData(summonerInfo, bot, message)
{
    let urlSummonerData = baseUrlSummonerData + summonerInfo.id +"?api_key=" + process.env.RIOT_GAMES_TOKEN;
    request(urlSummonerData, function (errror, response, body) {
        formatMessageSummoner(JSON.parse(body), summonerInfo, bot, message);
    });
}

function formatMessageSummoner(summonerDataRank, summonerInfo, bot, message)
{
    let profileIcon = baseUrlddragonCdn + ddragonRiotCdn.version + ddragonRiotCdn.image.profileicon + summonerInfo.profileIconId + "." + ddragonRiotCdn.image.extension;

    console.log(summonerDataRank);
    message.channel.send("Level: " + summonerInfo.summonerLevel, {
        embed: {
            thumbnail: {
                url: profileIcon,
                height: 50,
                width: 50
            }
        }
    });


}


module.exports = lol_summoner;
