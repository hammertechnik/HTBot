// @ts-check
"use strict"

// @ts-ignore
const langfile = require("../storage/translation/language.json")

module.exports.run = async (client, message, args) => {

    let lan
    if (client.language.get(message.guild.id) == "eng") {
        lan = langfile.english.music.join
    }
    if (client.language.get(message.guild.id) == "ger") {
        lan = langfile.german.music.join
    }
    if (client.language.get(message.guild.id) == "fr") {
        lan = langfile.french.music.join
    }
    if (client.language.get(message.guild.id) == "cz") {
        lan = langfile.czech.music.join
    }
    if (client.language.get(message.guild.id) == "ru") {
        lan = langfile.russian.music.join
    }

    const prefix = client.prefix

    if (message.member.voiceChannel) {//commander is in voiceChannel
        if (!message.member.voiceChannel.full) {//commander's voiceChannel is not full
            if (!message.guild.voiceConnection) {//I'm not in voiceChannel
                message.member.voiceChannel.join()
                    .then(connection => {
                        message.channel.send(`${lan.join} <:voice:601378479274983424>${connection.channel.name}`)
                    })
                    .catch(console.log);
            }
            else {
                message.channel.send(lan.already);
            }
        }
        else {
            message.channel.send(lan.full);
        }
    }
    else {
        message.channel.send(lan.nochannel);
    }
}

module.exports.help = {
    name: "join",
    permlvl: 1,
    description: "Join the Voice Channel you are in!",
    hidden: false,
    aliases: [],
    usage: "join",
    category: "music"
}