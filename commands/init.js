const Discord = require("discord.js");
const fs = require("fs");

const needed_permlvl = 5

module.exports.run = async (client, message, args) => {
  if (client.permlvl < needed_permlvl) return
  if (!args[0]) return message.reply("no cmd provided")
  const clean = text => {
    if (typeof (text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
      return text;
  }
  try {
    delete require.cache[require.resolve(`./${args[0]}.js`)];
    const props = require(`./${args[0]}.js`).help;
    client.commands.set(props.name, props);
    props.aliases.forEach(a => {
      client.aliases.set(a, props.name)
    })
    message.reply(`Inititated **${props.name}**!`)
  } catch (err) { message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``) }
}

module.exports.help = {
  name: "init",
  permlvl: 5,
  description: "Init a new Command",
  hidden: false,
  aliases: [],
  usage: "init [cmd name]",
  category: "dev"
}