const Discord = require("discord.js");

const langfile = require("../storage/translation/language.json")

let lan;

const cf = { "id": { "dev": ["437999876828037158", "392502749876584448", "454259096846336003", "486213558577790978"], "tr": ["317279640354029569", "454259096846336003"], "h": ["188762891137056769", "282430126237679626"] }, "main": { "color": "#00eedd", "company": "HammerTechnik-Development", "developer": "**Hammer1279**#2365\n**Martin225**#9317\n**Lord Bidoof**#6554", "translator": "**TheFireDragon**#9993\n**Martin225**#9317\n**[MT] ruxm**#2669", "helper": "**Hab**#3925\n**Lord Bidoof**#6554\n**WoofFighter**#6963" }, "beta": { "color": "#ff0000", "company": "**HT-Development**, the Devteam and Hab's Testgroup", "developer": "**Hammer1279**#2365", "translator": "**TheFireDragon**#9993\n**Martin225**#9317\n**[MT] ruxm**#2669", "helper": "**Lord Bidoof**#6554\n**WoofFighter**#6963\n**Hab**#3925" } }

let c;

module.exports.run = async (client, message, args) => {

    if (client.beta) {
        c = cf.beta
    } else {
        c = cf.main
    }

    if (client.language.get(message.guild.id) == "eng") {
        lan = langfile.english.credits
    }
    if (client.language.get(message.guild.id) == "ger") {
        lan = langfile.german.credits
    }
    if (client.language.get(message.guild.id) == "fr") {
        lan = langfile.french.credits
    }
    if (client.language.get(message.guild.id) == "cz") {
        lan = langfile.czech.credits
    }
    if (client.language.get(message.guild.id) == "ru") {
        lan = langfile.russian.credits
    }

    //if (message.guild.id == 546008502754082830) {}
    //else {
    //message.delete()
    //return;
    //}
    //let strupi = client.emojis.find(emoji => emoji.name === 'Strupi')

    const pic = client.user.displayAvatarURL;
    const hpic = "https://cdn.discordapp.com/attachments/546008503299604508/564516393475899402/hammernew.png"
    const ht = "https://cdn.discordapp.com/attachments/553609449898639360/566005853795123201/HammerTechnik.png"
    const name = client.user.username

    let dev = []
    let helper = []
    let translator = []
    let cdb = cf.id
    cdb.dev.forEach(ID => {
        let uid = client.guilds.get('546008502754082830').members.get(ID).nickname
        let ud = client.guilds.get('546008502754082830').members.get(ID).user.discriminator
        if (uid) dev.push(`**${uid}**#${ud}`)
        else dev.push(`**${client.guilds.get('546008502754082830').members.get(ID).user.username}**#${ud}`)
    });
    cdb.h.forEach(ID => {
        let uid = client.guilds.get('546008502754082830').members.get(ID).nickname
        let ud = client.guilds.get('546008502754082830').members.get(ID).user.discriminator
        if (uid) helper.push(`**${uid}**#${ud}`)
        else helper.push(`**${client.guilds.get('546008502754082830').members.get(ID).user.username}**#${ud}`)
    });
    cdb.tr.forEach(ID => {
        let uid = client.guilds.get('546008502754082830').members.get(ID).nickname
        let ud = client.guilds.get('546008502754082830').members.get(ID).user.discriminator
        if (uid) translator.push(`**${uid}**#${ud}`)
        else translator.push(`**${client.guilds.get('546008502754082830').members.get(ID).user.username}**#${ud}`)
    });

    let embed = new Discord.RichEmbed()
        .setAuthor(name, pic)
        .attachFiles([`content/htlogo.png`])
        .setThumbnail(`attachment://htlogo.png`)
        .setColor(c.color)
        .setTitle(lan.name)
        .setDescription(c.company)
        //.addField("Creators", `Hammer1279\nHab\nLordBidoof\nWoofFighter`)
        //.addBlankField()
        .addField(lan.dev, dev.join('\n'))
        // .addField(lan.sp, lan.sp2)
        .addField(lan.help, helper.join('\n'))
        .addField(lan.translate, translator.join('\n'))
        .setFooter(`${name} ${lan.creator}`, hpic)
        .setTimestamp()

    message.channel.send({ embed });
    message.delete()
}

module.exports.help = {
    name: "credits",
    permlvl: 1,
    description: "Shows the Creators and Assistants of Nova!",
    hidden: false,
    aliases: [],
    usage: "credits",
    category: "info"
}