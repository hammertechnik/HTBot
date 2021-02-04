const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.roles.has("597290533496422403")) return message.channel.send("You need to be a High Ranking Staff for this!").then(msg => {msg.delete(3000)});
  let pMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (pMember.roles.has("597220814907113484")) {
    pMember.addRole("597220062675337226")
  }

}

module.exports.help = {
  name: "promote"
}
