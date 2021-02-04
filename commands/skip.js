const langfile = require("../storage/translation/language.json")

module.exports.run = async (client, message, args) => {

    let lan
    if (client.language.get(message.guild.id) == "eng") {
        lan = langfile.english.music.skip
    }
    if (client.language.get(message.guild.id) == "ger") {
        lan = langfile.german.music.skip
    }
    if (client.language.get(message.guild.id) == "fr") {
        lan = langfile.french.music.skip
    }
    if (client.language.get(message.guild.id) == "cz") {
        lan = langfile.czech.music.skip
    }
    if (client.language.get(message.guild.id) == "ru") {
        lan = langfile.russian.music.skip
    }

    const prefix = client.prefix

    if (message.member.voiceChannel) {//commander is in voiceChannel
        if (message.guild.voiceConnection) {//I'm in voiceChannel
            if (message.member.voiceChannel.id === message.guild.voiceConnection.channel.id) {//IDs of my Voicechannel and commander's one are same -> we are in the same voiceChannel
                if (!global.servers[message.guild.id]) {//If this server isn't in my server list, I'll add it
                    global.servers[message.guild.id] = { queue: [String] }//And create queue for it
                }
                else {
                    if (global.servers[message.guild.id].queue[0] != "undefined") {
                        message.channel.send(`${lan.skip} :+1:!`);
                        message.guild.voiceConnection.dispatcher.end(`${lan.by} ${message.author.username}`);
                    }
                    else {
                        message.channel.send(lan.nosong);
                    }

                }
            }
            else {
                message.channel.send(lan.wrongchannel);
            }
        }
        else {
            message.channel.send(lan.empty);
        }
    }
    else {
        message.channel.send(lan.nochannel);
    }
}

module.exports.help = {
    name: "skip",
    description: "Skips current song",
    aliases: [],
    permlvl: 1,
    hidden: false,
    category: "music",
    usage: "skip"
}