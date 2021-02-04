const Discord = require('discord.js')

const needed_permlvl = 5

module.exports.run = async (client, message, args) => {
    if (client.permlvl < needed_permlvl) return message.reply("doesnt look like you have the perms to do this!")

    const pic = client.user.displayAvatarURL;
    const name = client.user.username

    if (!args[0] || args[0] == 0) {
        message.reply("you forgot the Message and the Member!")
        message.delete()
        return
    }

    let userID = args[0].replace('<', '').replace('@', '').replace('!', '').replace('>', '');
    if (args.join(' ').replace(args[0], '') == 0) {
        message.reply("where is the message?")
        message.delete()
        return
    }

    client.users.get(userID)
        .send(args.join(' ').replace(args[0], ''))
    message.delete()
    console.log(`| ${message.author.tag} | replied  "${args.join(' ')}"`)
    return

}

module.exports.help = {
    name: "reply",
    permlvl: 5,
    description: "Reply to a DM Message",
    hidden: false,
    aliases: [],
    usage: "reply [DM-ID] [message]",
    category: "dev"
}