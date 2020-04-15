const {

    prefix,
    giphy_apiKey

} = require('./config.json');

let fetch = require('node-fetch')
const headers = { 'Content-Type': 'application/json' }
const Discord = require('discord.js')


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


class Emote {

    static async emotetype(client, message, args) {
        let params = ""
        let action = ""
        let extra = ""
        let apiKey = giphy_apiKey

        console.log("my content is currently" + message.content)
        if (message.content.startsWith(`${prefix}cuddle`)) {
            params = "cuddle"
            action = " cuddles with "
            extra = "that's so cozy :=)"
        } else if (message.content.startsWith(`${prefix}lick`)) {
            params = "lick"
            action = " is licking "
            extra = "hmmm smells goood"
        } else if (message.content.startsWith(`${prefix}kiss`)) {
            params = "kiss"
            action = " is kissing "
            extra = "this kiss was awesome "
        } else if (message.content.startsWith(`${prefix}lewd`)) {
            params = "lewd"
            action = " is lewding "
            extra = "ERP IN A PUBLIC LOBBY??? BRUH "
        } else if (message.content.startsWith(`${prefix}bite`)) {
            params = "bite"
            action = " bites "
            extra = "i just hope that didn't hurt to much <3"
        } else if (message.content.startsWith(`${prefix}rape`)) {
            params = "rape"
            action = " rapes "
            extra = "you know you want it.. "
        } else if (message.content.startsWith(`${prefix}hug`)) {
            params = "hug"
            action = " is hugging "
            extra = "why do you feel so warm? "
        } else if (message.content.startsWith(`${prefix}cry`)) {
            params = "cry"
            action = " is crying"
            extra = "why..? "
        } else {
            message.channel.send("An unknown error occurred. Please check contact the coder.")
        }


    
        let offsetRandomize = Math.floor(Math.random() * 10)

        while(offsetRandomize > 5) {
            offsetRandomize = Math.floor(Math.random() * 10)
        }


        let colorRandomize = Math.floor(Math.random() * 24)
        while(colorRandomize > 23){
        colorRandomize = Math.floor(Math.random() * 24)
        }


        let color = discordColors[colorRandomize]
        let apiURL = "https://api.giphy.com/v1/gifs/search?limit=20&offset=" + offsetRandomize + "&q=" + params + apiKey
            //let user = getUserFromMention(args)
        console.log(apiURL)

        if (!args) return;

        if (args.startsWith('<@') && args.endsWith('>')) {
            args = args.slice(2, -1);

            if (args.startsWith('!')) {
                args = args.slice(1);
            }
        }

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
                    } else if (object['data'][random]['images']['original']['url'] != undefined) {
                        coderun = true;
                    } else {
                        coderun = true;
                        break;
                    }
                }

                try {
                    //str.substring(0, str.length() - 1)
                    //message.channel.send(message.member.user.tag + " cuddles with: " + args + ": " + "\n" + object['data'][random]['embed_url'])

                    // using embed function instead
                    console.log("Image number: " + random)
                        //const myEmbed = new Discord.RichEmbed()
                        //    .setColor(15844367)
                        //    .setTitle(client.user.username + " send cuddles to " + args)
                        //    .addField(client.user.username + " cuddles with " + args)
                        //    .setImage(object['data'][random]['embed_url'])

                    //message.channel.send({ myEmbed });
                    let url = object['data'][random]['images']['original']['url']


             
                    let userTag = ""
                    if(params != "cry"){
                    switch (client.users.cache.get(args)['username']) {
                        case 'undefined':
                            message.channel.send("Please enter a correct username")
                            break
                        case undefined:
                            message.channel.send("Please enter a correct username")
                            break
                        case null:
                            message.channel.send("Please enter a correct username")
                        default:
                            break;
                    }
                    userTag = client.users.cache.get(args)['username']
                    }else{
                    userTag = ""
                    }

            

                    let cuddleEmbed = {
                        "content": params,
                        "title": message.member.user.tag + action + userTag,
                        "description": extra + userTag,
                        "url": "https://discordapp.com",
                        "color": color,
                        "timestamp": "2020-01-25T21:38:40.648Z",
                        "image": {
                            "url": url
                        }
                    }

                    //channel.send({ embed: cuddleEmbed });
                    message.channel.send({ embed: cuddleEmbed });

                } catch (error) {
                    message.channel.send(error.message);
                }
            })


    }
}
module.exports = Emote