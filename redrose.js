// This software is part of the RedRose Discord Server | https://discord.gg/82WPuFm //

// || RedRose Discord Bot v0.1 || //

// Webhook test commit //
var Emote = require("./emote")
var MOD = require("./moderation")
var BLOCK = require("./BLOCK")
const headers = { 'Content-Type': 'application/json' }
const Discord = require('discord.js')
const fetch = require('node-fetch')
let io = require('console-read-write')
let btoa = require("btoa")
let globalrank = null
let user = null



const discordColors = [
    0,
    1752220,
    3066993,
    3447003,
    10181046,
    15844367,
    15105570,
    15158332,
    9807270,
    8359053,
    3426654,
    1146986,
    2067276,
    2123412,
    7419530,
    12745742,
    11027200,
    10038562,
    9936031,
    12370112,
    2899536,
    16580705,
    12320855
 ]
 


const {

    prefix,
    token,

} = require('./config.json');

const apiKey = "&api_key=6OUrndBG5G4nPWopJ50HhCq5y9j5IiQz"

const client = new Discord.Client();


//const weirdchamp = client.emojis.get("305818615712579584");



function tagsort(tags) {
    console.log("Mein wert ist " + tags)
        // Check for null or undefined in IndexOf tags //
    if (tags == "undefined" && tags == null) {
        console.log("Can't show tags for unknown user.");
        globalrank = "Rank Unknown"
    }

    if (tags.indexOf("troll") != -1) {
        console.log("This Person is a confirmed troll.".red)
        globalrank = "This Person is a confirmed troll."
    } else if (tags.indexOf("system_legend") != -1) {
        console.log("Legendary User and appears as" + " Trusted User".magenta)
        globalrank = "Legendary User and appears as Trusted User"
    } else if (tags.indexOf("system_trust_legend") != -1) {
        console.log("Veteran User and appears as" + " Trusted User".magenta)
        globalrank = "Veteran User and appears as Trusted User"
    } else if (tags.indexOf("system_trust_veteran") != -1) {
        console.log("Trusted User".magenta)
        globalrank = "Trusted User"
    } else if (tags.indexOf("system_trust_trusted") != -1) {
        console.log("Known User".yellow)
        globalrank = "Known User"
    } else if (tags.indexOf("system_trust_known") != -1) {
        console.log("User".green)
        globalrank = "User"
    } else if (tags.indexOf("system_trust_basic") != -1) {
        console.log("New User".blue)
        globalrank = "New User"
    }
}

async function getByUserName(message, args) {
    let apiURL = "https://api.vrchat.cloud/api/1/"
    let end = false;
    username = ""
    password = ""
    let headers = { 'Authorization': 'Basic ' + btoa(username + ':' + password), 'Content-Type': 'raw' }
    do {
        console.log("Please enter username: ")
        let searchuser = args
        let apiKey = "&apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26"
        endpoint = "users" + "?search=" + searchuser
        try {
            await fetch(apiURL + endpoint + apiKey, { method: 'GET', headers: headers }, false)
                .then(response => response.json())
                .then((object) => {
                    console.log(object)
                    if (object.length == 0) {
                        message.channel.send("I didn't found any user. Bazinga.")
                        end = true;
                    } else {



                        /* Discord Embed

                                        let cuddleEmbed = {
                                            "content": "test",
                                            "title": message.member.user.tag + " cuddles with @" + client.users.cache.get(args)['username'],
                                            "description": "look how cute they are " + client.users.cache.get(args)['username'],
                                            "url": "https://discordapp.com",
                                            "color": 15844367,
                                            "timestamp": "2020-01-25T21:38:40.648Z",
                                            "image": {
                                                "url": url
                                            }
                                        }

                                        //channel.send({ embed: cuddleEmbed });
                                        message.channel.send({ embed: cuddleEmbed });

                        */


                        message.channel.send("I've found " + object.length + " users")
                        message.channel.send("Showing the first 3 Entry's.." + "\n")
                        message.channel.send("DisplayName: \n" + object[0]['displayName'])
                        message.channel.send("Avatar-Bild: \n" + object[0]['currentAvatarThumbnailImageUrl'])
                        let tags = object[0]['tags']
                        tagsort(tags)
                        message.channel.send("This peson has the following rank: " + globalrank)
                        message.channel.send("DisplayName: \n" + object[1]['displayName'])
                        message.channel.send("Avatar-Bild: \n" + object[1]['currentAvatarThumbnailImageUrl'])
                        let tags2 = object[1]['tags']
                        tagsort(tags2)
                        message.channel.send("This peson has the following rank: " + globalrank)
                        message.channel.send("DisplayName: \n" + object[2]['displayName'])
                        message.channel.send("Avatar-Bild: \n" + object[2]['currentAvatarThumbnailImageUrl'])
                        let tags3 = object[2]['tags']
                        tagsort(tags3)

                        message.channel.send("This peson has the following rank: " + globalrank)
                        end = true;
                    }
                })
        } catch (ex) {
            message.channel.send(ex.message, "User not found. Please try again.");
            end = false;
        }
    }
    while (end == false)
    console.log("Request Proceeded Successfully.")
}


