// This software is part of the RedRose Discord Server | https://discord.gg/jT3XRkD //

// || RedRose Discord Bot v0.1 || //

// Webhook test commit //
var Emote = require("./emote")
var MOD = require("./moderation")
var BLOCK = require("./BLOCK")
var VRC = require("./vrchat")
var EVENTS = require("./events")
var get_proxy = require("./getproxy")
const headers = { 'Content-Type': 'application/json' }
const Discord = require('discord.js')
const fetch = require('node-fetch')
let io = require('console-read-write')
let btoa = require("btoa")
const Canvas = require("canvas")
let globalrank = null
let user = null
const fs = require('fs')
const db = require('quick.db')
const cheweyBotAnalyticsAPI = require("discord-bot-analytics")
const youtubedl = require('youtube-dl')
var mysql = require('mysql')
const checkProxy = require('check-proxy').check;




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


async function ytdl(message, args, callback) {
    var randomProxyArray = []
    await get_proxy.getData()
    await fs.readFile('./output.json', 'utf8', async(err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        //console.log('File data:', jsonString)

        randomProxyArray = await jsonString.split(',').slice(1)
	
	let rand = Math.floor(Math.random() * 101)
	console.log("I got random Proxy: " + randomProxyArray[rand])
        callback = randomProxyArray[rand]
        await setVideoProxy(randomProxyArray[rand], message, args)
    }, (callback => {
        console.log(callback);
    }));
}


