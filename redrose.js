// This software is part of the RedRose Discord Server | https://discord.gg/jT3XRkD //

// || RedRose Discord Bot v0.1 || //

// Webhook test commit //
var Emote = require("./emote")
var MOD = require("./moderation")
var BLOCK = require("./BLOCK")
var VRC = require("./vrchat")
var EVENTS = require("./events")
const headers = { 'Content-Type': 'application/json' }
const Discord = require('discord.js')
const fetch = require('node-fetch')
let io = require('console-read-write')
let btoa = require("btoa")
const Canvas = require("canvas")
let globalrank = null
let user = null
const cheweyBotAnalyticsAPI = require("discord-bot-analytics")
var mysql = require('mysql')





const {

    prefix,
    token,
    discordColors,
    giphy_apiKey,
    analytics_api,
    sqlHost,
    sqlUser,
    sqlPW,
    sqlDB
} = require('./config.json')



/*
con.connect(function(err) {
    if (err) throw err;
    let user = '164382979550871553'
    let messageCount = '1000000000'
    con.query(`INSERT INTO user (ID, userID, messageCount, joinedAt) VALUES (1, ${user}, ${messageCount}, null)`)
    console.log("Connected to RedRose Database!");
});
*/


const apiKey = giphy_apiKey

const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION'] })
const customAnalytics = new cheweyBotAnalyticsAPI(analytics_api, client)
    //const weirdchamp = client.emojis.get("305818615712579584")

global.globalStoreReaction = null;
global.globalStoreReactionAuthor = null;
global.emojiUser = null;
global.iterator = 0;
global.reactionUsername = null;
global.tempUser = null;


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

            try {
                let coderun = false
                while (coderun == false) {
                    if (object['data'][random]['embed_url'] == undefined) {
                        message.reply("No image found")
                        random = Math.floor(Math.random() * 21)
                    } else if (object['data'][random]['embed_url'] != undefined) {
                        coderun = true
                    } else {
                        coderun = true
                        break
                    }
                }

                message.channel.send("I found the following image with a reference to " + params + " : " + "\n" + object['data'][random]['embed_url'])
            } catch (error) {
                message.channel.send(error)
            }
        })
}

const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    // Declare a base size of the font
    let fontSize = 70;

    do {
        // Assign the font to the context and decrement it so it can be measured again
        ctx.font = `${fontSize -= 10}px sans-serif`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return ctx.font;
};

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

const filter = (reaction, user) => {
    return reaction.emoji.name === '👌' && user.id === message.author.id;
};

client.on('messageReactionAdd', async(reaction, user) => {



    if (tempUser === null || tempUser != emojiUser) {
        iterator = 0
        tempUser = emojiUser
    }

    // When we receive a reaction we check if the reaction is partial or not
    if (reaction.partial) {
        // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
        try {
            await reaction.fetch();
        } catch (error) {
            console.log('Something went wrong when fetching the message: ', error);
            // Return as `reaction.message.author` may be undefined/null
            return;
        }

    }

    // Now the message has been cached and is fully available
    if (iterator > 3) {
        if (reaction.message.content === `.vote ${emojiUser}` && reaction.emoji.name === '👍' && emojiUser != null) {
            reaction.message.channel.send(`${user.username} voted with ✅!`)
        } else if (reaction.message.content === `.vote ${emojiUser}` && reaction.emoji.name === '👎' && emojiUser != null) {
            reaction.message.channel.send(`${user.username} voted with ❌!`)
        }
    }

    iterator = iterator + 1;

    //reaction.message.channel.reply(`${reaction.message.author}'s voted "${reaction.message.content}" gained a reaction!`)
    //console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
    // The reaction is now also fully available and the properties will be reflected accurately:
    //console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
});


