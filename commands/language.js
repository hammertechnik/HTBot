const Discord = require("discord.js");
const fs = require("fs");

const needed_permlvl = 3

module.exports.run = async (client, message, args) => {

  if (client.permlvl < 5) return message.reply("language system has been disabled till it gets fixed")

  let prefix = client.prefix

  if (args[0]) {
    if (client.permlvl < needed_permlvl) {
      message.reply("Dude, ur not a admin!")
      message.delete()
      return
    };
  }
  if (args[0] == "help") {
    message.reply(`Usage: ${prefix}language <desired language here>`);
    message.delete()
    return
  }

  let lan = JSON.parse(fs.readFileSync("./storage/languages.json", "utf8",));
  let slan;
  let lang;
  let rlan;
  let tlan
  if (client.language.has(message.guild.id)) {
    tlan = client.language.get(message.guild.id)
  } else {
    tlan = "eng"
  }
  if (tlan == "eng") {
    rlan = "English"
  }
  if (tlan == "ger") {
    rlan = "German"
  }
  if (tlan == "fr") {
    rlan = "French"
  }
  if (tlan == "cz") {
    rlan = "Czech"
  }
  if (tlan == "ru") {
    rlan = "Russian"
  }

  if (!args[0]) {
    message.delete()
    message.reply(`current language: **${rlan}**`).then(m => { m.delete(2500) })
    return
  }
  const input = args[0].toLowerCase()
  switch (input) {

    case "english": {
      slan = "eng"
      lang = "english"
      break
    }

    case "eng": {
      slan = "eng"
      lang = "english"
      break
    }

    case "german": {
      slan = "ger"
      lang = "german"
      break
    }

    case "ger": {
      slan = "ger"
      lang = "german"
      break
    }

    case "french": {
      slan = "fr"
      lang = "french"
      break
    }

    case "fr": {
      slan = "fr"
      lang = "french"
      break
    }

    case "czech": {
      slan = "cz"
      lang = "czech"
      break
    }

    case "cz": {
      slan = "cz"
      lang = "czech"
      break
    }

    case "russian": {
      slan = "ru"
      lang = "russian"
      break
    }

    case "ru": {
      slan = "ru"
      lang = "russian"
      break
    }

    default: {
      message.reply("this language is not saved in the system!")
      return;
    }
  }


  client.language.set(message.guild.id, slan)

  let sEmbed = new Discord.RichEmbed()
    .setColor("#FF9900")
    .setTitle("Language Set!")
    .setDescription(`Set to ${lang}`);

  message.channel.send(sEmbed).then(msg => { msg.delete(30000) })
  message.delete()

}

module.exports.help = {
  name: "language",
  permlvl: 3,
  description: "Changes Language of Nova [D]",
  hidden: false,
  aliases: ["lang"],
  usage: "lang [desired language]",
  category: "admin"
}
