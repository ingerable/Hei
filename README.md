# Oof discord bot

Discord bot with multiple purposes

## Commands

#### Requirement for command creation

* src/commands/anySubfolder/nameCommand.js 
<br> (name of file must contains "command" !)
* The JS file must export a [Command](https://github.com/ingerable/Oof-Discord-Bot/blob/master/src/command.js) object 
* Please fill the different property of the [Command](https://github.com/ingerable/Oof-Discord-Bot/blob/master/src/command.js) based on other command object (see the comment above the class declaration)

### List of available commands

### Useless fact

#### Features
* -oof fact
Write an useless (important) fact in the channel the command was invoked

### Gelbooru

#### Features
Usage: -oof gelbooru tags1 tags2 tags3 ...

Provide random picture from gelbooru website (may be NSF). The image is in an embed message so it is deletable.


### Kitsu

### Features

*  -oof kitsu anime
Provide random anime, with its rating, number of episode, synopsis, poster image and end-start date

* -oof kitsu character
Provide random character, with its name and description


### League of legends

#### Features

* -oof lol:summoner [summonerName]

Provide ranking information for each queue of the summoner for the euw server (at the moment)

#### Issues
[summoner names with spaces not working](https://github.com/ingerable/Oof-Discord-Bot/issues/4)

