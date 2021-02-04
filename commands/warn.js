const discord = require("discord.js")

const needed_permlvl = 2

module.exports.run = async (client, message, args) => {
    if (client.permlvl < needed_permlvl) return

    let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    let userID = args[0].replace('<', '').replace('@', '').replace('!', '').replace('>', '')
    let wReason = args.join(" ").slice(22);

    let warnEmbed = new discord.RichEmbed()
        .setDescription("Warn")
        .setColor("#ffcc33")
        .addField("Warned User", `${wUser} with ID ${wUser.id}`)
        .addField("Warned by", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Warned in", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", wReason)
        .addField("Number of Warns", client.warnings.get(message.guild.id, userID) + 1)

    let warnChannel = message.guild.channels.find(`name`, "warnings");
    if (!warnChannel) return message.channel.send("Can't find warnings channel.");

    warnChannel.send(warnEmbed);
    client.warnings.set(message.guild.id, (client.warnings.get(message.guild.id, userID) + 1), userID)
    client.users.get(userID).send(`You have been Warned for **${wReason}** in **${message.guild.name}** by <@${message.author.id}>!`)
    message.delete()
}

module.exports.help = {
    name: "warn",
    permlvl: 2,
    description: "Warn a User",
    hidden: false,
    aliases: [],
    usage: "warn [@user] <reason>",
    category: "mod"
}