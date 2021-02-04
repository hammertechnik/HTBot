const Discord = require('discord.js')

const needed_permlvl = 2
const owner_overwrite = false

module.exports.run = async (client, message, args) => {
    if (client.permlvl < needed_permlvl) return message.reply("doesnt look like you have the perms to do this!")

    const pic = client.user.displayAvatarURL;
    const name = client.user.username

    // if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Doesn't look like you can use that.");

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

    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(args.join(' ').replace(args[0], ''))
        .setColor('#00cccc')
        .setTimestamp()
        .setFooter(`${name} made by Hammer1279`, pic)

    // client.users.get(userID).send(args.join(' ').replace(args[0], ''));

    if (owner_overwrite) {
        if (client.permlvl == 5) {
            client.users.get(userID)
                .send(args.join(' ').replace(args[0], ''))
            message.delete()
            console.log(`| ${message.author.tag} | masked dm  "${args.join(' ')}"`)
            return
        } else {
            client.users.get(userID).send(embed)
            message.delete()
            console.log(`| ${message.author.tag} | dm  "${args.join(' ')}"`)
        }
    } else {
        client.users.get(userID).send(embed)
        message.delete()
        console.log(`| ${message.author.tag} | dm  "${args.join(' ')}"`)
    }
}

module.exports.help = {
    name: "dm",
    permlvl: 2,
    description: "Send a Direct Message to a User",
    hidden: false,
    aliases: [],
    usage: "dm [@user] [message]",
    category: "mod"
}