const Discord = require("discord.js");
const opusscript = require("opusscript");

let needed_permlvl = 5

exports.run = (client, message, args) => {

  if (client.permlvl < needed_permlvl) return

  if (args.length === 0)
    return message.reply("You never supplied a stream URL!");

  const streamURL = args.slice(0, args.length).join(" ");

  if (message.member.voiceChannel) {
    message.member.voiceChannel.join()
      .then(connection => {
        message.reply('Connected! Playing...');
        connection.playArbitraryInput(`${streamURL}`);
      })
      .catch(console.log);
  } else {
    message.reply('You are not in a voice channel!');
  }
};

module.exports.help = {
  name: "stream",
  permlvl: 5,
  description: "Plays Audio Streams in a VC",
  hidden: false,
  aliases: [],
  usage: "stream [URL]",
  category: "music"
}