// This software is part of the RedRose Discord Server | https://discord.gg/jT3XRkD //

// || RedRose Discord Bot v0.1 || //

// Webhook test commit //
var Emote = require("./emote")
var MOD = require("./moderation")
var BLOCK = require("./BLOCK")
var VRC = require("./vrchat")
const headers = { 'Content-Type': 'application/json' }
const Discord = require('discord.js')
const fetch = require('node-fetch')
let io = require('console-read-write')
let btoa = require("btoa")
let globalrank = null
let user = null
const cheweyBotAnalyticsAPI = require("discord-bot-analytics")



const {

    prefix,
    token,
    discordColors,
    giphy_apiKey,
    analytics_api

} = require('./config.json')

const apiKey = giphy_apiKey

const client = new Discord.Client()

const customAnalytics = new cheweyBotAnalyticsAPI(analytics_api, client)
    //const weirdchamp = client.emojis.get("305818615712579584")


async function getRandomImage(message, params) {
    let apiURL = "https://api.giphy.com/v1/gifs/search?limit=20&offset=0&q=" + params + apiKey
    console.log(apiURL)

    await fetch(apiURL, { method: "GET", headers: headers })
        .then((resp) => resp.json())
        .then((object) => {


            //message.channel.send("DEBUG INFO: The limit is 20 and i got " + object['data'].length + " objects.")



            let random = Math.floor(Math.random() * 21)

            if (object['data'].length < 20) {
                random = Math.floor(Math.random() * (object['data'].length))
            }

            let coderun = false
            while (coderun == false) {
                if (object['data'][random]['embed_url'] === undefined) {
                    console.log("Something was wrong")
                    random = Math.floor(Math.random() * 21)
                } else if (object['data'][random]['embed_url'] != undefined) {
                    coderun = true
                } else {
                    coderun = true
                    break
                }
            }
            try {
                message.channel.send("I found the following image with a reference to " + params + " : " + "\n" + object['data'][random]['embed_url'])
            } catch (error) {
                message.channel.send(error)
            }
        })
}


async function dobruh(message) {
    let offsetRandomize = Math.floor(Math.random() * 10)

    while (offsetRandomize > 5) {
        offsetRandomize = Math.floor(Math.random() * 10)
    }

    let apiURL = "https://api.giphy.com/v1/gifs/search?limit=20&offset=" + offsetRandomize + "&q=" + "bruh" + apiKey
    console.log(apiURL)

    await fetch(apiURL, { method: "GET", headers: headers })
        .then((resp) => resp.json())
        .then((object) => {


            //message.channel.send("DEBUG INFO: The limit is 20 and i got " + object['data'].length + " objects.")






            let random = Math.floor(Math.random() * 21)

            if (object['data'].length < 20) {
                random = Math.floor(Math.random() * (object['data'].length))
            }

            let coderun = false
            while (coderun == false) {
                if (object['data'][random]['embed_url'] === undefined) {
                    console.log("Something was wrong")
                    random = Math.floor(Math.random() * 21)
                } else if (object['data'][random]['embed_url'] != undefined) {
                    coderun = true
                } else {
                    coderun = true
                    break
                }
            }
            try {
                message.channel.send(object['data'][random]['embed_url'])
            } catch (error) {
                message.channel.send(error)
            }
        })
}


async function dotrigger(message) {
    let offsetRandomize = Math.floor(Math.random() * 10)

    while (offsetRandomize > 5) {
        offsetRandomize = Math.floor(Math.random() * 10)
    }

    let apiURL = "https://api.giphy.com/v1/gifs/search?limit=20&offset=" + offsetRandomize + "&q=" + "triggered" + apiKey
    console.log(apiURL)

    await fetch(apiURL, { method: "GET", headers: headers })
        .then((resp) => resp.json())
        .then((object) => {


            //message.channel.send("DEBUG INFO: The limit is 20 and i got " + object['data'].length + " objects.")






            let random = Math.floor(Math.random() * 21)

            if (object['data'].length < 20) {
                random = Math.floor(Math.random() * (object['data'].length))
            }

            let coderun = false
            while (coderun == false) {
                if (object['data'][random]['embed_url'] === undefined) {
                    console.log("Something was wrong")
                    random = Math.floor(Math.random() * 21)
                } else if (object['data'][random]['embed_url'] != undefined) {
                    coderun = true
                } else {
                    coderun = true
                    break
                }
            }
            try {
                message.channel.send(object['data'][random]['embed_url'])
            } catch (error) {
                message.channel.send(error)
            }
        })
}




