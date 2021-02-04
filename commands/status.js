const color_main = "#00eedd"
const color_beta = "#ff0000"

module.exports.run = async (client, message, args) => {

    let color
    if (client.beta == true) {
        color = color_beta
    } else {
        color = color_main
    }

    const langfile = require("../storage/translation/language.json")
    let lan;
    if (client.language.get(message.guild.id) == "eng") {
        lan = langfile.english.stats
    }
    if (client.language.get(message.guild.id) == "ger") {
        lan = langfile.german.stats
    }
    if (client.language.get(message.guild.id) == "fr") {
        lan = langfile.french.stats
    }
    if (client.language.get(message.guild.id) == "cz") {
        lan = langfile.czech.stats
    }
    if (client.language.get(message.guild.id) == "ru") {
        lan = langfile.russian.stats
    }

    const Discord = require('discord.js')

    const name = client.user.username
    const pic = client.user.displayAvatarURL;

    let totalSeconds = (client.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    let uptime = `${hours} ${lan.h}, ${minutes} ${lan.min} ${Math.floor(seconds)} ${lan.sec}`;

    let embed = new Discord.RichEmbed()
        .setColor(color)
        .setURL("https://www.hammertechnik.ga/")
        .setAuthor(`${name}:`)
        .setThumbnail(pic)
        .setTimestamp()
        .setFooter(`${name} ${lan.creator}`, pic)
        .addField("Stats:", `👨${lan.Us} ${client.users.size}  
\n🔗${lan.S} ${client.guilds.size}  
\n#⃣${lan.C} ${client.channels.size}  
\n🛰${lan.P} ${Math.round(client.ping)}ms 
\n🖥${lan.L} Discord.js
\n🔋${lan.U} ${uptime}`
            //\n"Links:"`, true)
        )

    message.channel.send({ embed });
    message.delete()
}

module.exports.help = {
    name: "status",
    permlvl: 1,
    description: "*Easter Egg = Cocaine :p*, Self Explanitory",
    hidden: false,
    aliases: ["stats"],
    usage: "stats",
    category: "info"
}