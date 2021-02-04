// @ts-check

const fs = require('fs');
const Discord = require('discord.js');

const needed_permlvl = 5

module.exports.run = async (client, message, args) => {
  if (client.permlvl < needed_permlvl) return message.reply("doesnt look like you have the perms to do this!")

  const pic = client.user.displayAvatarURL;
  const name = client.user.username;
  const hpic = "https://cdn.discordapp.com/attachments/546008503299604508/564516393475899402/hammernew.png";

  const list = JSON.parse(fs.readFileSync("./storage/update.json", "utf8",))

  let guildsList = client.guilds.array();

  if (!args[0]) return (message.channel.send('Seems like you forgot to add the actuall update here').then(msg => msg.delete(5000)))

  const date = Date().slice(8, 10)
  const month = Date().slice(4, 7)
  const year = Date().slice(11, 15)
  const clock = Date().slice(16, 21)
  const datum = `${date} ${month} ${year} ${clock}`

  const embed = new Discord.RichEmbed()
    .setColor("#ff0000")
    //.attachFiles([`content/hammer.png`])
    //.setTimestamp()
    .setThumbnail(pic)
    .setFooter(`${message.author.username} | ${datum}`, hpic/*"attachment://hammer.png"*/)
    .addField(`${name} Update News`, args.join(" "))

  guildsList.forEach(guild => {
    if (!list[guild.id]) return;
    let notChannel = list[guild.id].bot;
    if (notChannel == 'disabled' || notChannel == undefined) return;
    client.channels.get(notChannel).send(embed)
  });
}

module.exports.help = {
  name: "botupdate",
  permlvl: 5,
  description: "Puts Bot Update Info Up",
  hidden: false,
  aliases: [],
  usage: "botupdate",
  category: "dev"
}