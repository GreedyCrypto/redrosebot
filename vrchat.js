const {

    prefix,
    token,
    discordColors,
    vrc_username,
    vrc_password

} = require('./config.json')

const paginationEmbed = require('discord.js-pagination')
const { MessageEmbed } = require('discord.js');
let fetch = require('node-fetch')
    //const headers = { 'Content-Type': 'application/json' }
let btoa = require("btoa")
let headers = { 'Authorization': 'Basic ' + btoa(vrc_username + ':' + vrc_password), 'Content-Type': 'raw' }
let globalrank = null
let user = null

let endpoint = ""

let apiURL = "https://api.vrchat.cloud/api/1/"

class VRC {



    static async getLastestUploadedAvatars(message) {









        let apiKey = "&apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26"
        endpoint = "avatars?order=descending&sort=_created_at"
        try {
            await fetch(apiURL + endpoint + apiKey, { method: 'GET', headers: headers }, false)
                .then(response => response.json())
                .then(async(object) => {




                    let vrcEmbed = {}
                        //message.channel.send(object[i]['thumbnailImageUrl'])
                        //message.channel.send("By: " + object[i]['authorName'])
                        //message.channel.send("VRCA: " + object[i]['assetUrl'])

                    //const embed1 = new MessageEmbed()

                    let pages = []
                    let emojiList = []

                    for (var i = 0; i < 5; i++) {

                        var today = new Date()
                        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
                        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
                        var dateTime = date + ' ' + time




                        /*
                        vrcEmbed = {
                            "content": "Avatar",
                            "title": "New Avatar by: " + object[i]['authorName'],
                            "description": "VRCA: " + object[i]['assetUrl'],
                            "url": object[i]['assetUrl'],
                            "color": 3066993,
                            "timestamp": dateTime,
                            "image": {
                                "url": object[i]['imageUrl']
                            },
                            "thumbnail": {
                                "url": object[i]['thumbnailImageUrl']
                            }
                        }
                        */

                        const embed1 = new MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle('New Uploaded Avatar!')
                            .setURL(object[i]['assetUrl'])
                            .setAuthor(object[i]['authorName'])
                            .setDescription('VRCA: ' + object[i]['assetUrl'])
                            .setThumbnail(object[i]['thumbnailImageUrl'])
                            .setImage(object[i]['imageUrl'])
                            .setTimestamp(dateTime)



                        //
                        //channel.send({ embed: cuddleEmbed })
                        //message.channel.send({ embed: vrcEmbed })
                        pages.join()
                        pages.push(embed1)
                    }

                    console.log(pages)
                        //emojiList = ['⏪', '⏩']

                    paginationEmbed(message, pages)

                })
        } catch (error) {
            message.reply(error.message)
        }

        //https://api.vrchat.cloud/api/1/avatars?order=descending&sort=_created_at&apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26
    }



    static async getActivePlayers(message) {
        let apiKey = "?apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26"
        endpoint = "visits"
        try {
            await fetch(apiURL + endpoint + apiKey, { method: 'GET', headers: headers }, false)
                .then(response => response.json())
                .then(async function setData(object) {
                    return message.reply('Currently active players in VRChat: ' + object)
                })
        } catch (ex) {
            return message.reply(ex.message)
        }
    }


