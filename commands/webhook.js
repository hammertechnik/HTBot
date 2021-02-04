module.exports.run = async (bot, message, args) => {

    const devs = ["437999876828037158"];
    if (!~devs.indexOf(message.author.id)) {
        return (message.reply("You are not allowed to use this command!"))
    }

    console.log(`| ${message.author.tag} | Webhook | URL: ${args[0]} | Message: "${args.join(' ').replace(args[0], '')}"`)
    const Discord = require('discord.js')
    var superagent = require("superagent")
    if (args == 0) {
        message.reply("you forgot the Webhook URL!")
        message.delete()
        return;
    } else {
        if (args.join(' ').replace(args[0], '') == 0) {
            message.reply("you forgot the message to say!")
            message.delete()
            return;
        }
    }
    let { body } = await superagent.get(`${args[0]}`)//.catch(message.reply("Webhook URL Invalid!"))
    const hook = new Discord.WebhookClient(body.id, body.token);
    //message.reply(body.name)
    hook.send(args.join(' ').replace(args[0], ''));
    message.delete()
}

module.exports.help = {
    name: "webhook",
    permlvl: 5,
    description: "send a Message via Webhook",
    hidden: false,
    aliases: [],
    usage: "webhook [Webhook URL] [message]",
    category: "dev"
}