const langfile = require("../storage/translation/language.json")

module.exports.run = async (client, message, args) => {
    if (!client.premium) {

    }

    const prefix = client.prefix

    let lan
    if (client.language == "eng") {
        lan = langfile.english.music.resume
    }
    if (client.language == "ger") {
        lan = langfile.german.music.resume
    }
    if (client.language == "fr") {
        lan = langfile.french.music.resume
    }
    if (client.language == "cz") {
        lan = langfile.czech.music.resume
    }
    if (client.language == "ru") {
        lan = langfile.russian.music.resume
    }

    if (message.member.voiceChannel) {//commander is in voiceChannel
        if (message.guild.voiceConnection) {//I'm in voiceChannel
            if (message.member.voiceChannel.id === message.guild.voiceConnection.channel.id) {//IDs of my Voicechannel and commander's one are same -> we are in the same voiceChannel
                message.guild.voiceConnection.dispatcher.setPaused(false);
                message.guild.voiceConnection.dispatcher.resume();
                message.channel.send(lan.toggle)
            }
            else {
                message.channel.send(lan.wrongchannel);
            }
        }
        else {
            message.channel.send(lan.nomusic);
        }
    }
    else {
        message.channel.send(lan.nochannel);
    }
}

module.exports.help = {
    name: "resume",
    description: "Resumes the Music",
    aliases: [],
    permlvl: 1,
    hidden: false,
    category: "music",
    usage: "resume"
}