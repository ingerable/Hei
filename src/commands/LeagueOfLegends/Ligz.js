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

function getSummonerInfoByName(name, callback) {

    let urlSummonerId =  baseUrlSummonerId + name + "?api_key=" + process.env.RIOT_GAMES_TOKEN;

    request(urlSummonerId, function (error, response, body) {
        if (response && response.statusCode == 200) {
            let summonerInfo = JSON.parse(body);
            summonerInfo["profileIcon"] = baseUrlddragonCdn + ddragonRiotCdn.version + ddragonRiotCdn.image.profileicon + summonerInfo.profileIconId + "." + ddragonRiotCdn.image.extension;
            callback(summonerInfo);
        } else {
            console.log(error, response.statusCode);
        }
    });
};

function getSummonerRankingByName(name, callback) {

    getSummonerInfoByName(name, function (summonerInfo) {
        let urlSummonerData = baseUrlSummonerData + summonerInfo.id +"?api_key=" + process.env.RIOT_GAMES_TOKEN;
        request(urlSummonerData, function (errror, response, body) {
            let summonerRankingInfo = JSON.parse(body);
            summonerRankingInfo.forEach( function (rankingQueue) {
                rankingQueue.color = ranks[rankingQueue.tier].color;
                rankingQueue.iconUrl = ranks[rankingQueue.tier].iconUrl;
                rankingQueue.iconName = ranks[rankingQueue.tier].iconName;
            });
            callback(summonerRankingInfo);
        });
    })
}



let ranks = {
    "IRON": {
        color: "#5B5354",
        iconUrl: "./ressources/LeagueOfLegends/ranked-emblem/Emblem_Iron.png",
        iconName: "Emblem_Iron"
    },
    "BRONZE": {
        color: "#512f09",
        iconUrl: "./ressources/LeagueOfLegends/ranked-emblem/Emblem_Bronze.png",
        iconName: "Emblem_Bronze"
    },
    "SILVER": {
        color: "#96B0BA",
        iconUrl: "./ressources/LeagueOfLegends/ranked-emblem/Emblem_Silver.png",
        iconName: "Emblem_Silver"
    },
    "GOLD": {
        color: "#D9B019",
        iconUrl: "./ressources/LeagueOfLegends/ranked-emblem/Emblem_Gold.png",
        iconName: "Emblem_Gold"
    },
    "PLATINUM": {
        color: "#00DB5F",
        iconUrl: "./ressources/LeagueOfLegends/ranked-emblem/Emblem_Platinum.png",
        iconName: "Emblem_Platinum"
    },
    "DIAMOND": {
        color: "#471F74",
        iconUrl: "./ressources/LeagueOfLegends/ranked-emblem/Emblem_Diamond.png",
        iconName: "Emblem_Diamond"
    },
    "MASTER": {
        color: "#A60002",
        iconUrl: "./ressources/LeagueOfLegends/ranked-emblem/Emblem_Master.png",
        iconName: "Emblem_Master"
    },
    "GRANDMASTER": {
        color: "#FBF5DC",
        iconUrl: "./ressources/LeagueOfLegends/ranked-emblem/Emblem_Grandmaster.png",
        iconName: "Emblem_Grandmaster"
    }
};


module.exports = { getSummonerInfoByName, getSummonerRankingByName}