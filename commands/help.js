const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {

    if (args[0]) {
        if (!client.commands.has(args[0]) || client.permLvl < client.commands.get(args[0]).permlvl) return message.channel.send(`This isn\'t a command you have access to. Do ${client.prefix}help to view all the commands you can use!`);
        let cmd = client.commands.get(args[0])
        message.channel.send(`The syntax for ${cmd.name} is: \`${cmd.usage}\``)
        return;
    }

    let info = [];
    let mod = [];
    let admin = [];
    let dev = [];
    let music = [];
    let misc = [];

    client.commands.forEach(cmd => {
        if (cmd.hidden == true) return;
        if (cmd.permlvl > client.permlvl) return;

        switch (cmd.category) {
            case "info":
                info.push(`**${client.prefix}${cmd.name}:** ${cmd.description}`)
                break;
            case "mod":
                mod.push(`**${client.prefix}${cmd.name}:** ${cmd.description}`)
                break;
            case "admin":
                admin.push(`**${client.prefix}${cmd.name}:** ${cmd.description}`)
                break;
            case "dev":
                dev.push(`**${client.prefix}${cmd.name}:** ${cmd.description}`)
                break;
            case "music":
                music.push(`**${client.prefix}${cmd.name}:** ${cmd.description}`)
                break;
            case "misc":
                misc.push(`**${client.prefix}${cmd.name}:** ${cmd.description}`)
                break;
            default: console.error(`ERR Unable to find Category of: ${cmd.name}`)
        }
    });
    let embed = new Discord.RichEmbed()
        .setTitle(`Nova Commands:`)
        .setDescription(`[P] - Premium | [D] - Depricated`)
        .setTimestamp()
        .setColor('#ff0000')
        // .setColor('#C54816')
        .attachFiles([`content/htlogo.png`])
        .setThumbnail(client.user.avatarURL)
        .setFooter(`${client.user.username} made by HammerTechnik`, `attachment://htlogo.png`)
        .addField('Information:', info.join('\n'))
        .addField('Music Commands:', music.join('\n'))
        .addField('Miscellaneous:', misc.join('\n'))
    if (mod[0]) embed.addField('Moderation Commands:', mod.join('\n'))
    if (admin[0]) embed.addField('Admin Commands:', admin.join('\n'))
    if (dev[0]) embed.addField('Dev Tools:', dev.join('\n'))

    message.channel.send(embed)
}

exports.help = {
    name: "help",
    description: "View all the commands you are able to use",
    aliases: ['h'],
    permlvl: 1,
    hidden: false,
    category: "misc",
    usage: "help <command> | <optional> [required]"
}