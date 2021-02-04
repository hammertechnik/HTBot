const Discord = require("discord.js");

const needed_permlvl = 2

module.exports.run = async (client, message, args) => {
  if (client.permlvl < needed_permlvl) return message.reply("doesnt look like you have the perms to do this!")

  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!kUser) return message.channel.send("Can't find user!");
  let kReason = args.join(" ").slice(22);
  // if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("No can do pal!");
  if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

  let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser.tag} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

  let kickChannel = message.guild.channels.find(`name`, "warnings");
  if (!kickChannel) return message.channel.send("Can't find warnings channel.");

  message.guild.member(kUser).kick(kReason);
  await client.users.get(kUser).send(`You have been Kicked from **${message.guild.name}** by <@${message.author.id}> for **${kReason}**!`)
  await kickChannel.send(kickEmbed);
  message.delete()
}

module.exports.help = {
  name: "kick",
  permlvl: 2,
  description: "Kick a user from a server",
  hidden: false,
  aliases: [],
  usage: "kick [@user] <reason>",
  category: "mod"
}