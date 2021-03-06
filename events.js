const {

    prefix,
    giphy_apiKey,
    discordColors

} = require('./config.json')

let fetch = require('node-fetch')
const headers = { 'Content-Type': 'application/json' }
const Discord = require('discord.js')

class EVENTS {

    static async triggerEvent(message) {



        Object.defineProperty(Array.prototype, 'flat', {
            value: function(depth = 1) {
                return this.reduce(function(flat, toFlatten) {
                    return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten);
                }, []);
            },
            configurable: true
        });


        let cont = message.content.slice(prefix.length).split(" ")
        let args = cont.slice(1)


        if (args[0] === null || args[1] === null) {
            message.reply(`Please use the correct syntax: .event game time`)
        }


        message.channel.send(`I've set the next event for the Game ${args[0]} at ${args[1]}.`)

        let eventEmbed = new Discord.MessageEmbed()
            .setTitle(`**EVENT**`)
            .setDescription(`EVENT: ${args[0]} WHEN?: ${args[1]}`)
            .setColor("#ff2050")
            .setFooter(`Event planned by ${message.author.username}`)

        message.channel.send({ embed: eventEmbed })
    }

}
module.exports = EVENTS
