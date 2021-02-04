const Discord = require("discord.js");
const mysql = require("mysql");

module.exports.run = async (client, message, args, prefix, language, beta, con) => {

  let guild = message.guild;

  // Create a new text channel
  guild.createChannel('dm-requests', { type: 'text' })
    .catch(console.error);

  guild.createChannel('logs', { type: 'text' })
    .catch(console.error);

  guild.createChannel('incidents', { type: 'text' })
    .catch(console.error);

  return message.channel.send("Setup Complete! Enjoy Thundero!")


}

module.exports.help = {
  name: "setup"
}
