const Discord = require("discord.js");
const fs = require("fs");

const needed_permlvl = 3

module.exports.run = async (client, message, args) => {

  let prefix = client.prefix

  if (client.permlvl < needed_permlvl) return message.reply("doesnt look like you have the perms to do this!")

  // if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Dude, ur not a admin!");
  if (!args[0] || args[0 == "help"]) {
    message.reply(`Usage: ${prefix}prefix <desired prefix here>`);
    message.delete()
    return
  }

  let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8",));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./storage/prefixes.json", JSON.stringify(prefixes, null, '\t'), (err) => {
    if (err) console.log(err)
  });

  let sEmbed = new Discord.RichEmbed()
    .setColor("#FF9900")
    .setTitle("Prefix Set!")
    .setDescription(`Set to ${args[0]}`);

  message.channel.send(sEmbed).then(msg => { msg.delete(30000) })
  message.delete()

}
module.exports.help = {
  name: "prefix",
  permlvl: 3,
  description: "Change to Prefix of Nova",
  hidden: false,
  aliases: [],
  usage: "prefix [desired prefix]",
  category: "admin"
}