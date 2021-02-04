const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    if (!client.premium) {

    }
    if (args[0] == "unlock") {
        if (client.permlvl == 5) {
            let volume = Number(args[1])
            if (!volume) return message.reply(`ur a dev, how did u f*ck this up?`)
            let vol = Number(args[1]) / 100
            global.dispatcher.setVolumeLogarithmic(vol)
            global.volume.set(message.guild.id, vol)
            message.channel.send(`<:voice:601378479274983424> **Volume Changed to ${volume}%**`)
            return
        }
    }
    if (message.member.voiceChannel) {//commander is in voiceChannel
        if (message.guild.voiceConnection) {//I'm in voiceChannel
            if (message.member.voiceChannel.id === message.guild.voiceConnection.channel.id) {//IDs of my Voicechannel and commander's one are same -> we are in the same voiceChannel
                let volume
                if (args[0] == "unlock") { message.reply("thats nothing u can use dumbass"); volume = Number(args[1]); } else { volume = Number(args[0]) }
                if (!volume || volume < 1 || volume > 150) { return message.channel.send(`⛔ **Choose a Number between 1 and 150!**`) }
                let vol = Number(args[0]) / 100
                global.dispatcher.setVolumeLogarithmic(vol)
                global.volume.set(message.guild.id, vol)
                message.channel.send(`<:voice:601378479274983424> **Volume Changed to ${volume}%**`)
            }
            else {
                message.channel.send("⛔ You must be in the same channel as I'm, to use this command");
            }
        }
        else {
            message.channel.send("I'm not playing any Music!")
        }
    }
    else {
        message.channel.send("Listen to Music and i might consider listening to you.")
        return
    }

}
module.exports.help = {
    name: "volume",
    permlvl: 1,
    description: "Change the Volume of the Music",
    hidden: false,
    aliases: ["vol"],
    usage: "volume [1-150%]",
    category: "music"
}