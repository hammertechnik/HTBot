const Discord = require("discord.js");

var debug = false

const langfile = require("../storage/translation/language.json")

let lan;

module.exports.run = async (client, message, args) => {

    let prefix = client.prefix

    if (client.language.get(message.guild.id) == "eng") {
        lan = langfile.english.bug
    }
    if (client.language.get(message.guild.id) == "ger") {
        lan = langfile.german.bug
    }
    if (client.language.get(message.guild.id) == "fr") {
        lan = langfile.french.bug
    }
    if (client.language.get(message.guild.id) == "cz") {
        lan = langfile.czech.bug
    }
    if (client.language.get(message.guild.id) == "ru") {
        lan = langfile.russian.bug
    }

    const slicer = args.join(" ").indexOf("|")
    var title = args.join(" ").slice(0, slicer)
    const text = args.join(" ").replace(`${title}| `, "")

    if (!args || args < 1) return message.reply(lan.e1), message.delete();
    if (slicer == -1) return message.reply(`${lan.e2} \`\`${prefix}bug title | description\`\``)

    const pic = client.user.displayAvatarURL;
    const authorpic = message.author.avatarURL
    const author = message.author.tag

    let embed = new Discord.RichEmbed()
        .setTitle("Bug:")
        .setDescription(`Reported by: ${author}`)
        .setColor('#00eedd')
        .setThumbnail(authorpic)
        .addField(title, text)
        .setFooter(`${lan.server} ${message.guild.name}`, message.guild.iconURL)
        .setTimestamp()

    console.error(`${message.author.tag} | ${title}: ${text}`)
    if (debug) {
        message.channel.send({ embed })
    } else {
        client.channels.get("548653209531711528").send({ embed })
    }
    message.delete()
    if (debug) {

    } else {
        message.reply(lan.send)
    }
}

module.exports.help = {
    name: "bug",
    permlvl: 1,
    description: "Report a Bug",
    hidden: false,
    aliases: [],
    usage: "bug [title] | [description]",
    category: "misc"
}

