const {

    prefix,
    giphy_apiKey,
    tenor_apiKey,
    discordColors

} = require('./config.json')

let fetch = require('node-fetch')
const headers = { 'Content-Type': 'application/json' }
const Discord = require('discord.js')





class Emote {

    static async emotetype(client, message, args) {
        let params = ""
        let action = ""
        let extra = ""
        //let apiKey = giphy_apiKey
        let apiKey = tenor_apiKey
        var today = new Date()
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        var dateTime = date + ' ' + time



        console.log("my content is currently" + message.content)
        console.log("my content is currently" + args)
        if (message.content.startsWith(`${prefix}cuddle`)) {
            params = "cuddle"
            action = " cuddles with "
            extra = "that's so cozy :=) "
        } else if (message.content.startsWith(`${prefix}lick`)) {
            params = "lick"
            action = " is licking "
            extra = "hmmm smells goood"
        } else if (message.content.startsWith(`${prefix}slap`)) {
            params = "slap"
            action = " slaps "
            extra = "Oof that hurt a bit "
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
        } else if (message.content.startsWith(`${prefix}gay`)) {
            params = "gay"
            action = " is acting gay on "
            extra = "yo that's fkin gay "
        } else if (message.content.startsWith(`${prefix}rape`)) {
            params = "rape"
            action = " rapes "
            extra = "you know you want it.. "
        } else if (message.content.startsWith(`${prefix}hug`)) {
            params = "hug"
            action = " is hugging "
            extra = "why do you feel so warm? "
        } else if (message.content.startsWith(`${prefix}oniichan`)) {
            params = "oniichan"
            action = " summons oniichan "
            extra = "UwU? ONIICHAAAN! "
        } else if (message.content.startsWith(`${prefix}love`)) {
            params = "love"
            action = " is sending love to "
            extra = "look how cute they are awwwww..."
        } else if (message.content.startsWith(`${prefix}headpat`)) {
            params = "headpat"
            action = " is headpatting "
            extra = "thanks for the head pats uwu..."
        } else if (message.content.startsWith(`${prefix}custom`)) {
            params = args[1].replace("_", "%5C")
            action = " sending " + args[1] + " to "
            extra = "thats something special o_w_u "
            args = args[2]
        } else{
            message.channel.send("An unknown error occurred. Please check contact the coder.")
        }



        let offsetRandomize = Math.floor(Math.random() * 10)

        while (offsetRandomize > 5) {
            offsetRandomize = Math.floor(Math.random() * 10)
        }


        let colorRandomize = Math.floor(Math.random() * 24)
        while (colorRandomize > 23) {
            colorRandomize = Math.floor(Math.random() * 24)
        }


        let color = discordColors[colorRandomize]
        
        let apiURL = null;
        
        //let apiURL = "https://api.giphy.com/v1/gifs/search?limit=20&offset=" + offsetRandomize + "&q=" + params + "+" + "anime" + apiKey
        if(message.content.startsWith(`${prefix}custom`)){
        apiURL = "https://api.tenor.com/v1/search?q=" + params + "&key=" + apiKey
        }else{
        apiURL = "https://api.tenor.com/v1/search?q=" + params + "%5Canime&key=" + apiKey
        }
        //message.channel.send(apiURL)
        //let user = getUserFromMention(args)
        console.log(apiURL)

        if (!args) return

        if (args.startsWith('<@') && args.endsWith('>')) {
            args = args.slice(2, -1)

            if (args.startsWith('!')) {
                args = args.slice(1)
            }
        }

        await fetch(apiURL, { method: "GET", headers: headers })
            .then((resp) => resp.json())
            .then((object) => {


                //message.channel.send("DEBUG INFO: The limit is 10 and i got " + object['results'][0]['media'][0]['gif']['url'] + " objects.")


                let random = Math.floor(Math.random() * 11)

                if (object['results'].length < 1) 
                {
                 message.channel.send('No Image found.')
                 return
                }

                if (object['results'].length < 10) {
                    random = Math.floor(Math.random() * (object['results'].length))
                }

                let coderun = false 
                try{
                while (coderun == false) {
                    if (object['results'][random]['media'][0]['gif']['url'] === undefined) {
                        console.log("Something was wrong")
                        random = Math.floor(Math.random() * 11)
                    } else if (object['results'][random]['media'][0]['gif']['url'] != undefined) {
                        coderun = true
                    } else {
                        coderun = true
                        break
                    }
                }
                }catch(ex){
                    message.channel.send(ex.message)
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

                    //message.channel.send({ myEmbed })
                    let url = object['results'][random]['media'][0]['gif']['url']


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
                            break
                    }

                    let cuddleEmbed = {
                        "content": params,
                        "title": message.member.user.tag + action + client.users.cache.get(args)['username'],
                        "description": extra + client.users.cache.get(args)['username'],
                        "url": "https://discordapp.com",
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


    }
}
module.exports = Emote