const Discord = require("discord.js");
const mysql = require("mysql");

module.exports.run = async (client, message, args, prefix, language, beta, con) => {

let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;

    message.delete().catch();

  con.query(`SELECT permlvl FROM dvbot WHERE id = '${target.id}'`, (err, rows) => {
    if (err) console.log(err);

    let permlvl = rows[0].permlvl;
    let permEmbed = new Discord.RichEmbed()
    .setAuthor(target.username)
    .setColor("#0000FF")
    .addField("<:twitch_by_rengatv_dccphrd250t:603040980014465044>", permlvl)
    .setFooter("Coded and Designed by the Slightly Smart Lord Bidoof!");

    message.channel.send(permEmbed);

})

}

module.exports.help = {
  name: "permlevel"
}
