const {

    prefix,
    giphy_apiKey

} = require('./config.json')

let fetch = require('node-fetch')
const headers = { 'Content-Type': 'application/json' }
const Discord = require('discord.js')


class MOD {

    static async purgeMessages(message) {
        let cont = message.content.slice(prefix.length).split(" ")
        let args = cont.slice(1)
        let perms = message.member.permissions
        let has_managemessages = perms.has("MANAGE_MESSAGES")
        if (!has_managemessages) {
            message.reply('You are not allowed to use this command. Bottie is sorry.')
            return
        }
        message.delete()
        if (isNaN(args[0])) {
            message.channel.send("Please use a number as parameter. \n Usage: " + prefix + "delete <count>")
            return
        }

        if (args[0] === 1) {
            let deleteCount = parseInt(args[0])
            deleteCount = deleteCount + 1
            let deldescription = deleteCount - 1
        } else if (args[0] > 1) {
            deleteCount = args[0]
            let deldescription = deleteCount
        }

        const fetched = await message.channel.messages.fetch({ limit: deleteCount })




        let deleteEmbed = {
            color: 15158332,
            title: 'Message Deleted',
            author: {
                name: message.channel.author,
                icon_url: 'https://www.freeiconspng.com/uploads/remove-icon-png-15.png',
            },
            description: `I've deleted ${deldescription} messages.`,
            thumbnail: {
                url: 'https://media.tenor.com/images/f4f6d8a289cdaa5325b1257b3ac566ff/tenor.gif'
            },
            fields: [{
                name: 'Amount:',
                value: deldescription,
            }, ],
            timestamp: new Date(),
            footer: {
                text: 'Thank you for using the RedRose purge system.'
            },
        };
        try {
            message.channel.bulkDelete(fetched)
            message.channel.send({ embed: deleteEmbed })
        } catch (err) {
            message.channel.send(err.message)
        }

    }

    static async moderation(client, message, args) {
        let params = ""
        let action = ""
        let extra = ""
        let apiKey = giphy_apiKey
        console.log("My content is currently" + message.content)

        let cont = message.content.slice(prefix.length).split(" ").slice(1)
        let reason = cont.slice(1).join(' ')


        if (message.content.startsWith(`${prefix}kick`)) {
            params = "kick"
            action = "Kicked"
            extra = " got kicked from the server"
        } else if (message.content.startsWith(`${prefix}ban`)) {
            params = "ban"
            action = "Banned"
            extra = " got banned from the server"
        } else {
            message.channel.send("An unknown error occurred. Please check contact the coder.")
        }
        let apiURL = "https://api.giphy.com/v1/gifs/search?limit=20&offset=0&q=" + params + apiKey
        console.log(apiURL)
        if (!args) return
        if (args.startsWith('<@') && args.endsWith('>')) {
            args = args.slice(2, -1)

            if (args.startsWith('!')) {
                args = args.slice(1)
            }
        }
        console.log(args)
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
        try {
            if (!message.member.hasPermission("BAN_MEMBERS")) {
                message.reply("You do not have permission to ban someone.")
                return
            } else if (!message.member.hasPermission("KICK_MEMBERS")) {
                message.reply("You do not have permission to kick someone.")
                return
            } else {
                await BanRequest(params, action, extra, reason)
            }
        } catch (error) {
            message.channel.send(error.message)
        }

        async function BanRequest(params, action, extra, reason) {
            try {


                const user = message.mentions.users.first()
                console.log("current user: " + user)
                if (params == "kick") {
                    if (!user) {
                        try {
                            if (!message.guild.members.get(args.slice(0, 1).join(' '))) throw new Error('Couldn\' get a Discord user with this userID!')
                            user = message.guild.members.get(args.slice(0, 1).join(' '))
                            user = user.user
                        } catch (error) {
                            return message.reply('Couldn\' get a Discord user with this userID!')
                        }
                    }

                    if (user === message.author) return message.channel.send('You can\'t kick yourself')
                    if (!reason) return message.reply('You maggot forgot to add a kick reason!')
                    if (!message.guild.member(user).kickable) return message.reply('You can\'t kick this user because you don\'t have sufficient permissions!')
                    await message.guild.member(user).kick() // Bans the user
                }
                if (params == "ban") {
                    if (!user) {
                        try {
                            if (!message.guild.members.get(args.slice(0, 1).join(' '))) throw new Error('Couldn\' get a Discord user with this userID!')
                            user = message.guild.members.get(args.slice(0, 1).join(' '))
                            user = user.user
                        } catch (error) {
                            return message.reply('Couldn\' get a Discord user with this userID!')
                        }
                    }
                    if (user === message.author) return message.channel.send('You can\'t ban yourself')
                    if (!reason) return message.reply('You maggot forgot to add a ban reason!')
                    if (!message.guild.member(user).bannable) return message.reply('You can\'t ban this user because you don\'t have sufficient permissions!')

                    await message.guild.member(user).ban()
                }
            } catch (error) {
                message.channel.send(error.message)
            }
            try {
                await fetch(apiURL, { method: "GET", headers: headers })
                    .then((resp) => resp.json())
                    .then((object) => {
                        let random = Math.floor(Math.random() * 21)
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


                        var today = new Date()
                        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
                        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
                        var dateTime = date + ' ' + time


                        let url = object['data'][random]['images']['original']['url']
                            /*
                            let moderationEmbed = {
                                "content": params,
                                "title": message.member.user.tag + action + client.users.cache.get(args)['username'],
                                "description": client.users.cache.get(args)['username'] + extra,
                                "url": "",
                                "color": 15844367,
                                "timestamp": dateTime,
                                "image": {
                                    "url": url
                                }
                            }
                            message.channel.send({ embed: moderationEmbed })
                            */


                        let action2 = null

                        switch (params) {
                            case 'kick':
                                action2 = '360 Roundhouse Kick!'
                                break
                            case 'ban':
                                action2 = 'The Holy Banhammer has spoken!'
                                break
                            default:
                                action2 = null
                                break
                        }

                        if (action == null) {
                            message.reply('An error occurred. Please contact Coder')
                        }

                        let user = client.users.cache.get(args) // for debugging
                        console.log(user)

                        let target = client.users.cache.get(args)['username']
                        let targetID = client.users.cache.get(args)['tag']


                        Object.defineProperty(Array.prototype, 'flat', {
                            value: function(depth = 1) {
                                return this.reduce(function(flat, toFlatten) {
                                    return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten);
                                }, []);
                            },
                            configurable: true
                        });


                        let moderationEmbed = new Discord.MessageEmbed()
                            .setTitle(action2)
                            .setDescription(`${action} ${target} (${targetID})`)
                            .setColor("#ff2050")
                            .setFooter(`${action} by ${message.author.username} | Reason: ${reason}`)
                            .setImage(url)
                        message.channel.send(moderationEmbed)
                    })
            } catch (error) {
                message.channel.send(error.message)
            }
        }
    }
}
module.exports = MOD