async function setVideoProxy(proxy, message, args) {
    const video = youtubedl(args,
        // Optional arguments passed to youtube-dl.
        ['--proxy', 'http://' + proxy, '-x', '--audio-format', 'mp3'])
    console.log("Set Proxy " + proxy)

    video.on('info', function(info) {
        console.log('Download started')
        console.log('filename: ' + info._filename)
        console.log('size: ' + info.size)
    })

    video.pipe(fs.createWriteStream('myvideo.mp3'))
    video.on('end', function() {
        console.log("finished downloading");
        message.channel.send({
            files: ['./myvideo.mp3']
        }).catch((err) => message.channel.send(err.message))
    })
    video.on('error', function error(err, message) {
        message.channel.send(err.message)
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

    //console.log(user.username)
    //console.log(emojiUser)

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

    // add message count for user
    // create connection to database



    //Update XP for User message.author.id
    await db.add(`userInfo.${message.author.id}_xp`, 5)
    await db.add(`userInfo.${message.author.id}_messageCount`, 1)

    let currentXP = await db.get(`userInfo.${message.author.id}_xp`)


    //Check if Member is in RedRose Server

    //

    switch (currentXP) {
        case 200:
            message.channel.send(`Congratulations ${message.author}! You've just reached level 1!!`)
            await db.set(`userInfo.${message.author.id}_currentRank`, 1)
            break;
        case 350:
            message.channel.send(`Congratulations ${message.author}! You've just reached level 2!!`)
            await db.set(`userInfo.${message.author.id}_currentRank`, 2)
            break;
        case 500:
            message.channel.send(`Congratulations ${message.author}! You've just reached level 3!! How amaziing :)`)
            await db.set(`userInfo.${message.author.id}_currentRank`, 3)
            break;
        case 700:
            message.channel.send(`Congratulations ${message.author}! You've just reached level 4!! This is coool`)
            await db.set(`userInfo.${message.author.id}_currentRank`, 4)
            break;
        case 950:
            message.channel.send(`Congratulations ${message.author}! You have finally reached the max Rank 5!!`)
            message.channel.send(`We would like to award you for your activity. Please get in contact with one of the Admins.`)
            await db.set(`userInfo.${message.author.id}_currentRank`, 5)
            break;
        default:
            break;
    }


    var RedRoseDiscord = await client.guilds.cache.get(`698150099603161199`)
    let usrID = await message.author.id

    if (RedRoseDiscord.member(usrID)) {
        // ADD TO CURRENT RANK DISCORDRANK
        let currentRank = await db.get(`userInfo.${message.author.id}_currentRank`)
        console.log(currentRank)
        var currentRankRole = null
        let GuildMember = null
        switch (currentRank) {
            case 0:
                GuildMember = RedRoseDiscord.members.cache.get(message.author.id)
                console.log(GuildMember)
                currentRankRole = await RedRoseDiscord.roles.cache.get('712983986086871061')
                console.log(currentRankRole)
                await GuildMember.roles.add(currentRankRole)
                break
            case 1:
                GuildMember = RedRoseDiscord.members.cache.get(message.author.id)
                console.log(GuildMember)
                currentRankRole = await RedRoseDiscord.roles.cache.get('712984092920250408')
                console.log(currentRankRole)
                await GuildMember.roles.add(currentRankRole)
                break
            case 2:
                GuildMember = RedRoseDiscord.members.cache.get(message.author.id)
                console.log(GuildMember)
                currentRankRole = await RedRoseDiscord.roles.cache.get('712984120321376307')
                console.log(currentRankRole)
                await GuildMember.roles.add(currentRankRole)
                break
            case 3:
                GuildMember = RedRoseDiscord.members.cache.get(message.author.id)
                console.log(GuildMember)
                currentRankRole = await RedRoseDiscord.roles.cache.get('712984145436999733')
                console.log(currentRankRole)
                await GuildMember.roles.add(currentRankRole)
                break
            case 4:
                GuildMember = RedRoseDiscord.members.cache.get(message.author.id)
                console.log(GuildMember)
                currentRankRole = await RedRoseDiscord.roles.cache.get('712984168619048992')
                console.log(currentRankRole)
                await GuildMember.roles.add(currentRankRole)
                break
            case 5:
                GuildMember = RedRoseDiscord.members.cache.get(message.author.id)
                console.log(GuildMember)
                currentRankRole = await RedRoseDiscord.roles.cache.get('712984237837647973')
                console.log(currentRankRole)
                await GuildMember.roles.add(currentRankRole)
                break
            default:
                currentRankRole = null;
                break
        }
    }







    var SnowsDiscord = await client.guilds.cache.get(`709330557267476490`)


    /*} else if (SnowsDiscord.member(usrID)) {
        // ADD TO CURRENT RAKN DISCORDRANK         
    } else if (RedRoseDiscord.member(usrID) && SnowsDiscord.member(usrID)) {
        // WHEN IN BOTH ADD BOTH RANKS BASED ON GUILD
    }*/

    //release connnection

    console.log('connection released')
        //end connection




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
        if (message.author.id == '596495389256056862' || message.author.id == '646223466781081610') {
            message.reply("YES ERP!")
        } else {
            message.reply("NO ERP!")
        }
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
    if (!message.content.startsWith(prefix) && (!responseObject[message.content]) && (!message.content.startsWith(`!rank`))) return


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

        if (temparray.length > 0 && temparray.length < 15) {
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


    if (message.content.startsWith(`${prefix}ytdl`)) {
        let cont = message.content.slice(prefix.length).split(' ')
        var args = cont.slice(1)

        await ytdl(message, args[0])

    } else if (message.content.startsWith(`${prefix}image`)) {
        const image = message.content.split(' ')
        getRandomImage(message, image[1])
    } else if (message.content.startsWith(`${prefix}event`)) {
        EVENTS.triggerEvent(message)
    } else if (message.content.startsWith(`${prefix}resetmyxp`)) {
        await db.set(`userInfo.${message.author.id}_xp`, 0)
        await db.set(`userInfo.${message.author.id}_currentRank`, 0)
        await db.set(`userInfo.${message.author.id}_messageCount`, 0)
        await message.reply(`I've resetted your Ranking. Current Rank:` + db.get(`userInfo.${message.author.id}_currentRank`)) + ` Current XP: ` + db.get(`userInfo.${message.author.id}_xp`) + ` MessageCount: ` + db.get(`userInfo.${message.author.id}_messageCount`)
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
    } else if (message.content.startsWith(`${prefix}top10`)) {
        let resultArray = []

        //create embed

        let top10embed = {
            title: "Red Rose Top 10 Ranking",
            description: "Top 10 Users on the RedRose Ranking System:",
            fields: [{
                    name: 'Username',
                    value: await embedArrayNames[0],
                    inline: true,
                },
                {
                    name: 'UserID',
                    value: await embedArrayID[0],
                    inline: true,
                },
                {
                    name: 'Rank',
                    value: await embedArrayRanks[0] + `\n`,
                    inline: true,
                },
                {
                    name: 'Username',
                    value: await embedArrayNames[1],
                    inline: true,
                },
                {
                    name: 'UserID',
                    value: await embedArrayID[1],
                    inline: true,
                },
                {
                    name: 'Rank',
                    value: await embedArrayRanks[1] + `\n`,
                    inline: true,
                },
                {
                    name: 'Username',
                    value: await embedArrayNames[2],
                    inline: true,
                },
                {
                    name: 'UserID',
                    value: await embedArrayID[2],
                    inline: true,
                },
                {
                    name: 'Rank',
                    value: await embedArrayRanks[2] + `\n`,
                    inline: true,
                },
                {
                    name: 'Username',
                    value: await embedArrayNames[3],
                    inline: true,
                },
                {
                    name: 'UserID',
                    value: await embedArrayID[3],
                    inline: true,
                },
                {
                    name: 'Rank',
                    value: await embedArrayRanks[3] + `\n`,
                    inline: true,
                },
                {
                    name: 'Username',
                    value: await embedArrayNames[4],
                    inline: true,
                },
                {
                    name: 'UserID',
                    value: await embedArrayID[4],
                    inline: true,
                },
                {
                    name: 'Rank',
                    value: await embedArrayRanks[4] + `\n`,
                    inline: true,
                },
                {
                    name: 'Username',
                    value: await embedArrayNames[5],
                    inline: true,
                },
                {
                    name: 'UserID',
                    value: await embedArrayID[5],
                    inline: true,
                },
                {
                    name: 'Rank',
                    value: await embedArrayRanks[5] + `\n`,
                    inline: true,
                },
                {
                    name: 'Username',
                    value: await embedArrayNames[6],
                    inline: true,
                },
                {
                    name: 'UserID',
                    value: await embedArrayID[6],
                    inline: true,
                },
                {
                    name: 'Rank',
                    value: await embedArrayRanks[6] + `\n`,
                    inline: true,
                },
                {
                    name: 'Username',
                    value: await embedArrayNames[7],
                    inline: true,
                },
                {
                    name: 'UserID',
                    value: await embedArrayID[7],
                    inline: true,
                },
                {
                    name: 'Rank',
                    value: await embedArrayRanks[7] + `\n`,
                    inline: true,
                },
                {
                    name: 'Username',
                    value: await embedArrayNames[8],
                    inline: true,
                },
                {
                    name: 'UserID',
                    value: await embedArrayID[8],
                    inline: true,
                },
                {
                    name: 'Rank',
                    value: await embedArrayRanks[8] + `\n`,
                    inline: true,
                },
                {
                    name: 'Username',
                    value: await embedArrayNames[9],
                    inline: true,
                },
                {
                    name: 'UserID',
                    value: await embedArrayID[9],
                    inline: true,
                },
                {
                    name: 'Rank',
                    value: await embedArrayRanks[9],
                    inline: true,
                },
            ],
            timestamp: await new Date(),
        }

        await message.channel.send({ embed: top10embed })

    } else if (message.content.startsWith(`${prefix}delete`)) {
        MOD.purgeMessages(message)
    } else if (message.content.startsWith(`${prefix}rank`) || (message.content.startsWith(`!rank`))) {

        // Draw canvas for userRank Info



        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');


        var posX = 115,
            posY = canvas.height / 2.4,
            fps = 1000 / 200,
            procent = 0,
            oneProcent = 360 / 100
        let result = null
        let level = null

        let levelperProcent = null


        let maxexp = null



        if (db.get(`userInfo.${message.author.id}_xp`) >= 0 && db.get(`userInfo.${message.author.id}_xp`) <= 195) {
            maxexp = 195
            oneProcent = 1.846
            console.log("result: " + result)
            currentRankStrokeStyle = "#cd7f32"
        } else if (db.get(`userInfo.${message.author.id}_xp`) >= 200 && db.get(`userInfo.${message.author.id}_xp`) <= 345) {
            maxexp = 345
            oneProcent = 1.043
            console.log("result: " + result)
            currentRankStrokeStyle = "#cd7f32"
        } else if (db.get(`userInfo.${message.author.id}_xp`) >= 350 && db.get(`userInfo.${message.author.id}_xp`) <= 495) {
            maxexp = 495
            oneProcent = 0.727
            console.log("result: " + result)
            currentRankStrokeStyle = "#FFDF00"
        } else if (db.get(`userInfo.${message.author.id}_xp`) >= 500 && db.get(`userInfo.${message.author.id}_xp`) <= 695) {
            maxexp = 695
            oneProcent = 0.517
            console.log("result: " + result)
            currentRankStrokeStyle = "#FF00FF"
        } else if (db.get(`userInfo.${message.author.id}_xp`) >= 700 && db.get(`userInfo.${message.author.id}_xp`) <= 945) {
            maxexp = 945
            oneProcent = 0.380
            console.log("result: " + result)
            currentRankStrokeStyle = "#8B008B"
        } else if (db.get(`userInfo.${message.author.id}_xp`) >= 950 && db.get(`userInfo.${message.author.id}_xp`) <= 1200) {
            maxexp = 1200
            oneProcent = 0.3
            console.log("result: " + result)
            currentRankStrokeStyle = "#4B0082"
        } else {
	    maxexp = 1200
	    oneProcent = 0.3
	    console.log("result: " + result)
	    currentRankStrokeStyle = "#4B0082"
	}

        ctx.lineCap = 'round';

        result = oneProcent * db.get(`userInfo.${message.author.id}_xp`)

        var deegres = 0
            //while (deegres <= result) {
            //deegres += 1;
        deegres = result


        /*
        const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 25, 25, 200, 200);



        const background = await Canvas.loadImage('./red.jpg');
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                ctx.beginPath();
                ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();
                */


        console.log('Degrees: ' + deegres)




        ctx.clearRect(0, 0, canvas.width, canvas.height);
        procent = deegres / oneProcent
        console.log(oneProcent)
        ctx.beginPath()
        ctx.arc(posX, posY, 70, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + 360))
        ctx.strokeStyle = '#b1b1b1';
        ctx.lineWidth = '10';
        ctx.stroke();


        const background = await Canvas.loadImage('./red.jpg');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


        ctx.beginPath();
        ctx.strokeStyle = currentRankStrokeStyle;
        ctx.lineWidth = '10';
        console.log('Degrees: ' + deegres)
        ctx.arc(posX, posY, 70, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + deegres));
        ctx.stroke();



        ctx.font = '100px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(db.get(`userInfo.${message.author.id}_currentRank`), 88, canvas.height / 1.8);

        ctx.font = '30px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(db.get(`userInfo.${message.author.id}_xp`) + '/' + maxexp + ' EXP', 38, 220);

        // Add an exclamation point here and below
        ctx.font = applyText(canvas, `${message.author.id}!`);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('You are at level ' + await db.get(`userInfo.${message.author.id}_currentRank`) + `, ${message.author.username}!`, 320, 50);


        ctx.beginPath();
        ctx.arc(600, 150, 80, 0, Math.PI * 2, true);
        ctx.strokeStyle = '#00FFEE'
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(600, 150, 80, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.strokeStyle = '#ffffff'
        ctx.clip();



        const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 520, 70, 160, 160);





        //ctx.drawImage(avatar, 25, 25, 200, 200);

        //}
        /*

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
        */

        //const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
        //ctx.drawImage(avatar, 25, 25, 200, 200);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'red.png');
        await message.channel.send(attachment)




        /*
        let embedRanks = {
            "content": "UserRanking",
            "title": `**RedRose Ranking** - ` + message.member.user.tag,
            "description": "You are currently on Rank: " + returnedRank,
            "url": "",
            "color": 15844367,
            "timestamp": dateTime,
        }

        await message.channel.send({ embed: embedRanks })


        //getUserRank('userRank').then(function(rows){
        //console.log(rows)
        //}).catch((err) => setImmediate(() => { throw err; }));

*/

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
            await message.reply('You are not authorized to use this command.')
	}
	} else if (message.content.startsWith(`${prefix}annoy`)) {
        if (message.author.id === '164382979550871553') {
            let cont = message.content.slice(prefix.length).split(' ')
            var args = cont.slice(1)
	    const userx = message.mentions.users.first().id
            let user = client.users.cache.get(userx).send(args[2])
            message.channel.send(`Send message to ${user}`)
                   //console.log(user.id)
        } else {
            await message.reply('You are not authorized to use this command.')
       	}
    	} else if (message.content.startsWith(`${prefix}partner`)) {
        let cont = message.content.slice(prefix.length).split(" ")
        let args = cont.slice(1)
        if (args[0] == null) {
            await message.reply('Please enter Partner')
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

	//console.log(args[0])
        emojiUser = args[0]

	cont2 = args.slice(1)
	cont22 = cont2.join(" ")
	
        message.channel.send(message.author.username + " started a new Vote! Should " + args[0] + " " + cont22 + "?")
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
    } else if (message.content.startsWith(`${prefix}writeAlltoDatabase`)) {




        // writeAllToQuickDB

        var date;

        try {



            let user = null
            let messageCount = null
            let cont = null



            console.log('1')
            await client.users.cache.forEach(async u => {
                let userID = await u.id.toString()
                    //await db.set(`userInfo`, { rank: null }) // adding all users with count 0 to database
                console.log('Added ' + u.username + ' to quick.db database')
                db.add(`userInfo.${userID}_xp`, 0)
                db.add(`userInfo.${userID}_currentRank`, 0)
                db.add(`userInfo.${userID}_messageCount`, 0)
                console.log('Added ' + u.id + ' to quick.db database')

            })


            /*
                try {
                    await con.query(`INSERT INTO user (userID, messageCount, joinedAt, userRank) VALUES (${user}, ${messageCount}, "${args}", 1)`)
                    con.on('error', function(err) {
                        console.log(err)
<<<<<<< HEAD
                        return
                    })
                    await con.release()
                } catch (err) {
                    console.log(err)
                }
*/

        } catch (err) {
            console.log(err.message)
        }
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




    try {

        // Add new member to quickdb
        db.add(`userInfo.${member.id}_xp`, 0)
        db.add(`userInfo.${member.id}_currentRank`, 0)
        db.add(`userInfo.${member.id}_messageCount`, 0)
        console.log(`Added new Guild Member with ID ${member.id} to quickDB database`)

    } catch (err) {
        console.log(err.message + `\nCannot add new guildmember to Database`)
    }



    const channel = member.guild.channels.cache.get('698150099603161202');
    if (!channel) return;



    let RedRoseDiscord = client.guilds.cache.get('698150099603161199')
    let membercount = RedRoseDiscord.memberCount


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
    ctx.drawImage(avatar, 30, 30, 200, 200);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'red.png');


    try {
        channel.send(`Welcome to RedRose, ${member}!`, attachment);
    } catch (err) {
        console.error(err)
    }

    if (membercount == 100) {
        channel.send(`Welcome ${member.user}, you are our 100th USER!!!!!!`)
    }

});


