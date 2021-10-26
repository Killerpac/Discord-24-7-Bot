---
title: Nino Bot
description: A 24/7 Discord bot For playing music
tags:
  - discord.js@13
  - javascript
---

# Nino Bot 

This starts Nino using [discord.js](https://discord.js.org/#/).

## ✨ Features

- Discord.js@13
- JavaScript
- Capable of Playing In Stage Channels
- Auto-Reconnect if disconnected
- Easy To Understand Code
- Capable Of Looping Songs in a Random Fashion
- Stops Playback When No One In Channel
- Simple Play Command

## 💁‍♀️ How to use


### Easily deploy to Heroku-
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
- Set the Environment Variables `TOKEN`,`CHANNEL`,`ID_CLIENT` in Heroku settings
- Optionally, add `LINKS`,`STATUS`,`TOPIC` to change the default values


### Alternatively, you can do it manually-
- Clone The Repo
- Install dependencies `npm i`
- Set the Environment Variables `TOKEN`,`CHANNEL`, `ID_CLIENT`
- Setup `LINKS`,`STATUS`,`TOPIC` in `config.js`
- Start Using `npm start`

## 📝 Notes

The server started launches a Discord bot with a couple of basic commands. The code is located at `src/index.js`.

Requires Discord.js@13 so You need to install it or else it won't run
Use `npm i discord.js@dev` To install discord.js@13 if Needed

Environment Variables are to be set by You.You Can also Create a .env File

`TOKEN` is the Discord Bot Token.
`CHANNEL` is the Discord Channel ID you want To play the Music in. [VOICE](https://discord.js.org/#/docs/main/master/class/VoiceChannel?scrollTo=id) or [STAGE](https://discord.js.org/#/docs/main/master/class/StageChannel?scrollTo=id)
`ID_CLIENT` is the [Application ID](https://discord.com/developers/docs/topics/oauth2).