    static async getByUserName(message, args) {





        async function tagsort(tags) {
            console.log("Mein wert ist " + tags)
                // Check for null or undefined in IndexOf tags //

            if (tags.indexOf("troll") != -1) {
                return "Confirmed troll."
            } else if (tags.indexOf("system_legend") != -1) {
                return "Legendary User and appears as Trusted User"
            } else if (tags.indexOf("system_trust_legend") != -1) {
                return "Veteran User and appears as Trusted User"
            } else if (tags.indexOf("system_trust_veteran") != -1) {
                return "Trusted User"
            } else if (tags.indexOf("system_trust_trusted") != -1) {
                return "Known User"
            } else if (tags.indexOf("system_trust_known") != -1) {
                return "User"
            } else if (tags.indexOf("system_trust_basic") != -1) {
                return "New User"
            } else {
                return "Visitor"
            }
        }







        let end = false
        do {
            let searchuser = args
            let apiKey = "&apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26"
            endpoint = "users" + "?search=" + searchuser
            try {
                await fetch(apiURL + endpoint + apiKey, { method: 'GET', headers: headers }, false)
                    .then(response => response.json())
                    .then(async function setData(object) {
                        console.log(object)
                        if (object.length == 0) {
                            message.channel.send("I didn't found any user. Bazinga.")
                            end = true
                        } else {

                            var today = new Date()
                            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
                            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
                            var dateTime = date + ' ' + time



                            let colorRandomize = Math.floor(Math.random() * 24)
                            while (colorRandomize > 23) {
                                colorRandomize = Math.floor(Math.random() * 24)
                            }

                            let color = discordColors[colorRandomize]


                            if (object[0] == null) {
                                console.log("im undefined")
                                end = true
                                return
                            }


                            let tags = object[0]['tags']

                            let bio = "";

                            let params = "vrchat"

                            if (object[0]['bio'] == "" || object[0]['bio'] == null || object[0]['bio'] == undefined) {
                                bio = ""
                            } else {
                                bio = object[0]['bio']
                            }


                            let vrcEmbed = {
                                    "content": params,
                                    "title": object[0]['displayName'],
                                    "description": bio + " " + " | Rank: " + await tagsort(tags),
                                    "url": "https://vrchat.com/home/user/" + object[0]['id'],
                                    "color": color,
                                    "timestamp": dateTime,
                                    "image": {
                                        "url": object[0]['currentAvatarImageUrl']
                                    },
                                    "thumbnail": {
                                        "url": object[0]['currentAvatarThumbnailImageUrl']
                                    }
                                }
                                //channel.send({ embed: cuddleEmbed })
                            message.channel.send({ embed: vrcEmbed })

                            if (object[1] == null) {
                                console.log("im undefined")
                                end = true
                                return
                            }


                            let tags2 = object[1]['tags']

                            let bio1 = "";

                            let params1 = "vrchat"

                            if (object[1]['bio'] == "" || object[1]['bio'] == null || object[1]['bio'] == undefined) {
                                bio1 = ""
                            } else {
                                bio1 = object[1]['bio']
                            }

                            let vrcEmbed2 = {
                                "content": params1,
                                "title": object[1]['displayName'],
                                "description": bio1 + " " + " | Rank: " + await tagsort(tags2),
                                "url": "https://vrchat.com/home/user/" + object[1]['id'],
                                "color": color,
                                "timestamp": dateTime,
                                "image": {
                                    "url": object[1]['currentAvatarImageUrl']
                                },
                                "thumbnail": {
                                    "url": object[1]['currentAvatarThumbnailImageUrl']
                                }
                            }

                            //channel.send({ embed: cuddleEmbed })
                            message.channel.send({ embed: vrcEmbed2 })

                            if (object[2] == null) {
                                console.log("im undefined")
                                end = true
                                return
                            }



                            let tags3 = object[2]['tags']

                            let bio2 = "";

                            let params2 = "vrchat"

                            if (object[2]['bio'] == "" || object[2]['bio'] == null || object[2]['bio'] == undefined) {
                                bio2 = ""
                            } else {
                                bio2 = object[2]['bio']
                            }

                            let vrcEmbed3 = {
                                "content": params2,
                                "title": object[2]['displayName'],
                                "description": bio2 + " " + " | Rank: " + await tagsort(tags3),
                                "url": "https://vrchat.com/home/user/" + object[2]['id'],
                                "color": color,
                                "timestamp": dateTime,
                                "image": {
                                    "url": object[2]['currentAvatarImageUrl']
                                },
                                "thumbnail": {
                                    "url": object[2]['currentAvatarThumbnailImageUrl']
                                }
                            }

                            //channel.send({ embed: cuddleEmbed })
                            message.channel.send({ embed: vrcEmbed3 })

                            end = true
                        }
                    })
            } catch (ex) {
                message.channel.send(ex.message, "User not found. Please try again.")
                end = false
            }
        }
        while (end == false)
        console.log("Request Proceeded Successfully.")
    }




}
module.exports = VRC