async function getRandomImage(message, params) {
    let apiURL = "https://api.giphy.com/v1/gifs/search?limit=20&offset=0&q=" + params + apiKey
    console.log(apiURL)

    await fetch(apiURL, { method: "GET", headers: headers })
        .then((resp) => resp.json())
        .then((object) => {


            //message.channel.send("DEBUG INFO: The limit is 20 and i got " + object['data'].length + " objects.")



            let random = Math.floor(Math.random() * 21);

            if (object['data'].length < 20) {
                random = Math.floor(Math.random() * (object['data'].length))
            }

            let coderun = false;
            while (coderun == false) {
                if (object['data'][random]['embed_url'] === undefined) {
                    console.log("Something was wrong");
                    random = Math.floor(Math.random() * 21);
                } else if (object['data'][random]['embed_url'] != undefined) {
                    coderun = true;
                } else {
                    coderun = true;
                    break;
                }
            }
            try {
                message.channel.send("I found the following image with a reference to " + params + " : " + "\n" + object['data'][random]['embed_url'])
            } catch (error) {
                message.channel.send(error);
            }
        })
}


async function dobruh(message) {
    let offsetRandomize = Math.floor(Math.random() * 10)

    while(offsetRandomize > 5) {
        offsetRandomize = Math.floor(Math.random() * 10)
    }

    let apiURL = "https://api.giphy.com/v1/gifs/search?limit=20&offset=" + offsetRandomize + "&q=" + "bruh" + apiKey
    console.log(apiURL)

    await fetch(apiURL, { method: "GET", headers: headers })
        .then((resp) => resp.json())
        .then((object) => {


            //message.channel.send("DEBUG INFO: The limit is 20 and i got " + object['data'].length + " objects.")






            let random = Math.floor(Math.random() * 21);

            if (object['data'].length < 20) {
                random = Math.floor(Math.random() * (object['data'].length))
            }

            let coderun = false;
            while (coderun == false) {
                if (object['data'][random]['embed_url'] === undefined) {
                    console.log("Something was wrong");
                    random = Math.floor(Math.random() * 21);
                } else if (object['data'][random]['embed_url'] != undefined) {
                    coderun = true;
                } else {
                    coderun = true;
                    break;
                }
            }
            try {
                message.channel.send(object['data'][random]['embed_url'])
            } catch (error) {
                message.channel.send(error);
            }
        })
}



