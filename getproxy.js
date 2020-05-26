const fetch = require("node-fetch");
var download = require('download-file');
var toJSON = require('plain-text-data-to-json');
var fs = require('fs');
const removeDuplicateLines = require('remove-duplicate-lines');
const readline = require('readline')

class GETPROXY {
    static async getData(prxy) {
        var url = "https://api.proxyscrape.com/?request=getproxies&proxytype=http&timeout=10000&country=all&ssl=all&anonymity=all"

        var options = {
            directory: "./",
            filename: "current_proxy.txt"
        }

        var currentPRXY = null;

        var prxy = await download(url, options, function(err, prxy) {

                if (err) console.log(err.message)
                console.log('meow');
            })
            // compile to json

        const fileStream = fs.createReadStream('current_proxy.txt');

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        // Note: we use the crlfDelay option to recognize all instances of CR LF
        // ('\r\n') in input.txt as a single line break.

        var objectarray = []

        for await (const line of rl) {
            // Each line in input.txt will be successively available here as `line`.
            //console.log(`Line from file: ${line}`);
            await objectarray.push(line);
        }
        console.log(objectarray)

        var jsonobject = await JSON.stringify(objectarray)
        console.log(jsonobject)
        await fs.writeFileSync('output.json', JSON.parse(jsonobject) + '\n')

        // can implement this in another fiile to get the proxy instead of running the class

        await fs.readFile('./output.json', 'utf8', async(err, jsonString, currentPRXY) => {
            if (err) {
                console.log("File read failed:", err)
                return
            }
            console.log('File data:', jsonString)

            var randomProxyArray = []

            randomProxyArray = await jsonString.split(',').slice(1)
            console.log("I got random Proxy: " + randomProxyArray[5])
            currentPRXY = randomProxyArray[5]

        }, currentPRXY)

    }



}
module.exports = GETPROXY