// @ts-check

const fs = require('fs');
const Discord = require('discord.js');

const needed_permlvl = 2

module.exports.run = async (client, message, args) => {
    if (client.permlvl < needed_permlvl) return message.reply("doesnt look like you have the perms to do this!")

    console.log(`| ${message.author.tag} | say  "${args.join(' ')}"`)

    // if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Doesn't look like you can use that.");

    if (!args || args < 1) return message.channel.send('Dude, u forgot the Message!'); message.delete();
    let channelId = args[0].replace('<', '').replace('#', '').replace('>', '');
    if (!message.guild.channels.has(channelId)) return message.channel.send(args.join(' ')); message.delete();

    client.channels.get(channelId).send(args.join(' ').replace(args[0], ''))
    message.delete();
};

module.exports.help = {
    name: "say",
    permlvl: 2,
    description: "Say something through the bot!",
    hidden: false,
    aliases: [],
    usage: "say <#channel> [message]",
    category: "mod"
}