client.on('message', async message => {


    let current_userperms = await message.channel.permissionsFor(message.member).serialize(false)


    let sender = message.author.username


    const responseObject = {
        "ayy": "Ayy, lmao!",
        "wat": "Say what?",
        "lol": "rofl"
    }

    if (message.author.bot) return


    switch (message.content) {
        case "bruh":
            dobruh(message)
            return
    }



    if (message.content === "bruh") {
        dobruh(message)
        return
    }

    if (message.content.indexOf('triggered') != -1) {
        dotrigger(message)
        return
    }


    if (!message.content.startsWith(prefix) && (!responseObject[message.content])) return


    /* DEBUG INFORMATION GATHERING */
    if (message.content.startsWith(prefix)) {
        console.log('Command send by ' + sender)
        console.log('He has the following permissions: \n' + current_userperms)
    }

    if (message.content.startsWith(`${prefix}image`)) {
        const image = message.content.split(' ')
        getRandomImage(message, image[1])
    } else if (message.content.startsWith(`${prefix}emojilist`)) {
        const emojiList = message.guild.emojis.map(e => e.toString()).join(" ")
        message.channel.send(`${emojiList}`)
    } else if (responseObject[message.content]) {
        message.channel.send(responseObject[message.content])
    } else if (message.content.startsWith(`${prefix}delete`)) {
        MOD.purgeMessages(message)
    } else if (message.content.startsWith(`${prefix}vrcuser`)) {
        let cont = message.content.slice(prefix.length).split(" ")
        let args = cont.slice(1)
            //message.reply("this function is temporary deactivated")
        VRC.getByUserName(message, args[0])
    } else if (message.content.startsWith(`${prefix}ban`) || message.content.startsWith(`${prefix}kick`)) {
        let cont = message.content.slice(prefix.length).split(" ")
        let args = cont.slice(1)
        MOD.moderation(client, message, args[0])
    } else if (message.content.startsWith(`${prefix}btc`)) {
        let cont = message.content.slice(prefix.length).split(" ")
        let args = cont.slice(1)
        BLOCK.btc_current_price(client, message, args[0])
    } else if (message.content.startsWith(`${prefix}invite`)) {
        client.generateInvite(['ADMINISTRATOR'])
            .then(link => message.reply(`Bottie generated an invite link for you, uwu: ${link}`))
            .catch(console.error)
    } else if (message.content.startsWith(`${prefix}cry`)) {
        params = "cry"
        action = " is crying "
        extra = "why "

        var today = new Date()
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        var dateTime = date + ' ' + time

        let offsetRandomize = Math.floor(Math.random() * 10)

        while (offsetRandomize > 5) {
            offsetRandomize = Math.floor(Math.random() * 10)
        }


        let colorRandomize = Math.floor(Math.random() * 24)
        while (colorRandomize > 23) {
            colorRandomize = Math.floor(Math.random() * 24)
        }

        let random = Math.floor(Math.random() * 21)
        let color = discordColors[colorRandomize]
        let apiURL = "https://api.giphy.com/v1/gifs/search?limit=20&offset=" + offsetRandomize + "&q=" + params + apiKey

        await fetch(apiURL, { method: "GET", headers: headers })
            .then((resp) => resp.json())
            .then((object) => {


                //message.channel.send("DEBUG INFO: The limit is 20 and i got " + object['data'].length + " objects.")




                if (object['data'].length < 20) {
                    random = Math.floor(Math.random() * (object['data'].length))
                }

                let coderun = false
                while (coderun == false) {
                    if (object['data'][random]['embed_url'] === undefined) {
                        console.log("Something was wrong")
                        random = Math.floor(Math.random() * 21)
                    } else if (object['data'][random]['images']['original']['url'] != undefined) {
                        coderun = true
                    } else {
                        coderun = true
                        break
                    }
                }

                try {

                    let url = object['data'][random]['images']['original']['url']

                    let cuddleEmbed = {
                        "content": params,
                        "title": message.member.user.tag + action,
                        "description": extra,
                        "url": "",
                        "color": color,
                        "timestamp": dateTime,
                        "image": {
                            "url": url
                        }
                    }

                    //channel.send({ embed: cuddleEmbed })
                    message.channel.send({ embed: cuddleEmbed })
                } catch (error) {
                    message.channel.send(error.message)
                }
            })
    } else if (message.content.startsWith(`${prefix}rage`)) {
        params = "rage"
        action = " is raging "
        extra = "yo i'm fkin angry.."


        var today = new Date()
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        var dateTime = date + ' ' + time

        let offsetRandomize = Math.floor(Math.random() * 10)

        while (offsetRandomize > 5) {
            offsetRandomize = Math.floor(Math.random() * 10)
        }


        let colorRandomize = Math.floor(Math.random() * 24)
        while (colorRandomize > 23) {
            colorRandomize = Math.floor(Math.random() * 24)
        }

        let random = Math.floor(Math.random() * 21)
        let color = discordColors[colorRandomize]
        let apiURL = "https://api.giphy.com/v1/gifs/search?limit=20&offset=" + offsetRandomize + "&q=" + params + apiKey

        await fetch(apiURL, { method: "GET", headers: headers })
            .then((resp) => resp.json())
            .then((object) => {


                //message.channel.send("DEBUG INFO: The limit is 20 and i got " + object['data'].length + " objects.")




                if (object['data'].length < 20) {
                    random = Math.floor(Math.random() * (object['data'].length))
                }

                let coderun = false
                while (coderun == false) {
                    if (object['data'][random]['embed_url'] === undefined) {
                        console.log("Something was wrong")
                        random = Math.floor(Math.random() * 21)
                    } else if (object['data'][random]['images']['original']['url'] != undefined) {
                        coderun = true
                    } else {
                        coderun = true
                        break
                    }
                }

                try {

                    let url = object['data'][random]['images']['original']['url']

                    let cuddleEmbed = {
                        "content": params,
                        "title": message.member.user.tag + action,
                        "description": extra,
                        "url": "",
                        "color": color,
                        "timestamp": dateTime,
                        "image": {
                            "url": url
                        }
                    }

                    //channel.send({ embed: cuddleEmbed })
                    message.channel.send({ embed: cuddleEmbed })
                } catch (error) {
                    message.channel.send(error.message)
                }
            })
    } else if (message.content.startsWith(`${prefix}cuddle`) ||
        message.content.startsWith(`${prefix}lick`) ||
        message.content.startsWith(`${prefix}hug`) ||
        message.content.startsWith(`${prefix}lewd`) ||
        message.content.startsWith(`${prefix}bite`) ||
        message.content.startsWith(`${prefix}gay`) ||
        message.content.startsWith(`${prefix}kiss`) ||
        message.content.startsWith(`${prefix}love`) ||
        message.content.startsWith(`${prefix}rape`)) {
        let cont = message.content.slice(prefix.lenght).split(" ")
        let args = cont.slice(1)
        console.log(args[0])
        Emote.emotetype(client, message, args[0])
    } else if (message.content.startsWith(`${prefix}blockinfo`)) {
        let cont = message.content.slice(prefix.length).split(" ")
        let args = cont.slice(1)
        BLOCK.halving(client, message, args[0])
    } else if (message.content.startsWith(`${prefix}vrcactive`)) {
        VRC.getActivePlayers(message)
    } else if (message.content.startsWith(`${prefix}help`)) {
        message.channel.send("Available Commands: " + "\n" + ".play <music> - spielt musik | .delete <anzahl> löscht die letzten bot nachrichten | .image <bild> - holt nen passendes gif")
    } else {
        message.channel.send('Your command is not valid brah.')
    }

})


client.login(token)

client.once('ready', () => {
    console.log('Ready!')
    setTimeout(function() {
        for (var i = 0; i < client.guilds.length(); i++)
            console.log(client.guilds[i]);
    }, 500);
})
client.once('reconnecting', () => {
    console.log('Reconnecting!')
})
client.once('disconnect', () => {
    console.log('Disconnect!')
})


// DISCORD JS EMBED COLORS 
/*
DEFAULT: 0,
AQUA: 1752220,
GREEN: 3066993,
BLUE: 3447003,
PURPLE: 10181046,
GOLD: 15844367,
ORANGE: 15105570,
RED: 15158332,
GREY: 9807270,
DARKER_GREY: 8359053,
NAVY: 3426654,
DARK_AQUA: 1146986,
DARK_GREEN: 2067276,
DARK_BLUE: 2123412,
DARK_PURPLE: 7419530,
DARK_GOLD: 12745742,
DARK_ORANGE: 11027200,
DARK_RED: 10038562,
DARK_GREY: 9936031,
LIGHT_GREY: 12370112,
DARK_NAVY: 2899536,
LUMINOUS_VIVID_PINK: 16580705,
DARK_VIVID_PINK: 12320855
*/