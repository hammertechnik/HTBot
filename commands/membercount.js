const Discord = require("discord.js");

const langfile = require("../storage/translation/language.json")

let lan;

module.exports.run = async (client, message, args) => {

  let prefix = client.prefix
  let suggestchannel = client.suggestchannel

  if (client.language == "eng") {
    lan = langfile.english.membercount
  }
  if (client.language == "ger") {
    lan = langfile.german.membercount
  }
  if (client.language == "fr") {
    lan = langfile.french.membercount
  }
  if (client.language == "cz") {
    lan = langfile.czech.membercount
  }
  if (client.language == "ru") {
    lan = langfile.russian.membercount
  }
  message.channel.send(`This Server has ${message.guild.members.size} Members!`)
  message.delete()
}

module.exports.help = {
  name: "membercount",
  permlvl: 1,
  description: "Shows the Member for your Server!",
  hidden: false,
  aliases: ["mc"],
  usage: "membercount",
  category: "info"
}