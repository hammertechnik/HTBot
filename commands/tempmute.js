const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

const needed_permlvl = 2

module.exports.run = async (client, message, args) => {
  if (client.permlvl < needed_permlvl) return message.reply("doesnt look like you have the perms to do this!")
  if (!client.mute.get(message.guild.id) == "disabled") return message.reply(`you first need to run \`\`${prefix}config muterole\`\` !`)


  // if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");

  //!tempmute @user 1s/m/h/d

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!tomute) return message.reply("Couldn't find user.");
  if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let muterole = message.guild.roles.find(`id`, client.mute.get(message.guild.id))
  // let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  // if(!muterole){
  //   try{
  //     muterole = await message.guild.createRole({
  //       name: "Muted",
  //       color: "#000000",
  //       permissions:[]
  //     })
  //     message.guild.channels.forEach(async (channel, id) => {
  //       await channel.overwritePermissions(muterole, {
  //         SEND_MESSAGES: false,
  //         ADD_REACTIONS: false
  //       });
  //     });
  //   }catch(e){
  //     console.log(e.stack);
  //   }
  // }
  //end of create role
  let mutetime = args[1];
  if (!mutetime) return message.reply("You didn't specify a time!");

  await (tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function () {
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));


  //end of module
}
module.exports.help = {
  name: "tempmute",
  permlvl: 5,
  description: "Mute someone for a given time",
  hidden: false,
  aliases: [],
  usage: "tempmute [@user] [time]",
  category: "mod"
}