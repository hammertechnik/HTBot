// @ts-nocheck
"use strict"
const YTDL = require("ytdl-core");
const Discord = require('discord.js')

const langfile = require("../storage/translation/language.json")

module.exports.run = async (client, message, args) => {

    let lan
    if (client.language == "eng") {
        lan = langfile.english.music.queue
    }
    if (client.language == "ger") {
        lan = langfile.german.music.queue
    }
    if (client.language == "fr") {
        lan = langfile.french.music.queue
    }
    if (client.language == "cz") {
        lan = langfile.czech.music.queue
    }
    if (client.language == "ru") {
        lan = langfile.russian.music.queue
    }

    const prefix = client.prefix

    if (!global.servers[message.guild.id]) {
        return message.reply("play some music first!")
    }
    if (!message.guild.voiceConnection) return message.reply("its empty?")
    // message.channel.send(lan)
    let equeue = []
    let rqueue = global.servers[message.guild.id].queue
    let c = 0
    rqueue.forEach(i => {
        c++
        if (c == 6) return equeue.push(`Next 5 Songs from ${c} Songs:`)
        if (c > 6) return
        YTDL.getInfo(i, (err, info) => {
            equeue.push(`${info.author.name} - ${info.title}`)
        })
    })
    // for (let item of global.servers[message.guild.id].queue) {
    //     YTDL.getInfo(item, async(err, info) => {
    //         await equeue.push(`${info.author.name} - ${info.title}`)
    //         // setTimeout(()=>{
    //         // message.channel.send(info.author.name + " - " + info.title);
    //         // }, 1000)
    //     });
    // }
    const lembed = new Discord.RichEmbed()
        .setTitle(`Fetching Queue...`)
        .setColor("#ff0000")
        .setFooter(`${client.user.username} made by HT`)
        .setTimestamp()
    message.channel.send(lembed).then(msg => {
        setTimeout(() => {
            const embed = new Discord.RichEmbed()
                .setTitle(`Queue for ${message.guild.name}:`)
                .setDescription(equeue.join("\n"))
                .setColor("#ff0000")
                .setFooter(`${client.user.username} made by HT`)
                .setTimestamp()
            msg.edit(embed)
        }, 1000)
    })
    // message.channel.send("------------");

    // for (let item of global.servers[message.guild.id].queue) {
    //     var songs = {};

    //     YTDL.getInfo(item, (err, info) => {
    //         songs.push(info.author.name + " - " + info.title + "\n")
    //     });
    // message.channel.send("------------" + songs);
    //}
}

module.exports.help = {
    name: "queue",
    description: "Shows queue of music.",
    aliases: [],
    permlvl: 1,
    hidden: false,
    category: "music",
    usage: "queue"
}