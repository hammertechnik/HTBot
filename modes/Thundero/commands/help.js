const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let dmauth = message.author;

if (message.member.roles.has("597222640960405511")){

  let hEmbed = new Discord.RichEmbed()
  .setDescription("Help")
  .setColor("#7a1616")
  .addField("Moderation Commands", "addrole\n ban\n clear\n clearwarns\n kick\n prefix (Temporarily Removed)\n removerole\n report\n tempmute\n warn\n dmreply")
  .addField("Coin System Commands", "coins\n pay")
  .addField("Fun Commands", "say")
  .addField("Bot and Server Info", "botinfo\n serverinfo")

  message.delete().catch(O_o=>{});
  dmauth.send(hEmbed)
  message.channel.send("Check your DM's!").then(msg => {msg.delete(3000)});

} else if (message.member.roles.has("597220062675337226")) {

  let hEmbed = new Discord.RichEmbed()
  .setDescription("Help")
  .setColor("#7a1616")
  .addField("Moderation Commands", "addrole\n clear\n clearwarns\n kick\n removerole\n report\n tempmute\n warn\n dmreply")
  .addField("Coin System Commands", "coins\n pay")
  .addField("Fun Commands", "say")
  .addField("Bot and Server Info", "botinfo\n serverinfo")

  message.delete().catch(O_o=>{});
  dmauth.send(hEmbed)
  message.channel.send("Check your DM's!").then(msg => {msg.delete(3000)});

} else if (message.member.roles.has("597220814907113484")) {

  let hEmbed = new Discord.RichEmbed()
  .setDescription("Help")
  .setColor("#7a1616")
  .addField("Moderation Commands", "addrole\n clear\n clearwarns\n removerole\n report\n tempmute\n warn\n dmreply")
  .addField("Coin System Commands", "coins\n pay")
  .addField("Fun Commands", "say")
  .addField("Bot and Server Info", "botinfo\n serverinfo")

  message.delete().catch(O_o=>{});
  dmauth.send(hEmbed)
  message.channel.send("Check your DM's!").then(msg => {msg.delete(3000)});

} else {

  let hEmbed = new Discord.RichEmbed()
  .setDescription("Help")
  .setColor("#7a1616")
  .addField("Coin System Commands", "coins\n pay")
  .addField("Fun Commands", "say")
  .addField("Bot and Server Info", "botinfo\n serverinfo")

  message.delete().catch(O_o=>{});
  dmauth.send(hEmbed)
  message.channel.send("Check your DM's!").then(msg => {msg.delete(3000)});

};




}

module.exports.help = {
  name: "help"
}
