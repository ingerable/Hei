# Oof discord bot

## Commands

### Useless fact

Usage: -oof fact

### Gelbooru

Usage: -oof gelbooru tags1 tags2 tags3 ...

### League of legends WIP

mettre les infos des joueurs

-oof lol:summoner [summonerName]

* ajouter l'icone du joueur et de sa division <br>
[API RIOT](https://developer.riotgames.com/docs/lol#data-dragon_other)

* utiliser le CDN de l'api pour inclure les images + envoyer des messages avec des images en pièces jointes pour ne pas afficher l'hyperlien dans le discord
http://ddragon.leagueoflegends.com/cdn/9.21.1/img/profileicon/588.png

* générer une page html (template) à partir des données de l'invocateur puis convertir la page html en image et finalement l'envoyer sur discord
