﻿module.exports.run = async (host, hmsg) => {
  const Discord = require('discord.js')
  const fs = require('fs')
  const client = new Discord.Client();
  const config = require('./storage/config.json');
  const prefix = '?';

  hmsg.reply("Booting up!")
  client.on('ready', async () => {
    console.log(`MulchBot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)

    client.user.setActivity('Dragons !', { type: 'WATCHING' }, { url: "https://hammermusik.com" },);
    client.user.setStatus('online')
  });
  client.on('message', async botmsg => {
    let msg = botmsg.content.toUpperCase();
    let args = botmsg.content.slice(host.prefix.length).trim().split(" ");
    let command = args.shift().toLowerCase();
    if (botmsg.author.id == "437999876828037158") {
      if (msg == "STOP") client.destroy()
    }
  })
  client.on('message', async message => {
    if (!message.guild || message.author.bot) return;

    let msg = message.content.toUpperCase();
    let args = message.content.slice(prefix.length).trim().split(" ");
    let cmd = args.shift().toLowerCase();
    let msgContent = message.content.toLowerCase().trim().split(" ");
    if (msgContent.includes('prefix')) message.channel.send(`Si tu veux t'adresser à nous, utilise **${prefix}** avant, sinon Baquet ne comprendra pas...`)


    if (!msg.startsWith(prefix)) return;
    if (message.author.bot) return;

    try {
      let commandFile = require(`./commands/${cmd}.js`);
      commandFile.run(client, message, args, prefix, host)
    } catch (e) {
    }
  });
  client.on('error', console.error);

  client.on("guildMemberAdd", member => {
    if (host.set.get(member.guild.id != 3)) return
    client.channels.get('547321666498199552').send(`Bienvenue sur Beurk, <@${member.user.id}> ! Nous sommes Mulch et Baquet, pour vous servir. Avant de faire quoi que ce soit, nous vous conseillons d'aller lire <#547163007789039852>, c'est plein d'informations utiles !`);
  });

  client.on("guildMemberRemove", member => {
    if (host.set.get(member.guild.id != 3)) return
    client.channels.get('547321666498199552').send(`**${member.user.tag}** vient de nous quitter pour partir à l'aventure...`)
  })

  //fs.readdir('./events/', (err, files) => {
  //files.forEach(file => {
  //const eventHandler = require(`./events-mulch/${file}`)
  //const eventName = file.split('.')[0]
  //client.on(eventName, (...args) => eventHandler(client, ...args))
  //})
  //})

  client.login(config.token)
}