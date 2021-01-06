const {
finance_apiKey,
discordColors
} = require("./config.json")


const paginationEmbed = require('discord.js-pagination')
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const createChart = require('lightweight-charts')

let messageImageObject = null

let chart = createChart(messageImageObject, { width: 200, height: 100});
const lineSeries = chart.addLineSeries()

let params = ""
let action = ""
let extra = ""
//let apiKey = giphy_apiKey
let apiKey = tenor_apiKey
var today = new Date()
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
var dateTime = date + ' ' + time


class FINANCIALS {

static async finance(descriminator, args){

    lineSeries.setData([
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 },
        { time: '2019-04-20', value: 74.43 },
    ])
    await buildChart()
}


static async buildChart(){


    let colorRandomize = Math.floor(Math.random() * 24)
    while (colorRandomize > 23) {
        colorRandomize = Math.floor(Math.random() * 24)
    }


    let color = discordColors[colorRandomize]


    Object.defineProperty(Array.prototype, 'flat', {
        value: function(depth = 1) {
            return this.reduce(function(flat, toFlatten) {
                return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten);
            }, []);
        },
        configurable: true
    });

    // Build Chart Test

    let chartEmbed = {
        "content": params,
        "title": "test",
        "description": "tetst",
        "url": "https://discordapp.com",
        "color": color,
        "timestamp": dateTime,
        "image": {
            "url": chart
        }
    }

    //channel.send({ embed: cuddleEmbed })
    message.channel.send({ embed: chartEmbed })





}




async getDescInfo(descriminator, args){




    
await fetch(apiURL, {method: "GET", headers: headers})
.then((resp) => resp.json)
.then((obj) => {
console.log(obj)
})

}





}
module.exports = FINANCIALS


