const Discord = require("discord.js");

var debug = false

const langfile = require("../storage/translation/language.json")

let lan;

module.exports.run = async (client, message, args) => {

  let prefix = client.prefix
  let suggestchannel = client.suggestchannel

  if (client.language.get(message.guild.id) == "eng") {
    lan = langfile.english.suggest
  }
  if (client.language.get(message.guild.id) == "ger") {
    lan = langfile.german.suggest
  }
  if (client.language.get(message.guild.id) == "fr") {
    lan = langfile.french.suggest
  }
  if (client.language.get(message.guild.id) == "cz") {
    lan = langfile.czech.suggest
  }
  if (client.language.get(message.guild.id) == "ru") {
    lan = langfile.russian.suggest
  }

  const slicer = args.join(" ").indexOf("|")
  var title = args.join(" ").slice(0, slicer)
  const text = args.join(" ").replace(`${title}| `, "")

  if (!args || args < 1) return message.reply(lan.e1), message.delete();
  if (slicer == -1) return message.reply(`${lan.e2} \`\`${prefix}suggest title | description\`\``)

  const pic = client.user.displayAvatarURL;
  const authorpic = message.author.avatarURL
  const author = message.author.tag
  const name = client.user.username

  //if (!args || args < 1)return message.channel.send('you forgot ur suggestion along the way');


  var embed = new Discord.RichEmbed()
    //.setColor(746215)
    // .setTitle(`${lan.server} ${message.guild.name}`, message.guild.iconURL)
    .setColor('#00eedd')
    // .setDescription(`${lan.sb} ${author}`)
    .setTitle(`${lan.sb} ${author}`)
    .setFooter(`${name} ${lan.mb}`, pic)
    //.setFooter(`Kappa made by Hammer1279, suggested by ${message.author.tag} `, 'https://cdn.discordapp.com/attachments/488708867337748510/546066712118951940/kappa.png')
    .setTimestamp()
    //.setThumbnail('https://cdn.discordapp.com/attachments/488708867337748510/546066712118951940/kappa.png')
    //.setThumbnail(message.guild.iconURL)
    .setThumbnail(authorpic)
    //.addField(`Server: ${message.guild.name}`, args.join(" "), true)
    .addField(title, text)

  if (message.attachments.first()) embed.setImage(message.attachments.first().url)

  let qfetch
  client.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m => m.author.id === msg.author.id;
    await msg.channel.send(question).then(msg => { qfetch = msg })
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
      collected.first().delete(1000)
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };

  const response = await client.awaitReply(message, lan.question);

  if (lan.yes.includes(response.toLowerCase())) {
    message.channel.send(lan.send).then(msg => { msg.delete(60000) })
    //let suggestchannel = message.guild.channels.find(`name`, "suggestions");
    qfetch.delete(1000)
    message.delete(1000)
    client.channels.get(suggestchannel).send({ embed }).then(async msg => {
      await msg.react('👍');
      await msg.react('👎');
    });
  } else

    if (lan.no.includes(response)) {
      message.channel.send(lan.cancel);
    } else

      if (!response || response !== lan.yes || response !== lan.no) return message.channel.send(lan.again)


  console.log(`${message.author.tag} Sent a suggestion!`)

}

module.exports.help = {
  name: "suggest",
  permlvl: 1,
  description: "Send us a bot Suggestion",
  hidden: false,
  aliases: ["s"],
  usage: "suggest [title | description]",
  category: "misc"
}