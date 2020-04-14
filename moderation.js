const {

    prefix,
    giphy_apiKey

} = require('./config.json');

let fetch = require('node-fetch')
const headers = { 'Content-Type': 'application/json' }
const Discord = require('discord.js')



class MOD {

    static async moderation(client, message, args) {


        let params = ""
        let action = ""
        let extra = ""
        let apiKey = giphy_apiKey

        console.log("my content is currently" + message.content)
        if (message.content.startsWith(`${prefix}kick`)) {
            params = "kick"
            action = " kicked "
            extra = " got kicked from the server"
        } else if (message.content.startsWith(`${prefix}ban`)) {
            params = "ban"
            action = " banned "
            extra = " got banned from the server"
        } else if (message.content.startsWith(`${prefix}warn`)) {
            params = "warn"
            action = " warned "
            extra = " got warned. Please follow the rules!"
        } else {
            message.channel.send("An unknown error occurred. Please check contact the coder.")
        }



        let apiURL = "https://api.giphy.com/v1/gifs/search?limit=20&offset=0&q=" + params + apiKey
            //let user = getUserFromMention(args)
        console.log(apiURL)

        if (!args) return;

        if (args.startsWith('<@') && args.endsWith('>')) {
            args = args.slice(2, -1);

            if (args.startsWith('!')) {
                args = args.slice(1);
            }
        }

        console.log(args) // check some stuff



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


        if (!message.member.hasPermission("BAN_MEMBERS")) {
            message.reply("You do not have permission to ban someone.")
            return;
        } else if (!message.member.hasPermission("KICK_MEMBERS")) {
            message.reply("You do not have permission to kick someone.")
            return;
        } else if (!message.member.hasPermission("WARN_MEMBERS")) {
            message.reply("You do not have permission to warn someone.")
            return;
        } else {
            console.log(client.users.cache.get(args))
            await BanRequest(params, action, extra);
        }

        async function BanRequest(params, action, extra) {


            const user = message.mentions.users.first()
            console.log("current user: " + user)




            if (params == "kick") {
                if (!user) {
                    try {
                        // Check if a valid userID has been entered instead of a Discord user mention
                        if (!message.guild.members.get(args.slice(0, 1).join(' '))) throw new Error('Couldn\' get a Discord user with this userID!');
                        // If the client (bot) can get a user with this userID, it overwrites the current user variable to the user object that the client fetched
                        user = message.guild.members.get(args.slice(0, 1).join(' '));
                        user = user.user;
                    } catch (error) {
                        return message.reply('Couldn\' get a Discord user with this userID!');
                    }
                }
                if (user === message.author) return message.channel.send('You can\'t kick yourself'); // Check if the user mention or the entered userID is the message author himsmelf
                //if (!reason) return message.reply('You forgot to enter a reason for this ban!'); // Check if a reason has been given by the message author
                if (!message.guild.member(user).kickable) return message.reply('You can\'t kick this user because you the bot has not sufficient permissions!'); // Check if the user is bannable with the bot's permissions

                await message.guild.member(user).kick() // Bans the user
            }

            if (params == "ban") {
                if (!user) {
                    try {
                        // Check if a valid userID has been entered instead of a Discord user mention
                        if (!message.guild.members.get(args.slice(0, 1).join(' '))) throw new Error('Couldn\' get a Discord user with this userID!');
                        // If the client (bot) can get a user with this userID, it overwrites the current user variable to the user object that the client fetched
                        user = message.guild.members.get(args.slice(0, 1).join(' '));
                        user = user.user;
                    } catch (error) {
                        return message.reply('Couldn\' get a Discord user with this userID!');
                    }
                }
                if (user === message.author) return message.channel.send('You can\'t ban yourself'); // Check if the user mention or the entered userID is the message author himsmelf
                //if (!reason) return message.reply('You forgot to enter a reason for this ban!'); // Check if a reason has been given by the message author
                if (!message.guild.member(user).banable) return message.reply('You can\'t ban this user because you the bot has not sufficient permissions!'); // Check if the user is bannable with the bot's permissions

                await message.guild.member(user).ban() // Bans the user
            }


            if (params == "warn") {
                if (!user) {
                    try {
                        // Check if a valid userID has been entered instead of a Discord user mention
                        if (!message.guild.members.get(args.slice(0, 1).join(' '))) throw new Error('Couldn\' get a Discord user with this userID!');
                        // If the client (bot) can get a user with this userID, it overwrites the current user variable to the user object that the client fetched
                        user = message.guild.members.get(args.slice(0, 1).join(' '));
                        user = user.user;
                    } catch (error) {
                        return message.reply('Couldn\' get a Discord user with this userID!');
                    }
                }
                if (user === message.author) return message.channel.send('You can\'t warn yourself'); // Check if the user mention or the entered userID is the message author himsmelf
                //if (!reason) return message.reply('You forgot to enter a reason for this ban!'); // Check if a reason has been given by the message author
                if (!message.guild.member(user).warnable) return message.reply('You can\'t warn this user because you the bot has not sufficient permissions!'); // Check if the user is bannable with the bot's permissions

                await message.guild.member(user).warn() // Bans the user
            }
            /*const banConfirmationEmbed = new Discord.RichEmbed()
                .setColor('RED')
                .setDescription(`✅ ${user.tag} has been successfully banned!`);
            message.channel.send({
                embed: banConfirmationEmbed
            }); // Sends a confirmation embed that the user has been successfully banned
*/



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

                        let url = object['data'][random]['images']['original']['url']

                        let moderationEmbed = {
                            "content": params,
                            "title": message.member.user.tag + action + client.users.cache.get(args)['username'],
                            "description": client.users.cache.get(args)['username'] + extra,
                            "url": "",
                            "color": 15844367,
                            "timestamp": "2020-01-25T21:38:40.648Z",
                            "image": {
                                "url": url
                            }
                        }

                        //channel.send({ embed: cuddleEmbed });
                        message.channel.send({ embed: moderationEmbed });

                    } catch (error) {
                        message.channel.send(error.message);
                    }
                })
        }

    }
}
module.exports = MOD