client.on('message', async message => {




    let snowsChannel = client.channels.cache.get('709503032328585266')
    let cryptosChannel = client.channels.cache.get('709509572607475742')
    let threeChannel = client.channels.cache.get('709529194157047868')

    // anti https://cdn.discordapp.com/attachments/698561456354099250/709536153925320704/anti.PNG

    /*if (message.content.startsWith(`${prefix}`) != 1) {*/
    if (message.channel.id == snowsChannel) {
        if (message.author.bot) return
        let channel1 = cryptosChannel
        let channel2 = threeChannel
        let cont = message.content

        let messageEmbed = {
            "content": 'RedRose Partner Network',
            "title": `Redrose Partner Network | Message from ${message.author.username}\nSnow's Avatar Discord`,
            "description": `${cont}`,
            "url": "",
            "color": 15844367,
            "timestamp": Date.now(),
            "thumbnail": {
                "url": 'https://cdn.discordapp.com/attachments/657316440109744128/709536860015165461/image0.jpg',
            }
        }


        channel1.send({ embed: messageEmbed })
        channel2.send({ embed: messageEmbed })
        snowsChannel = null
        return
    }

    if (message.channel.id == cryptosChannel) {
        if (message.author.bot) return
        let channel1 = snowsChannel
        let channel2 = threeChannel
        let cont = message.content
        let messageEmbed = {
            "content": 'RedRose Partner Network',
            "title": `Redrose Partner Network | Message from ${message.author.username}\nRed Rose Discord`,
            "description": `${cont}`,
            "url": "",
            "color": 15844367,
            "timestamp": Date.now(),
            "thumbnail": {
                "url": 'https://cdn.discordapp.com/attachments/698561456354099250/709534313313468426/stock-red-rose-black-huawei-mate-rs-wallpaper-preview.jpg',
            }
        }
        channel1.send({ embed: messageEmbed })
        channel2.send({ embed: messageEmbed })
        cryptosChannel = null
        return
    }

    if (message.channel.id == threeChannel) {
        if (message.author.bot) return
        let channel1 = cryptosChannel
        let channel2 = snowsChannel
        let cont = message.content
        let messageEmbed = {
            "content": 'RedRose Partner Network',
            "title": `Redrose Partner Network | Message from ${message.author.username}\nANTI Discord`,
            "description": `${cont}`,
            "url": "",
            "color": 15844367,
            "timestamp": Date.now(),
            "thumbnail": {
                "url": 'https://cdn.discordapp.com/attachments/698561456354099250/709536153925320704/anti.PNG',
            }
        }
        channel1.send({ embed: messageEmbed })
        channel2.send({ embed: messageEmbed })
        cryptosChannel = null
        return
    }
    /*return
    }*/


    //let current_userperms = message.channel.cache.permissionsFor(message.member.cache).serialize(false)



    let sender = message.author.username


    const responseObject = {
        "ayy": "Ayy, lmao!",
        "wat": "Say what?",
        "lol": "rofl",
        "hi": "Hey " + message.author.username,
        "Hi": "Hello " + message.author.username,
        "Hello": "Hey :) " + message.author.username,
        "hello": "Hello " + message.author.username,
        "morning": "Good morning " + message.author.username,
        "lul": "lol",
        "moaning": "goood moooaaaning.."
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


    if (message.content.indexOf('yikes') != -1) {
        let yikes = message.guild.emojis.cache.get('701890977106886717')
        message.channel.send(`${yikes}`)
    }


    if (message.content.toLowerCase().indexOf('erp') != -1) {
        message.reply("NO ERP!")
        return
    }

    /*
    if (message.content.startsWith(`${prefix}bombneko`)) {
        let cont = message.content.slice(prefix.length).split(" ")
        let args = cont.slice(1)
        for (var i = 0; i < 40; i++) {
            message.channel.send(args[0] + ' when video?')
        }
        message.channel.send('Bombing successful. Thank you for using Cryptobomber 1.0')
    }
    */
    if (!message.content.startsWith(prefix) && (!responseObject[message.content])) return


    /* DEBUG INFORMATION GATHERING */
    /*
    if (message.content.startsWith(prefix)) {
        console.log('Command send by ' + sender)
        console.log('He has the following permissions: \n' + current_userperms)
    }
*/
    if (message.content.startsWith(prefix)) {
        console.log('Command send by ' + sender)
        console.log('He has the following permissions: \n')
            //let thisuserperms = await JSON.stringify(current_userperms)
            //console.log(thisuserperms)
        console.log('temp disabled')
    }

    if (message.content.startsWith(`${prefix}emojilist`)) {
        //let iterator = message.guild.emojis.cache.keys()

        //let emojioutput = []
        //let id = []
        ///emojioutput.push([message.guild.emojis.cache.map(g => g.name)])
        //id.push([message.guild.emojis.cache.map(g => g.id)])
        //console.log(emojioutput + id)
        let emojiArray = []
        let muchiArray = []
        let thirdArray = []

        let temparray = []
        let fourthArray = []
        let fifthArray = []
        let sixthArray = []
        let seventhArray = []

        message.guild.emojis.cache.forEach(element => {
            let emojiID = element.id
            let emojiFinal = message.guild.emojis.cache.get(`${element.id}`)
            let emojiName = element.name
            let emojiString = `ID: ${emojiID} \nName: ${emojiName} \nEmoji: ${emojiFinal}\n`
            temparray.push(emojiString)
        })

        temparray.join(",")

        for (var i = 0; i < 15; i++) {
            await emojiArray.push(temparray[i])
        }

        for (var i = 15; i < 30; i++) {
            await muchiArray.push(temparray[i])
        }

        for (var i = 30; i < 45; i++) {
            await thirdArray.push(temparray[i])
        }

        for (var i = 45; i < 60; i++) {
            await fourthArray.push(temparray[i])
        }

        for (var i = 60; i < 75; i++) {
            await fifthArray.push(temparray[i])
        }

        for (var i = 75; i < 90; i++) {
            await sixthArray.push(temparray[i])
        }

        for (var i = 90; i <= 100; i++) {
            await seventhArray.push(temparray[i])
        }

        if (temparray.length > 100) {
            message.reply(`Your Server has to much emojis? More then 100? How? Can't run command. Please contact coder.`)
        }

        if (temparray.length > 0 && temparray < 15) {
            message.channel.send(emojiArray)
        } else if (temparray.length >= 15 && temparray.length < 30) {
            message.channel.send(emojiArray)
            message.channel.send(muchiArray)
        } else if (temparray.length >= 30 && temparray.length < 45) {
            message.channel.send(emojiArray)
            message.channel.send(muchiArray)
            message.channel.send(thirdArray)
        } else if (temparray.length >= 45 && temparray.length < 60) {
            message.channel.send(emojiArray)
            message.channel.send(muchiArray)
            message.channel.send(thirdArray)
            message.channel.send(fourthArray)
        } else if (temparray.length >= 60 && temparray.length < 75) {
            message.channel.send(emojiArray)
            message.channel.send(muchiArray)
            message.channel.send(thirdArray)
            message.channel.send(fourthArray)
            message.channel.send(fifthArray)
        } else if (temparray.length >= 75 && temparray.length < 90) {
            message.channel.send(emojiArray)
            message.channel.send(muchiArray)
            message.channel.send(thirdArray)
            message.channel.send(fourthArray)
            message.channel.send(fifthArray)
            message.channel.send(sixthArray)
        } else if (temparray.length >= 90 && temparray.length < 100) {
            message.channel.send(emojiArray)
            message.channel.send(muchiArray)
            message.channel.send(thirdArray)
            message.channel.send(fourthArray)
            message.channel.send(fifthArray)
            message.channel.send(sixthArray)
            message.channel.send(seventhArray)
        } else if (temparray.length > 100) {
            message.reply(`Your Server has more then 100 Emoji's? How? Can't execute Command. Please contact coder.`)
        } else {
            message.reply(`Something went wrong. Make sure that you have custom Emoji's on your Server.`)
        }

        muchiArray = []
        emojiArray = []
        thirdArray = []
        fourthArray = []



    }

    /*
                for (var i = 0; i < message.guild.emojis.cache.size; i++) {
                    let thisEmoji = iterator.next().value
                    let emojiFinal = message.guild.emojis.cache.get(`${thisEmoji}`)
                        //message.channel.send(`Name: ${emojiName} + ID: ${thisEmoji} ` + `Emoji: ` + `${emojiFinal}`)
                        //let yikes = message.guild.emojis.cache.get('701890977106886717')
                        //message.channel.send(`${yikes}`)
                }
        */



    if (message.content.startsWith(`${prefix}image`)) {
        const image = message.content.split(' ')
        getRandomImage(message, image[1])
    } else if (message.content.startsWith(`${prefix}event`)) {
        EVENTS.triggerEvent(message)
    } else if (message.content.startsWith(`${prefix}channelcount`)) {
        let thisGuildObject = await client.guilds.cache.get('698150099603161199')
        let count = 0;
        await thisGuildObject.channels.cache.forEach(g => {
            count++
            console.log(client.channels.cache.get(g.id).name)
        })
        console.log(count)

        /*
                    client.guild.channels.cache.forEach(g => {
                        counter = couter + 1
                        console.log(g)
                    })
                    */
    } else if (responseObject[message.content]) {
        let snowsguild = client.guilds.cache.get('709330557267476490')
        if (message.channel.guild != snowsguild) {
            message.channel.send(responseObject[message.content])
        } else {
            return
        }

    } else if (message.content.startsWith(`${prefix}delete`)) {
        MOD.purgeMessages(message)
    } else if (message.content.startsWith(`${prefix}sendToAll`)) {
        if (message.author.id === '164382979550871553') {
            let cont = message.content.slice(prefix.length).split(' ')
            var args = cont.slice(1)
            message.guild.members.cache.forEach(user => {
                message.guild.members.cache.get(user.id).send(`${args.join(' ')}`).catch((error) => message.channel.send(`Can't send DM to ${user}!, ${error.message}`))
                message.channel.send(`Send message to ${user}`)
                    //console.log(user.id)
            })
        } else {
            message.reply('You are not authorized to use this command.')
        }
    } else if (message.content.startsWith(`${prefix}partner`)) {
        let cont = message.content.slice(prefix.length).split(" ")
        let args = cont.slice(1)
        if (args[0] == null) {
            message.reply('Please enter Partner')
        }
        let partner = message.mentions.users.first().id
        client.users.cache.get(partner).send(`Hey ${args[0]},\nRedRose wants to partner with your Discord Server! Do you accept?\nPlease send your answer to Crypto#5842\n\n -------------------------------------------------------------\n╔═════❁ ✛ ❁═════╗\n |         :rose: Red Rose :rose:       |\n╚═════❁ ✛ ❁═════╝\nInvite discord.gg/jT3XRkD\nBanner https://cdn.discordapp.com/attachments/697935278945468477/705369661109436446/Red_Rose_Black_Background.jpg\n╔                                                           ╗\n   Nice & Wholesome Community.\n   Assets Unity/Blender Sharing.\n   Helpful members and staff.\n   VRChat Pics & Vids.\n   Windex inside.\n   Own Discordbot.\n   Many Commands.\n   VRC User Search.\n   Custom Emotes.\n╰                                                          ┛\n-------------------------------------------------------------`).catch(() => message.reply("Can't send DM to your user!"))
    } else if (message.content.startsWith(`${prefix}sendToCrucifix`)) {
        let channel = client.channels.cache.get('692098886927515649')
        let cont = message.content.slice(prefix.length).split(" ")
        let args = cont.slice(1)
        channel.send(`Message from Redrose: ${args[0]}`)
    } else if (message.content.startsWith(`${prefix}vrcuser`)) {
        let cont = message.content.slice(prefix.length).split(" ")
        let args = cont.slice(1)
            //message.reply("this function is temporary deactivated")
        VRC.getByUserName(message, args[0])
    } else if (message.content.startsWith(`${prefix}vote`)) {




        const filter = (reaction, user) => {
            return reaction.emoji.name === '👌' && user.id === message.author.id;
        };

        const collector = message.createReactionCollector(filter, { time: 15000 });
        message.react('👍').then(() => message.react('👎'));

        collector.on('collect', (reaction, reactionCollector) => {
            console.log(`Collected ${reaction.emoji.name}`);
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });

        let cont = message.content.slice(prefix.length).split(" ")
        let args = cont.slice(1)

        emojiUser = args[0]
        message.channel.send(message.author.username + " started a new Vote! Should " + args[0] + " get access on the Asset Server?")
        message.channel.send("VOTE NOW!!!!")

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
        message.content.startsWith(`${prefix}slap`) ||
        message.content.startsWith(`${prefix}oniichan`) ||
        message.content.startsWith(`${prefix}rape`)) {
        let cont = message.content.slice(prefix.lenght).split(" ")
        let args = cont.slice(1)
        console.log(args[0])
        Emote.emotetype(client, message, args[0])
    } else if (message.content.startsWith(`${prefix}listServers`)) {
        const guildNames = client.guilds.cache.map(g => g.name).join("\n")

        client.guilds.cache.forEach(g => {
            let guildName = g.name
            let guildID = g.id
            let guildregion = g.region
            let guildOwnerID = g.ownerID

            message.channel.send(`GuildName: ${guildName} \nGuildID: ${guildID}\nGuildRegion: ${guildregion}\nGuildOwnerID:${guildOwnerID}`)
        })

        console.log(client.guilds.cache)
        message.reply(guildNames)
    } else if (message.content.startsWith(`${prefix}latestVRC`)) {
        if (message.member.roles.cache.find(r => r.name === "Server Booster")) {
            VRC.getLastestUploadedAvatars(message)
        } else {
            message.reply(" This command is only for Server-Booster. Please ask a booster to execute it or boost yourself. Thank you :)")
        }
    } else if (message.content.startsWith(`${prefix}blockinfo`)) {
        let cont = message.content.slice(prefix.length).split(" ")
        let args = cont.slice(1)
        BLOCK.halving(client, message, args[0])
    } else if (message.content.startsWith(`${prefix}vrcactive`)) {
        VRC.getActivePlayers(message)
    } else if (message.content.startsWith(`${prefix}countToThousand`)) {

        let countchannel = client.channels.cache.get('710494640595271682')
        console.log(countchannel)
        await countchannel.messages.fetch({ limit: 1 }).then(messages => {
                let lastMessage = messages.first();
                for (var i = parseInt(lastMessage.content) + 1; i <= 1000; i++) {
                    countchannel.send(`${i}`)
                }
                if (!lastMessage.author.bot) {
                    // The author of the last message wasn't a bot
                }
            })
            .catch(console.error);


    } else if (message.content.startsWith(`${prefix}getinvite`)) {
        let cont = message.content.slice(prefix.length).split(" ")
        let args = cont.slice(1)
        if (args[0] == null) {
            args[0] = message.guild.id
        }

        let guildID = args[0]
        let guild = client.guilds.cache.get(`${guildID}`)
        if (!guild) return message.reply(`The bot isn't in the guild with this ID`)

        guild.fetchInvites()
            .then(invites => message.channel.send('Found Invites:\n' + invites.map(invite => invite).join('\n')))
            .catch(err => message.reply(err.message))

    } else if (message.content.startsWith(`${prefix}help`)) {
        message.channel.send("Available Commands: " + "\n" + ".play <music> - spielt musik | .delete <anzahl> löscht die letzten bot nachrichten | .image <bild> - holt nen passendes gif")
    } else if (message.content.startsWith(`${prefix}`) && message.content.indexOf('emojilist') != 1) {
        message.channel.send('Your command is not valid.')
    }

})


client.on('guildMemberAdd', async member => {

    var con = mysql.createConnection({
        host: sqlHost,
        user: sqlUser,
        password: sqlPW,
        database: sqlDB
    });

    con.connect(function(err) {
        if (err) throw err;
        let user = member.id
        let messageCount = 0
        let joinedAt = member.joinedAt

        var date;
        date = joinedAt
        date = date.getUTCFullYear() + '-' + ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' + ('00' + date.getUTCDate()).slice(-2) + ' ' + ('00' + date.getUTCHours()).slice(-2) + ':' + ('00' + date.getUTCMinutes()).slice(-2) + ':' + ('00' + date.getUTCSeconds()).slice(-2);

        let cont = date.toString()
        let args = cont.split(' ')
        let username = member.user.username
        console.log(date)
        con.query(`INSERT INTO user (userID, messageCount, joinedAt, username) VALUES (${user}, ${messageCount}, "${args[0]}", "${username}")`)
            .then(() => con.end()).catch((err) => console.log(err.message));
        console.log("Connected to RedRose Database!");
    })


    const channel = member.guild.channels.cache.get('698150099603161202');
    if (!channel) return;
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./red.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Slightly smaller text placed above the member's display name
    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Welcome to RedRose,', canvas.width / 2.5, canvas.height / 3.5);

    // Add an exclamation point here and below
    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'red.png');
    try {
        channel.send(`Welcome to RedRose, ${member}!`, attachment);
    } catch (err) {
        console.error(err)
    }
});


