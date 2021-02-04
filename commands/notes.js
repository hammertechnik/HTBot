// @ts-check

const fs = require('fs');
const Discord = require('discord.js');
const { inspect } = require("util");

const needed_permlvl = 4

module.exports.run = async (client, message, args) => {

  if (client.permlvl < needed_permlvl) return message.reply("doesnt look like you have the perms to do this!")

  let notes = JSON.parse(fs.readFileSync("./storage/notes.json", "utf8",));

  const x = notes[message.author.id]

  const note = args.join(" ").replace(`${args[0]} `, "")

  if (!notes[message.author.id]) return (message.channel.send("no notes saved"))
  message.channel.send(inspect(x), { code: "ascii" });
  return;

}

module.exports.help = {
  name: "notes",
  permlvl: 4,
  description: "Show All Created Notes",
  hidden: false,
  aliases: [],
  usage: "notes",
  category: "dev"
}