module.exports.run = async (client, message, args) => {
    const discord = require('discord.js')
    const fs = require('fs')

    let premium_file = JSON.parse(fs.readFileSync("./storage/premium.json", "utf8"));
    let joinedTimestamp = new Date(message.member.joinedTimestamp).toUTCString()
    let createdTimestamp = new Date(message.author.createdTimestamp).toUTCString()
    let mention = message.mentions.members.first();
    let usermention = message.mentions.users.first();
    let badge = ""
    // if(client.premium)badge="<:partner:647135604844527626>"
    let avatar = message.author.avatarURL;
    let displayColor = message.member.displayHexColor;
    let displayName = message.member.displayName
    let ID = message.author.id
    if (!args[0]) {
        if (premium_file.toString().includes(ID)) { badge = "🎖️" }
        if (client.guilds.get('546008502754082830').roles.get('552758121789915136').members.map(m => m.user.id).includes(ID)) badge = "<:dev:647216230448496655>"
    }
    let tag = `${badge}  ${message.author.tag}`

    if (mention) { joinedTimestamp = new Date(mention.joinedTimestamp).toUTCString(); createdTimestamp = new Date(usermention.createdTimestamp).toUTCString(); if (premium_file.toString().includes(usermention.id)) badge = "🎖️"; if (client.guilds.get('546008502754082830').roles.get('552758121789915136').members.map(m => m.user.id).includes(usermention.id)) badge = "<:dev:647216230448496655>"; tag = `${badge}  ${usermention.tag}`; avatar = usermention.avatarURL; displayColor = mention.displayHexColor; displayName = mention.displayName; ID = usermention.id; }


    let embed = new discord.RichEmbed()
        // .setAuthor(tag, avatar)
        .setTitle(tag)
        .setThumbnail(avatar)
        .setColor(displayColor)
        .addField('Userinfo:', `**Nickname:** ${displayName} \n\n**Joined this server at:** \n${joinedTimestamp} \n\n**Account created at:** \n${createdTimestamp}\n\n**Warnings:**\n${client.warnings.get(message.guild.id, ID)}`)

    message.channel.send(embed);
}

exports.help = {
    name: "userinfo",
    description: "check some general info about a user!",
    aliases: ["ui"],
    permlvl: 1,
    hidden: false,
    category: "misc",
    usage: "userinfo <@user>"
}