client.login(token)

client.on('ready', async() => {

    let RedRoseDiscord = client.guilds.cache.get('698150099603161199')
    let membercountchannel = client.channels.cache.get('710174438368477194')
    let membercount = RedRoseDiscord.memberCount
    let boosterCount = 0

    await membercountchannel.setName(`Total Members: ${membercount}`)

    /*
        setInterval(async function() {
            await client.user.setActivity(`VRChat (${await VRC.getActivePlayersForBot()} Players)`, { type: 'PLAYING' })
                .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
                .catch(console.error);
        }, 30000)*/

    await client.user.setActivity(`Roses`, { type: 'LISTENING', url: 'https://open.spotify.com/track/0easEmosKkPhksg0qidzXo?si=Nsjlk1afQB-_lIGsJTii_w' })
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        .catch(console.error);

    let boosterRole = '702294533551030363'
    let usersInBoosterRole = []
    RedRoseDiscord.members.cache.forEach(async g => {
        if (g._roles.includes(boosterRole)) {
            await usersInBoosterRole.push(g.user.username)
        }
    })

    let i = 0
    var boosterChannelChange = setInterval(async function() {
        //get Channel to Change
        let testChannel = client.channels.cache.get('710171771365490734')
        let boosterCountChannel = client.channels.cache.get('710187321122619508')
        await testChannel.setName(`Booster: ${usersInBoosterRole[i]}`)
        await membercountchannel.setName(`Total Members: ${RedRoseDiscord.memberCount}`)
        await boosterCountChannel.setName(`Boosts: ${usersInBoosterRole.length}`)
        i++
        if (i >= usersInBoosterRole.length) {
            i = 0
        }
        /*await client.usgit ers.cache.forEach(g => {
            console.log(boosterRole.members.cache)
        })*/
    }, 10000)

})



client.once('ready', () => {
    console.log('Ready!')


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