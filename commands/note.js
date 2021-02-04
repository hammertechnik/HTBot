const fs = require('fs');
const Discord = require('discord.js');
const { inspect } = require("util");

const needed_permlvl = 4

module.exports.run = async (client, message, args) => {

  if (client.permlvl < needed_permlvl) return message.reply("doesnt look like you have the perms to do this!")

  if (!args[0]) return message.reply("uhh you forgot something!")

  let notes = JSON.parse(fs.readFileSync("./storage/notes.json", "utf8",));

  // const x = notes[message.author.id]

  const note = args.join(" ").replace(`${args[0]} `, "")

  // if(args[0] == 'all'){
  //   if(!notes[message.author.id])return(message.channel.send("no notes saved"))
  //   message.channel.send(inspect(x), {code: "ascii"});
  //   return;
  // }

  if (args[0] == 'show') {
    if (!notes[message.author.id][args[1]]) return (message.channel.send('you didnt save this note'))
    message.channel.send(notes[message.author.id][args[1]])
    return
  }

  if (args[0] == 'delete') {
    if (!args[1]) return (message.channel.send("select a note"));
    if (!notes[message.author.id][args[1]]) return (message.channel.send(`no note ${args[1]}`));

    delete notes[message.author.id][args[1]];
    fs.writeFile('./storage/notes.json', JSON.stringify(notes, null, 2), (err) => {
      if (err) console.log(err)
    });
    message.channel.send("deleted")
    return;
  }

  if (!notes[message.author.id]) {
    notes[message.author.id] = {
      [args[0]]: note
    }
    fs.writeFile('./storage/notes.json', JSON.stringify(notes, null, 2), (err) => {
      if (err) console.log(err)
    });
    message.channel.send("note saved");
    return;
  }


  if (notes[message.author.id][args[0]]) {

    client.awaitReply = async (msg, question, limit = 60000) => {
      const filter = m => m.author.id === msg.author.id;
      await msg.channel.send(question);
      try {
        const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
        return collected.first().content;
      } catch (e) {
        return false;
      }
    };

    const response = await client.awaitReply(message, `are you sure you want to override note ${args[0]}?`);

    if (["y", "yes"].includes(response.toLowerCase())) {

      notes[message.author.id][args[0]] = note

      fs.writeFile('./storage/notes.json', JSON.stringify(notes, null, 2), (err) => {
        if (err) console.log(err)
      });
      message.channel.send("note saved");
      return;
    } else

      if (["n", "no", "cancel"].includes(response)) {
        message.channel.send("cancelled");
        return;
      }
  } else

    notes[message.author.id][args[0]] = note

  fs.writeFile('./storage/notes.json', JSON.stringify(notes, null, 2), (err) => {
    if (err) console.log(err)
  });
  message.channel.send("note saved");
}

module.exports.help = {
  name: "note",
  permlvl: 4,
  description: "Create a Note",
  hidden: false,
  aliases: [],
  usage: "note <show> <delete> <title\˽description>",
  category: "dev"
}