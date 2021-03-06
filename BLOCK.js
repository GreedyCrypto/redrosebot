const {

    prefix,
    giphy_apiKey,
    discordColors,
    cmc_apiKey

} = require('./config.json')

let fetch = require('node-fetch')
const headers = { 'Content-Type': 'application/json' }
const Discord = require('discord.js')


let APIURL = "https://blockchain.info/stats?format=json"

class BLOCK {




    static async btc_current_price(client, message, args) {
        let headersCMC = { 'Content-Type': 'application/json' }
        let endpoint = "cryptocurrency/quotes/latest"
        let query = "?id=1"
        let apiURLCMC = "https://pro-api.coinmarketcap.com/v1/" + endpoint + query + "&CMC_PRO_API_KEY=" + cmc_apiKey
        await fetch(apiURLCMC, { method: "GET", headers: headersCMC })
            .then((resp) => resp.json())
            .then((object) => {
                try {
                    message.reply('Current Bitcoin price: ' + object['data']['1']['quote']['USD']['price'].toFixed(2) + ' USD')
                } catch (err) {
                    message.reply(err.message)
                }
            })
    }





    static async halving(client, message, args) {


        await fetch(APIURL, { method: "GET", headers: headers })
            .then((resp) => resp.json())
            .then((object) => {


                var today = new Date()
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
                var dateTime = date + ' ' + time

                let currentBlock = object['n_blocks_total']
                let blocksLeft = (630000 - currentBlock)
                let minutesbetween = object['minutes_between_blocks']
                let minutesleft = (blocksLeft * minutesbetween)
                let hoursLeft = (minutesleft / 60)
                let daysLeft = (hoursLeft / 24)

                if (daysLeft <= 5) {
                    message.channel.send('**WARNING**: LESS THEN 5 DAYS LEFT UNTIL HALVENING!')
                } else if (daysLeft <= 3) {
                    message.channel.send('**WARNING**: LESS THEN 3 DAYS LEFT UNTIL HALVENING!, MAKE SURE YOU ARE INVESTED NOW')
                } else if (daysLeft <= 1) {
                    message.channel.send('**GET READY**: BITCOIN HALVENING INCOMING!!')
                } else if (daysLeft < 1 && hoursLeft < 5) {
                    message.channel.send('**ITS HAPPENING**: BITCOIN HALVENING IN UNDER A DAY / UNDER 5 HOURS LEFT!!')
                }

                let params = "BLOCKINFORMATION"

                let offsetRandomize = Math.floor(Math.random() * 10)

                while (offsetRandomize > 5) {
                    offsetRandomize = Math.floor(Math.random() * 10)
                }


                let colorRandomize = Math.floor(Math.random() * 24)
                while (colorRandomize > 23) {
                    colorRandomize = Math.floor(Math.random() * 24)
                }

                let color = discordColors[colorRandomize]

                getImage(color, daysLeft, hoursLeft, minutesleft, blocksLeft, currentBlock, colorRandomize, offsetRandomize, params, dateTime, args)
            })





        async function getImage(color, daysLeft, hoursLeft, minutesleft, blocksLeft, currentBlock, colorRandomize, offsetRandomize, params, dateTime, args) {
            let apiKey = giphy_apiKey
            let apiURL = "https://api.giphy.com/v1/gifs/search?limit=20&offset=" + offsetRandomize + "&q=" + "Buy+Bitcoin" + apiKey
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
                        } else if (object['data'][random]['images']['original']['url'] != undefined) {
                            coderun = true
                        } else {
                            coderun = true
                            break
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

                        //message.channel.send({ myEmbed })
                        let url = object['data'][random]['images']['original']['url']

                        let timeLeft = daysLeft.toFixed(0)

                        if (timeLeft === 0 || timeLeft < 1) {
                            timeLeft = hoursLeft.toFixed(0) + ' hours'
                        }

                        if (hoursLeft < 0) {
                            timeLeft = minutesleft.toFixed(0) + ' minutes'
                        }



                        let BlockEmbed = {
                            "content": params,
                            "title": "Block Halving Countdown | Blocks left: " + blocksLeft,
                            "description": "Estimated time left until 2020 halving: " + timeLeft,
                            "url": "https://www.bitcoinblockhalf.com/",
                            "color": color,
                            "timestamp": dateTime,
                            "image": {
                                "url": url
                            }
                        }

                        //channel.send({ embed: cuddleEmbed })
                        if (args === 'IAMBOT') {
                            client.channels.cache.get('698561456354099250').send({ embed: BlockEmbed })
                        } else {
                            message.channel.send({ embed: BlockEmbed })
                        }




                    } catch (error) {
                        message.channel.send(error.message)
                    }
                })
        }

    }

}
module.exports = BLOCK