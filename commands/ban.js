const Discord = require("discord.js");

const needed_permlvl = 2

module.exports.run = async (client, message, args) => {
    if (client.permlvl < needed_permlvl) return message.reply("doesnt look like you have the perms to do this!")

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    // if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No can do pal!");
    if (bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be banned!");

    let banEmbed = new Discord.RichEmbed()
        .setDescription("Ban")
        .setColor("#bc0000")
        .addField("Banned User", `${bUser.tag} with ID ${bUser.id}`)
        .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Banned In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "warnings");
    if (!incidentchannel) return message.channel.send("Can't find warnings channel.");

    message.guild.member(bUser).ban(bReason);
    client.users.get(bUser).send(`You have been Banned from **${message.guild.name}** by <@${message.author.id}> for **${bReason}**!`)
    incidentchannel.send(banEmbed);
}

module.exports.help = {
    name: "ban",
    permlvl: 2,
    description: "Ban a User",
    hidden: false,
    aliases: [],
    usage: "ban @user",
    category: "mod"
}