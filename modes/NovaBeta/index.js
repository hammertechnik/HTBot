//@ts-check

const Discord = require('discord.js')

module.exports.run = async (client, cmessage) => {
    let bot = new Discord.Client()
    bot.login("Token")
    cmessage.reply("bot should be starting")
    try {
        console.log("AlternateIndex™ seems to be Working!")
    } catch (e) { cmessage.channel.send(require("util").inspect(client.clean(e)), { code: "xl" }) }
    bot.on('ready', () => {
        client.user.setGame('made by HammerTechnik')
        client.user.setStatus('idle')
    })
    bot.on('message', async botmsg => {
        let msg = botmsg.content.toUpperCase();
        let args = botmsg.content.slice(client.prefix.length).trim().split(" ");
        let command = args.shift().toLowerCase();
        if (botmsg.author.id == "437999876828037158") {
            if (msg == "HEY") botmsg.reply("heyo Hammer")
            if (msg == "STOP") bot.destroy()
        }
    })

    bot.on('message', async message => {
        if (!message.guild) return;
        if (message.author.bot) return;
        // let prefix = client.prefixes.get(message.guild.id);client.prefixes[message.guild.id].prefixes
        let prefix = client.prefixes[message.guild.id].prefixes;
        let msg = message.content.toUpperCase();
        let args = message.content.slice(prefix.length).trim().split(" ");
        let command = args.shift().toLowerCase();

        if (!msg.startsWith(prefix)) return;
        if (!command) return;
        // console.log(`${message.author.tag} did ${command}`)
        try {
            let commandFile = require(`./commands/${command}.js`);
            commandFile.run(bot, message, args, client)
        } catch (e) {
            // cmessage.channel.send(require("util").inspect(client.clean(e)), {code:"xl"})
        }
        // command.run(bot, message, args);    
    });

    bot.on('error', async (e) => { cmessage.channel.send(require("util").inspect(client.clean(e)), { code: "xl" }) });
}