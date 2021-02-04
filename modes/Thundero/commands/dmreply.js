const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let dmid = message.guild.members.get(args[0]);
  if(!dmid) {
    return message.channel.send("You must include a User ID!")
  };
  const dmMessagep1 = args.join(" ");
  const dmMessage = dmMessagep1.slice(19);
  if(!dmMessage) {
    return message.channel.send("You have not included a message in your Reply!")
  }

  let dmreplyembed = new Discord.RichEmbed()
  .setDescription("Your Support is Here!")
  .setColor("#00ff3c")
  .addField("Supporting Staff", message.author.username)
  .addField("Their Response...", dmMessage);

  dmid.send(dmreplyembed);
}

module.exports.help = {
  name: "dmreply"
}
