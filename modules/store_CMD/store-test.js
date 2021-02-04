// @ts-check

const fs = require('fs');
const Discord = require('discord.js');
var storemodule = require('../store.js')
var store = new storemodule


const needed_permlvl = 5

module.exports.run = async (client, message, args) => {
    if(client.permlvl < needed_permlvl)return message.reply("doesnt look like you have the perms to do this!")

    store.show()
}