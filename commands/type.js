const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

    const devs = ["437999876828037158"];
    if (!~devs.indexOf(message.author.id)) {
        return (msg.reply("You are not allowed to use this command!"))
    }
    message.channel.startTyping()
    message.delete()
}

module.exports.help = {
    name: "type",
    permlvl: 5,
    description: "Make Nova Type",
    hidden: false,
    aliases: [],
    usage: "type",
    category: "dev"
}