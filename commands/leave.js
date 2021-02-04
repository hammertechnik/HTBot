// @ts-check
"use strict"

// @ts-ignore
const langfile = require("../storage/translation/language.json")

module.exports.run = async (client, message, args) => {

    let lan
    if (client.language.get(message.guild.id) == "eng") {
        lan = langfile.english.music.leave
    }
    if (client.language.get(message.guild.id) == "ger") {
        lan = langfile.german.music.leave
    }
    if (client.language.get(message.guild.id) == "fr") {
        lan = langfile.french.music.leave
    }
    if (client.language.get(message.guild.id) == "cz") {
        lan = langfile.czech.music.leave
    }
    if (client.language.get(message.guild.id) == "ru") {
        lan = langfile.russian.music.leave
    }

    const prefix = client.prefix

    if (message.member.voiceChannel) {//commander is in voiceChannel
        if (message.guild.voiceConnection) {//I'm in this voiceChannel
            if (message.member.voiceChannel.id === message.guild.voiceConnection.channel.id) {//ids of my Voicechannel and commander's one are same -> we are in the same voiceChannel
                message.channel.send(`${lan.left} <:voice:601378479274983424>${message.guild.voiceConnection.channel.name}`);
                message.member.voiceChannel.leave()
            }
            else {
                message.channel.send(lan.wrongchannel);
            }
        }
        else {
            message.channel.send(lan.already);
        }
    }
    else {
        message.channel.send(lan.nochannel);
    }
}

module.exports.help = {
    name: "leave",
    description: "Leaves the Voice Channel you are in!",
    aliases: [],
    permlvl: 1,
    hidden: false,
    category: "music",
    usage: "leave"
}