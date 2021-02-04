// @ts-check

const fs = require('fs');
const Discord = require('discord.js');

const needed_permlvl = 2

module.exports.run = async (client, message, args) => {
    if (client.permlvl < needed_permlvl) return message.reply("doesnt look like you have the perms to do this!")

    // if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Doesn't look like you can use that.");

    message.channel.send("__--------------------------------------------------------------------------------------------------------------------------__")
    message.delete()
}

module.exports.help = {
    name: "spacer",
    permlvl: 2,
    description: "Add some Space between a message",
    hidden: false,
    aliases: [],
    usage: "spacer",
    category: "mod"
}