client.login(token)

client.on('ready', async() => {

    let RedRoseDiscord = client.guilds.cache.get('698150099603161199')
    let membercountchannel = client.channels.cache.get('710174438368477194')
    let membercount = RedRoseDiscord.memberCount
    
    let SnowsDiscord = client.guilds.cache.get('709330557267476490')
    let membercountchannelSnow = client.channels.cache.get('718520385553039370')
    let membercountSnow = SnowsDiscord.memberCount


    let boosterCount = 0

    await client.user.setActivity(`Roses`, { type: 'LISTENING', url: 'https://open.spotify.com/track/0easEmosKkPhksg0qidzXo?si=Nsjlk1afQB-_lIGsJTii_w' })
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        .catch(console.error);

    let boosterRole = '702294533551030363'

    let boosterRoleSnow = '716767706359136308'
    let usersInBoosterRole = []
    let usersInBoosterRoleSnow = []

    let i = 0
    let x = 0


        let testChannel = client.channels.cache.get('710171771365490734')
        let boosterCountChannel = client.channels.cache.get('710187321122619508')
        let snowBoosterChannel = client.channels.cache.get('718522883772645416')


    setInterval(async () => {
    membercountchannel.setName(`Total Members: ${membercount}`)
    membercountchannelSnow.setName(`Total Members: ${membercountSnow}`)

    RedRoseDiscord.members.cache.forEach(async g => {
        if (g._roles.includes(boosterRole)) {
	    if(!usersInBoosterRole.includes(g.user.username))
            await usersInBoosterRole.push(g.user.username)
        }
    })

    SnowsDiscord.members.cache.forEach(async g => {
	if (g._roles.includes(boosterRoleSnow)) {
	    if(!usersInBoosterRoleSnow.includes(g.user.username))
	    await usersInBoosterRoleSnow.push(g.user.username)
	}
    })



    

    //var boosterChannelChange = setInterval(async function() {
        //get Channel to Change
        //let testChannel = client.channels.cache.get('710171771365490734')
        //let boosterCountChannel = client.channels.cache.get('710187321122619508')
    	//let snowBoosterChannel = client.channels.cache.get('718522883772645416')


	snowBoosterChannel.setName(`Booster: ${usersInBoosterRoleSnow[x]}`)
	
	
	testChannel.setName(`Booster: ${usersInBoosterRole[i]}`)
        membercountchannel.setName(`Total Members: ${RedRoseDiscord.memberCount}`)
        boosterCountChannel.setName(`Boosts: ${usersInBoosterRole.length}`)
	console.log("users in booster role: " + usersInBoosterRole)

	x++
	if (x >= usersInBoosterRoleSnow.length){
	    x = 0
	}
        console.log(x)
	i++
        if (i >= usersInBoosterRole.length) {
            i = 0
        }
	console.log(i)
        /*await client.usgit ers.cache.forEach(g => {
            console.log(boosterRole.members.cache)
        })*/
    }, 15000)

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
