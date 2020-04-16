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
 

let APIURL = "https://blockchain.info/stats?format=json"

class BLOCK {

    static async halving(client, message, args) {


        await fetch(APIURL, { method: "GET", headers: headers })
            .then((resp) => resp.json())
            .then((object) => {
            

                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date + ' ' + time;

                let currentBlock = object['n_blocks_total']
                let blocksLeft = (630000 - currentBlock)
                let minutesbetween = object['minutes_between_blocks']
                let minutesleft = (blocksLeft * minutesbetween)
                let hoursLeft = (minutesleft / 60)
                let daysLeft = (hoursLeft / 24)

                let params = "BLOCKINFORMATION"

                let offsetRandomize = Math.floor(Math.random() * 10)

                while(offsetRandomize > 5) {
                    offsetRandomize = Math.floor(Math.random() * 10)
                }
        
        
                let colorRandomize = Math.floor(Math.random() * 24)
                while(colorRandomize > 23){
                colorRandomize = Math.floor(Math.random() * 24)
                }

                let color = discordColors[colorRandomize]

                getImage(color, daysLeft, hoursLeft, minutesleft, blocksLeft, currentBlock, colorRandomize, offsetRandomize, params, dateTime)
        })





        async function getImage(color, daysLeft, hoursLeft, minutesleft, blocksLeft, currentBlock, colorRandomize, offsetRandomize, params, dateTime){
            let apiKey = giphy_apiKey
            let apiURL = "https://api.giphy.com/v1/gifs/search?limit=20&offset=" + offsetRandomize + "&q=" + "Bitcoin" + apiKey
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
            
            
            
                        let BlockEmbed = {
                            "content": params,
                            "title": "Block Halving Countdown",
                            "description": "Time left until 2020 halving: " + daysLeft.toFixed(0) + "days ",
                            "url": "https://www.bitcoinblockhalf.com/",
                            "color": color,
                            "timestamp": dateTime,
                            "image": {
                                "url": url
                            }
                        }
            
                        //channel.send({ embed: cuddleEmbed });
                        message.channel.send({ embed: BlockEmbed });
            
            
            
            
            
                    } catch (error) {
                        message.channel.send(error.message);
                    }
                })
                }
            
    }

}
module.exports = BLOCK