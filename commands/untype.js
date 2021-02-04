const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

    const devs = ["437999876828037158"];
    if (!~devs.indexOf(message.author.id)) {
        return (msg.reply("You are not allowed to use this command!"))
    }
    message.channel.stopTyping(true)
    message.delete()
}

module.exports.help = {
    name: "untype",
    permlvl: 5,
    description: "Stop Nova From Typing",
    hidden: false,
    aliases: [],
    usage: "untype",
    category: "dev"
}