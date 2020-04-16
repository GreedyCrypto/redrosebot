const {

    prefix,
    giphy_apiKey

} = require('./config.json');

let fetch = require('node-fetch')
const headers = { 'Content-Type': 'application/json' }
const Discord = require('discord.js')

let APIURL = "https://blockchain.info/stats?format=json"

class BLOCK {

    static async halving(client, message, args) {


        await fetch(APIURL, { method: "GET", headers: headers })
            .then((resp) => resp.json())
            .then((object) => {
            
                let currentBlock = object['n_blocks_total']
                let blocksLeft = (630000 - currentBlock)
                let minutesbetween = object['minutes_between_blocks']
                let minutesleft = (blocksLeft * minutesbetween)
                let hoursLeft = (minutesleft / 60)
                let daysLeft = (hoursLeft / 24)

                message.channel.send("Blocks remaining until halving: " + blocksLeft)
                message.channel.send("Approx Minutes until halving: " + minutesleft)
                message.channel.send("Approx Hours until halving: " + hoursLeft)
                message.channel.send("Approx Days until halving: " + daysLeft)
        })
    }

}
module.exports = BLOCK