client.on('message', async message => {
    const responseObject = {
        "ayy": "Ayy, lmao!",
        "wat": "Say what?",
        "lol": "rofl",
        "bruh": dobruh(message)
    };
    
    if (message.author.bot) return
    if (!message.content.startsWith(prefix) && !responseObject[message.content]) return

    if (message.content.startsWith(`${prefix}play`)) {
        message.channel.send("Searching for youtube video to play..")
        const command = message.content.split(/[ \n]/)[0].trim();
        const suffix = message.content.substring(prefix.length + command.length).trim()
        console.log("message: " + message)
        console.log("suffix: " + suffix)
        try {
            await playVideo(message, suffix);
        } catch (ex) {
            console.log(ex.message)
        }
    } else if (message.content.startsWith(`${prefix}utc`)) {
        message.channel.send("The UTC time is : " + Date.UTC(0, 0, 0, 0, 0, 0))
    } else if (message.content.startsWith(`${prefix}image`)) {
        const image = message.content.split(' ')
        getRandomImage(message, image[1])
    } else if (message.content.startsWith(`${prefix}emojilist`)) {
        const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
        message.channel.send(`${emojiList}`);
    } else if (responseObject[message.content]) {
        message.channel.send(responseObject[message.content])
    } else if (message.content.startsWith(`${prefix}delete`)) {
        purgeMessages(message);
    } else if (message.content.startsWith(`${prefix}vrcuser`)) {
        let cont = message.content.slice(prefix.length).split(" ");
        let args = cont.slice(1);
        message.reply("this function is temporary deactivated")
	//getByUserName(message, args[0])
    } else if (message.content.startsWith(`${prefix}ban`) || message.content.startsWith(`${prefix}kick`) || message.content.startsWith(`${prefix}warn`)) {
        let cont = message.content.slice(prefix.length).split(" ");
        let args = cont.slice(1);
        MOD.moderation(client, message, args[0])
    } else if (message.content.startsWith(`${prefix}cry`)) {
            params = "cry"
            action = " is crying "
            extra = "why "

            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date + ' ' + time;

            let offsetRandomize = Math.floor(Math.random() * 10)

            while(offsetRandomize > 5) {
                offsetRandomize = Math.floor(Math.random() * 10)
            }
    
    
            let colorRandomize = Math.floor(Math.random() * 24)
            while(colorRandomize > 23){
            colorRandomize = Math.floor(Math.random() * 24)
            }

            let random = Math.floor(Math.random() * 21);
            let color = discordColors[colorRandomize]
            let apiURL = "https://api.giphy.com/v1/gifs/search?limit=20&offset=" + offsetRandomize + "&q=" + params + apiKey

            await fetch(apiURL, { method: "GET", headers: headers })
            .then((resp) => resp.json())
            .then((object) => {


                //message.channel.send("DEBUG INFO: The limit is 20 and i got " + object['data'].length + " objects.")




                if (object['data'].length < 20) {
                    random = Math.floor(Math.random() * (object['data'].length))
                }

                let coderun = false;
                while (coderun == false) {
                    if (object['data'][random]['embed_url'] === undefined) {
                        console.log("Something was wrong");
                        random = Math.floor(Math.random() * 21);
                    } else if (object['data'][random]['images']['original']['url'] != undefined) {
                        coderun = true;
                    } else {
                        coderun = true;
                        break;
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

            //channel.send({ embed: cuddleEmbed });
            message.channel.send({ embed: cuddleEmbed });
                }catch(error){
                    message.channel.send(error.message)
                }
            })
        } else if (message.content.startsWith(`${prefix}rage`)) {
            params = "rage"
            action = " is raging "
            extra = "yo i'm fkin angry.."


            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date + ' ' + time;

            let offsetRandomize = Math.floor(Math.random() * 10)

            while(offsetRandomize > 5) {
                offsetRandomize = Math.floor(Math.random() * 10)
            }
    
    
            let colorRandomize = Math.floor(Math.random() * 24)
            while(colorRandomize > 23){
            colorRandomize = Math.floor(Math.random() * 24)
            }

            let random = Math.floor(Math.random() * 21);
            let color = discordColors[colorRandomize]
            let apiURL = "https://api.giphy.com/v1/gifs/search?limit=20&offset=" + offsetRandomize + "&q=" + params + apiKey

            await fetch(apiURL, { method: "GET", headers: headers })
            .then((resp) => resp.json())
            .then((object) => {


                //message.channel.send("DEBUG INFO: The limit is 20 and i got " + object['data'].length + " objects.")




                if (object['data'].length < 20) {
                    random = Math.floor(Math.random() * (object['data'].length))
                }

                let coderun = false;
                while (coderun == false) {
                    if (object['data'][random]['embed_url'] === undefined) {
                        console.log("Something was wrong");
                        random = Math.floor(Math.random() * 21);
                    } else if (object['data'][random]['images']['original']['url'] != undefined) {
                        coderun = true;
                    } else {
                        coderun = true;
                        break;
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

            //channel.send({ embed: cuddleEmbed });
            message.channel.send({ embed: cuddleEmbed });
                }catch(error){
                    message.channel.send(error.message)
                }
            })
    } else if (message.content.startsWith(`${prefix}cuddle`) ||
        message.content.startsWith(`${prefix}lick`) ||
        message.content.startsWith(`${prefix}hug`) ||
        message.content.startsWith(`${prefix}lewd`) ||
        message.content.startsWith(`${prefix}bite`) ||
        message.content.startsWith(`${prefix}gay`) ||
        message.content.startsWith(`${prefix}kiss`)||
        message.content.startsWith(`${prefix}rape`)) {
        let cont = message.content.slice(prefix.lenght).split(" ");
        let args = cont.slice(1);
        console.log(args[0])
        Emote.emotetype(client, message, args[0]);
    } else if (message.content.startsWith(`${prefix}blockinfo`)) {
        let cont = message.content.slice(prefix.length).split(" ");
        let args = cont.slice(1);
        BLOCK.halving(client, message, args[0])
    } else if (message.content.startsWith(`${prefix}help`)) {
        message.channel.send("Available Commands: " + "\n" + ".play <music> - spielt musik | .delete <anzahl> löscht die letzten bot nachrichten | .image <bild> - holt nen passendes gif");
    } else {
        message.channel.send('Your command is not valid brah.')
    }

});


client.login(token);

client.once('ready', () => {
    console.log('Ready!');
});
client.once('reconnecting', () => {
    console.log('Reconnecting!');
});
client.once('disconnect', () => {
    console.log('Disconnect!');
});


async function purgeMessages(message) {
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);
    message.delete();

    /*if (!message.member.roles.find("name", "bot-commander")) {
        message.channel.send("Ich brauch die \`bot-commander\` Rolle um diesen befehl zu benutzen.");
        return;
    }
*/

    if (isNaN(args[0])) {
        message.channel.send("Bitte nutze eine nummer als parameter. \n Benutzung: " + prefix + "delete <anzahl>");
        return;
    }


    const fetched = await message.channel.messages.fetch({ limit: args[0] });
    console.log("I've found " + fetched.size + " messages, deleting...")
    message.channel.bulkDelete(fetched)
        .catch(error => message.channel.send(`Error: Es gibt nichts mehr zu löschen. Nerv mich nich.`));
}
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
