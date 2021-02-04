const Discord = require("discord.js");

const pic = "https://tenor.com/view/battlefieldfriends-promoted-neebs-gif-9659776"

module.exports.run = async (client, message, args) => {

    let ran = Math.floor(Math.random() * (99 + 1));

    var superagent = require("superagent")
    let { body } = await superagent.get("https://meme-api.herokuapp.com/gimme").catch(e => { message.reply(`${e}`) })

    let embed = new Discord.RichEmbed()
        .setTitle(body.title)
        .setImage(body.url)
        .setColor("RANDOM")
    //.setColor("#ff4500")

    message.channel.send(embed)
    message.delete()
}

module.exports.help = {
    name: "meme",
    permlvl: 1,
    description: "Show a Meme",
    hidden: false,
    aliases: ["m"],
    usage: "meme",
    category: "misc"
}