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
let btoa = require("btoa")
let headers = { 'Authorization': 'Basic ' + btoa(vrc_username + ':' + vrc_password), 'Content-Type': 'raw' }
let globalrank = null
let user = null


let endpoint = ""

let apiURL = "https://api.vrchat.cloud/api/1/"

class VRC {



    static async getLastestUploadedAvatars(message) {


        Object.defineProperty(Array.prototype, 'flat', {
            value: function(depth = 1) {
                return this.reduce(function(flat, toFlatten) {
                    return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten);
                }, []);
            },
            configurable: true
        });




        let apiKey = "&apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26"
        endpoint = "avatars?order=descending&sort=_created_at"
        try {
            await fetch(apiURL + endpoint + apiKey, { method: 'GET', headers: headers }, false)
                .then(response => response.json())
                .then(async(object) => {




                    let vrcEmbed = {}
                    let pages = []
                    let emojiList = []

                    for (var i = 0; i < object.length; i++) {
                        var today = new Date()
                        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
                        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
                        var dateTime = date + ' ' + time

                        const embed1 = new MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle('New Uploaded Avatar!')
                            .setURL(object[i]['assetUrl'])
                            .setAuthor(object[i]['authorName'])
                            .addField('VRCA', object[i]['assetUrl'], true)
                            .setThumbnail(object[i]['thumbnailImageUrl'])
                            .setImage(object[i]['imageUrl'])
                            .setTimestamp(object[i]['dateTime'])

                        pages.join()
                        pages.push(embed1)
                    }

                    console.log(pages)

                    paginationEmbed(message, pages)
                    return
                })
        } catch (error) {
            message.reply(error.message)
        }

    }



    static async setPlayerCount(object) {
        return object
    }


    static async getActivePlayersForBot(object) {
        let apiKey = "?apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26"
        endpoint = "visits"
        try {
            let myObject = null
            await fetch(apiURL + endpoint + apiKey, { method: 'GET', headers: headers }, false)
                .then(response => response.json())
                .then(async(object) => {
                    this.object = await object
                })
        } catch (err) {
            console.log(err.message)
        }
        return this.object
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

            if (tags.indexOf("troll") != -1) {
                return "Confirmed troll."
	    } else if (tags.indexOf("admin_moderator") != -1) {
		return "Administrator"
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

        Object.defineProperty(Array.prototype, 'flat', {
            value: function(depth = 1) {
                return this.reduce(function(flat, toFlatten) {
                    return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten);
                }, []);
            },
            configurable: true
        });

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
                            return
                        }




                        let bio = "";

                        let params = "RedRose User Search v3.0"



                        let vrcEmbed = {}
                        let pages = []
                        let emojiList = []

                        message.channel.send('Yoo, i found ' + object.length + ' users.')

                        for (var i = 0; i < object.length; i++) {
                            var today = new Date()
                            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
                            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
                            var dateTime = date + ' ' + time

                            let tags = object[i]['tags']

                            if (object[i]['bio'] == "" || object[i]['bio'] == null || object[i]['bio'] == undefined) {
                                bio = "none"
                            } else {
                                bio = object[i]['bio']
                            }
				
			    console.log('His Tags: ' + tags)
			    console.log('His devrank: ' + object[i]['developerType'])
			    
			    let lastPlatform = null
				
		            if(object[i]['last_platform'] == 'standalonewindows'){
			    lastPlatform = 'Windows'
			    }else{
			    lastPlatform = 'Oculus Quest'
			    }
			
			    let devtype = null
			    if(object[i]['developerType'] == 'none')
			    {
			    devtype = 'No'
			    }else{
			    devtype = object[i]['developerType']
			    }
				
			    console.log('Devtype: ' + devtype)
			    let trustrank = await tagsort(tags)
                            let thisTagsArray = []
			     
		            if(object[i]['tags'] === undefined || object[i]['tags'].length == 0)
			    {
			    thisTagsArray = 'none'
			    }else{
		            thisTagsArray = tags
			    }

			    const vrcEmbed = new MessageEmbed()
                                .setColor(color)
                                .setTitle(params)
                                .setURL("https://vrchat.com/home/user/" + object[i]['id'])
                                .setAuthor(object[i]['displayName'])
                                .setThumbnail(object[i]['currentAvatarThumbnailImageUrl'])
                                .setImage(object[i]['currentAvatarImageUrl'])
                                .addFields(
				{name: 'Bio', value: bio, inline: false},
				{name: 'Tags', value: thisTagsArray, inline: false},
                                {name: 'Trust Rank', value: trustrank, inline: true},
                                {name: 'Developer Type', value: devtype, inline: true},
                                {name: 'Last Platform', value: lastPlatform, inline: true},
				)
                                .setTimestamp(object[i]['dateTime'])

                            pages.join()
                            pages.push(vrcEmbed)
                        }


                        /*
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
                        */
                        paginationEmbed(message, pages)
                        return
                    }
                })
        } catch (ex) {
            message.channel.send(ex.message, "User not found. Please try again.")
        }
        console.log("Request Proceeded Successfully.")
    }




}
module.exports = VRC
