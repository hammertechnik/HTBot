const Discord = require("discord.js");
const mysql = require("mysql");

module.exports.run = async (client, message, args, prefix, language, beta, con) => {

  let guild = message.guild;
  let channel = client.channels.find("name", "logs");
  let channel1 = client.channels.find("name", "incidents");
  let channel2 = client.channels.find("name", "dm-requests");

  if(!message.member.roles.has("617898653390209034")) return message.channel.send("No you Pathetic Pesent");

  // Create a new text channel
  channel.delete()
    .catch(console.error);

    channel1.delete()
      .catch(console.error);

    channel2.delete()
      .catch(console.error);

    return message.channel.send("Channels have Been Removed, You may Kick me!");


}

module.exports.help = {
  name: "setup"
}
