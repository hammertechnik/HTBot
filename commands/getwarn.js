const discord = require("discord.js")

const needed_permlvl = 5

module.exports.run = async (client, message, args) => {
    if (client.permlvl < needed_permlvl) return

    let userID = args[0].replace('<', '').replace('@', '').replace('!', '').replace('>', '')
    let mention = message.guild.members.get(userID)

    if (!client.warnings.has(mention.user.id)) {
        message.reply(`${mention.user.displayName} isnt in the System yet!`)
        client.warnings.set(mention.user.id, 0)
    }

    message.reply(`${mention.user.username} has ${client.warnings.get(mention.user.id)}`)
}

module.exports.help = {
    name: "getwarn",
    permlvl: 5,
    description: "Get the Warns of a User",
    hidden: false,
    aliases: [],
    usage: "getwarn [@user]",
    category: "dev"
}