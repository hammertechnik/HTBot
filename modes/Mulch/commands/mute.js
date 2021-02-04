const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if(message.member.roles.some(r=>["Développeur de bot", "Chef", "Chevaucheur d'élite", "Mod"].includes(r.name)) ) {
        // has one of the roles
      } else {
          message.reply("doesn't look like you can use that!")
          return;
        // has none of the roles
      }
    

  //!tempmute @user 1s/m/h/d

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Utilisateur introuvable.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Impossible de muter!");
  let muterole = message.guild.roles.find(`name`, "muté");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muté",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("Vous n'avez pas précisé la durée !");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> a été muté pour ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> a été démuté !`);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "tempmute"
}