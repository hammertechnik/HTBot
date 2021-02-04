const Discord = require("discord.js");
const mysql = require("mysql");

module.exports.run = async (client, message, args, prefix, language, beta, con) => {

let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;

con.query(`SELECT xp FROM thunderomain WHERE id = '${target.id}'`, (err, rows) => {
  if (err) console.log(err);

  let xp = rows[0].xp;
  let xpEmbed = new Discord.RichEmbed()
  .setAuthor(target.username)
  .setColor("#0000FF")
  .addField("<:02bf361d86d44b4b82558c132c5f6550:603041882196672591>", xp)
  .setFooter("Coded and Designed by the Slightly Smart Lord Bidoof!");

  message.channel.send(xpEmbed);
})

}

module.exports.help = {
  name: "xp"
}
