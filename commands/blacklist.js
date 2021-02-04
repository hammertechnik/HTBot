const Discord = require('discord.js')

const needed_permlvl = 5

module.exports.run = async (client, message, args) => {
    if (client.permlvl < needed_permlvl) return message.reply("doesnt look like you have the perms to do this!")
    switch (args[0].toLowerCase()) {
        case "user": {
            let id = message.guild.members.get(args[1].replace("<", "").replace("@", "").replace("!", "").replace(">", "")).user.id
            client.blacklist.push("users", "515203855068299289")
        }
        case "server": { }
        default: { }
    }
}
module.exports.help = {
    name: "blacklist",
    permlvl: 5,
    description: "Blacklist a Server or User",
    hidden: false,
    aliases: [],
    usage: "blacklist [user|server] <UserID> [false|true]",
    category: "dev"
}
