const Discord = require("discord.js");
const fs = require("fs");

const langfile = require("../storage/translation/language.json")

let lan;

const needed_permlvl = 3

module.exports.run = async (client, message, args) => {

  if (client.language == "eng") {
    lan = langfile.english.set.mute
  }
  if (client.language == "ger") {
    lan = langfile.german.set.mute
  }
  if (client.language == "fr") {
    lan = langfile.french.set.mute
  }
  if (client.language == "cz") {
    lan = langfile.czech.set.mute
  }
  if (client.language == "ru") {
    lan = langfile.russian.set.mute
  }

  if (client.permlvl < needed_permlvl) return message.reply("doesnt look like you have the perms to do this!")
  // if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(lan.e1);

  if (!args || args < 1) return message.channel.send(lan.e2); message.delete();

  if (args[0] == "create") {
    try {
      muterole = await message.guild.createRole({
        name: "Muted",
        mentionable: true,
        color: "#595959",
        permissions: []
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
    message.delete()
    message.reply(lan.created)
    return
  }

  let roleID = args[0].replace('<', '').replace('@', '').replace('&', '').replace('>', '');

  if (!message.guild.roles.has(roleID)) {
    message.reply(lan.e3)
    message.delete()
    return
  }

  client.mute.set(message.guild.id, roleID)

  const embed = new Discord.RichEmbed()
    .setColor("#FF9900")
    .setTitle(lan.m1)
    .setDescription(`${lan.m2} <@&${roleID}>`);

  await message.channel.send(embed).then(msg => { msg.delete(30000) })

}

module.exports.help = {
  name: "muterole",
  permlvl: 3,
  description: "Set or Create a role for muted members",
  hidden: false,
  aliases: [],
  usage: "muterole [@role] <create>",
  category: "admin"
}