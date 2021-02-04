const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Serveur Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Nom du serveur", message.guild.name)
    .addField("Créé le", message.guild.createdAt)
    .addField("Vous avez rejoint le", message.member.joinedAt)
    .addField("Membres au total", message.guild.memberCount);

    message.channel.send(serverembed);
    message.delete()
}

module.exports.help = {
  name:"serverinfo"
}