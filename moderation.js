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
            console.log('You are not allowed to use this command. Bottie is sorry.')
            return
        }
        message.delete()
        if (isNaN(args[0])) {
            message.channel.send("Please use a number as parameter. \n Usage: " + prefix + "delete <count>")
            return
        }
        const fetched = await message.channel.messages.fetch({ limit: args[0] })
        console.log("I've found " + fetched.size + " messages, deleting...")
        message.channel.bulkDelete(fetched)
            .catch(error => message.channel.send(`Error: There is nothing more left to delete. Chill.`))
    }

    static async moderation(client, message, args) {
        let params = ""
        let action = ""
        let extra = ""
        let apiKey = giphy_apiKey
        console.log("My content is currently" + message.content)
        if (message.content.startsWith(`${prefix}kick`)) {
            params = "kick"
            action = " kicked "
            extra = " got kicked from the server"
        } else if (message.content.startsWith(`${prefix}ban`)) {
            params = "ban"
            action = " banned "
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
                await BanRequest(params, action, extra)
            }
        } catch (error) {
            message.channel.send(error.message)
        }

        async function BanRequest(params, action, extra) {
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
                    if (!message.guild.member(user).kickable) return message.reply('You can\'t kick this user because you the bot has not sufficient permissions!')
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
                        message.channel.send({ embed: moderationEmbed })
                    })
            } catch (error) {
                message.channel.send(error.message)
            }
        }
    }
}
module.exports = MOD