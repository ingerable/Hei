let Command = require('../../command');
let request = require('request');
require('dotenv').config();

let baseUrlSummonerId = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
let baseUrlSummonerData = "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/";

const lol_summoner = new Command('lol:summoner', null, null);

lol_summoner.description = " ```Markdown \n **Usage:** " + Command.PREFIX + " lol summoner [summonerName]";

lol_summoner.action = function (bot, message, args) {

    if (typeof args !== 'undefined' && args.length == 1) {

        let urlSummonerId =  baseUrlSummonerId + args[0] + "?api_key=" + process.env.RIOT_GAMES_TOKEN;

        request(urlSummonerId, function (error, response, body) {
            if (response && response.statusCode == 200) {

                let urlSummonerData = baseUrlSummonerData + JSON.parse(body).id +"?api_key=" + process.env.RIOT_GAMES_TOKEN;
                request(urlSummonerData, function (errror, response, body) {
                    console.log(body);
                });

            } else {
                console.log(error, response.statusCode);
                return null;
            }
        });
    }

};


module.exports = lol_summoner;

// let urlSummonerData = baseUrlSummonerData + bodySumId.id + "?api_key=" + process.env.RIOT_GAMES_TOKEN;
// request(urlSummonerData, function (error, response, bodySumData) {
//     console.log(bodySumData);
// })