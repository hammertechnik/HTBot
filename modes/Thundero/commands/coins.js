const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if(!client.coins.has(message.guild.id, message.author.id))return message.reply("u r too poor!")

  let coinEmbed = new Discord.RichEmbed()
  .setAuthor()
  .setColor("#0000FF")
  .addField("💰", client.coins.get(message.guild.id, message.author.id))
  .setFooter("Coded and Designed by HammerTechnik!");

  message.channel.send(coinEmbed).then(msg => {msg.delete(8000)});

}

module.exports.help = {
  name: "coins"
}