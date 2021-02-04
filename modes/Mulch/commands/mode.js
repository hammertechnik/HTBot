const Discord = require("discord.js");
let modes = require('../../storage/mode.json')

const needed_permlvl = 3
module.exports.run = async (client, message, args, prefix, host) => {
if(host.permlvl < needed_permlvl)return message.reply("this is an Administrator only Tool!")
    let ctrlsetname
    let ctrlsetcreator
    const embed = new Discord.RichEmbed()
    // switch(args[0]){
        // case "set": //switch(args[1]){
        if(args[0]){
            if(!modes[args[0]])return message.reply(`Aviable Modes:\n1 = **Nova (Default)**\n2 = **Thundero**`)
            if(host.permlvl != 5){
                if(!modes[args[0]].public){
                    if(modes[args[0]].owner.id !== message.author.id)return message.channel.send(`It doesnt look like you are ${modes[args[0]].owner.name}`)
                    let mode = Number(args[0])
                    host.set.set(message.guild.id, mode)
                } else {
                    let mode = Number(args[0])
                    host.set.set(message.guild.id, mode)
                }
                //}
            // case "1": client.set.set(message.guild.id, 1);break;
            // case "2": client.set.set(message.guild.id, 2);break;
            // default: message.reply(`Aviable Modes:\n1 = **Nova (Default)**\n2 = **Thundero**`);return
        }else{
            let mode = Number(args[0])
            host.set.set(message.guild.id, mode)
        }
    }


    // switch(client.set.get(message.guild.id)){
    //     case 1:ctrlset="Nova (Default)";break;
    //     case 2:ctrlset="Thundero";break;
    // }
    ctrlsetname = modes[host.set.get(message.guild.id)].name
    ctrlsetcreator = modes[host.set.get(message.guild.id)].owner.name
    embed.setTitle(`Current Control Set:`)
    embed.addField(ctrlsetname, `A Set by ${ctrlsetcreator}`)

    message.channel.send(embed)
}
