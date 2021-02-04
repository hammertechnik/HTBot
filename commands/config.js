// @ts-check

const Discord = require("discord.js");

const needed_permlvl = 5

module.exports.run = async (client, message, args) => {
    if (client.permlvl < needed_permlvl) return
    let mute
    let emute = client.mute.get(message.guild.id)
    let welcome
    let ewelcome = client.welcome.get(message.guild.id)
    let suggest
    let esuggest = client.suggest.get(message.guild.id)

    if (esuggest == "disabled" || esuggest == undefined) { suggest = "disabled" } else { suggest = `<#${esuggest}>` }

    let key
    let key1 = (`${args[0]}`).toLowerCase()
    key = key1
    // let key2 = (`${args[0]},${args[1]}`).toLowerCase()
    // if(args[1]){key=key2}else{key=key1}
    switch (key) {
        case "muterole": {
            let embed1 = new Discord.RichEmbed()
            let role = await client.awaitReply(message, `What should be the Role? \n<DEVMSG>`, 12000, true)
            let roleID; if (role.toLowerCase() != "disabled") { if (Number(role.replace('<', '').replace('@', '').replace('&', '').replace('>', '')) == NaN) return message.reply(`ERR NO OPTION \n<DEVMSG>`); else { roleID = role.replace('<', '').replace('@', '').replace('&', '').replace('>', '') }; } else roleID = "disabled"
            let embed2 = new Discord.RichEmbed()
            let confirm = await client.awaitReply(message, `Are you sure you want to set <@&${roleID}> as new Role? \n<DEVMSG>`, 6000, true)
            if (!["yes", "y"].includes(confirm)) return message.channel.send(`> CENCELED \n<DEVMSG>`)
            client.mute.set(message.guild.id, roleID)
            message.channel.send(`> EVALUATION SUCCESSFULL \n<DEVMSG>`)
            message.delete()
            break
        }
        case "welcomechannel": {
            let embed1 = new Discord.RichEmbed()
            let channel = await client.awaitReply(message, `What should be the Channel? \n<DEVMSG>`, 12000, true)
            let channelID; if (channel.toLowerCase() != "disabled") { if (Number(channel.replace('<', '').replace('#', '').replace('>', '')) == NaN) return message.reply(`ERR NO OPTION \n<DEVMSG>`); else { channelID = channel.replace('<', '').replace('#', '').replace('>', '') }; } else channelID = "disabled"
            let embed2 = new Discord.RichEmbed()
            let confirm = await client.awaitReply(message, `Are you sure you want to set <#${channelID}> as new Channel? \n<DEVMSG>`, 6000, true)
            if (!["yes", "y"].includes(confirm)) return message.channel.send(`> CENCELED \n<DEVMSG>`)
            client.welcome.set(message.guild.id, channelID)
            message.channel.send(`> EVALUATION SUCCESSFULL \n<DEVMSG>`)
            message.delete()
            break
        }
        case "suggestchannel": {
            let embed1 = new Discord.RichEmbed()
            let channel = await client.awaitReply(message, `What should be the Channel? \n<DEVMSG>`, 12000, true)
            let channelID; if (channel.toLowerCase() != "disabled") { if (Number(channel.replace('<', '').replace('#', '').replace('>', '')) == NaN) return message.reply(`ERR NO OPTION \n<DEVMSG>`); else { channelID = channel.replace('<', '').replace('#', '').replace('>', '') }; } else channelID = "disabled"
            let embed2 = new Discord.RichEmbed()
            let confirm = await client.awaitReply(message, `Are you sure you want to set <#${channelID}> as new Channel? \n<DEVMSG>`, 6000, true)
            if (!["yes", "y"].includes(confirm)) return message.channel.send(`> CENCELED \n<DEVMSG>`)
            client.suggest.set(message.guild.id, channelID)
            message.channel.send(`> EVALUATION SUCCESSFULL \n<DEVMSG>`)
            message.delete()
            break
        }
        case "testembed": {
            let embed1 = new Discord.RichEmbed()
                .setTitle("SetChannel Setup")
                .setDescription("What Channel Should it be Sir?")
                .setFooter("A Easteregg by Dev Hammer1279")
                .setTimestamp()
            let embed2 = new Discord.RichEmbed()
                .setTitle("SetChannel Setup")
                .setDescription("Are you Sure you want to Disable Welcoming of Morrons?")
                .setFooter("A Easteregg by Dev Hammer1279")
                .setTimestamp()
            message.channel.send(embed1)
            message.channel.send(embed2)
            break
        }
        case "advanced": {
            let options = new Discord.RichEmbed()
                .setTitle(`Advanced Options:`)
                .setDescription(`
-DEV TEST
-SUM OPTION
-KILL COOKIE GUNS FIGHT
-GUINEA PIG SIMULATOR
        `)
        }
        default: {
            const embed = new Discord.RichEmbed()
                .addField(`Config:`, `
Muterole: <@&${client.mute.get(message.guild.id)}>
Welcomechannel: <#${client.welcome.get(message.guild.id)}>
Suggestchannel: <#${client.suggest.get(message.guild.id)}>
`)
                .setFooter(`${client.user.username} by HammerTechnik`, client.user.displayAvatarURL)
                .setTimestamp()
                .setColor("#ff0000")
            message.channel.send(embed)
        }
    }
}

module.exports.help = {
    name: "config",
    permlvl: 3,
    description: "Shows Server Configuration",
    hidden: false,
    aliases: ['c'],
    usage: "config",
    category: "admin"
}