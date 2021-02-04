const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let sicon = message.guild.iconURL;
    let v = ""
    if (client.verified) { v = "<:verified:647128502650404864>" }
    let serverembed = new Discord.RichEmbed()
        .setDescription("Server Information")
        .setColor("#15f153")
        .setThumbnail(sicon)
        .addField("Server Name", `${message.guild.name} ${v}`)
        .addField("Created On", `${message.guild.createdAt}`)
        .addField("You Joined", `${message.member.joinedAt}`)
        .addField("Total Members", `${message.guild.memberCount}`)
    // .addField("Partner", ``)

    message.channel.send(serverembed);
    message.delete()
}

module.exports.help = {
    name: "serverinfo",
    permlvl: 1,
    description: "Show the Information about the Server.",
    hidden: false,
    aliases: ["si"],
    usage: "serverinfo",
    category: "info"
}