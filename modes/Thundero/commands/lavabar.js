const Discord = require('discord.js');

const inline = true
const needed_permlvl = 5

module.exports.run = async (client, message, args) => {
    if(client.permlvl < needed_permlvl)return message.reply("doesnt look like you have the perms to do this!")

    let bar

    const bar1 = "lava1.gif"
    const bar2 = "lava2.gif"
    const bar3 = "lava3.gif"
    const bar4 = "lava4.gif"
    const bar5 = "lava5.gif"
    const bar6 = "lava6.gif" 
    const bar7 = "lava7.gif" 
    const bar8 = "lava8.gif" 
    const bar9 = "lava9.gif" 
    const bar10 = "lava10.gif" 
    const bar11 = "lava11.gif" 
    const bar12 = "lava12.gif" 
    const bar13 = "lava13.gif" 
    const bar14 = "lava14.gif" 
    const bar15 = "lava15.gif" 
    const bar16 = "lava16.gif" 
    const bar17 = "lava17.gif" 
    const bar18 = "lava18.gif" 
    const bar19 = "lava19.gif" 
    const bar20 = "lava20.gif" 

//  embed settings
    const membername = message.author.username // embed name
    const memberpic = message.author.displayAvatarURL
    const color = "#ff0000"

//  import vars into here
    const xp = 1
    const nlvl = 15
    const lvl = 1
    const rank = "#1"

    const base_percentage = 6.666666666666667 // bar range (currently at 1-15)
    // use 6.666666666666667 if there is no embed thumbnail
    // use 5 if there is a embed thumbnail

    var xp_percentage = 50 // input percentage

    if (xp_percentage <= base_percentage * 1) bar=bar1
    if (xp_percentage >= base_percentage * 2) bar=bar2
    if (xp_percentage >= base_percentage * 3) bar=bar3
    if (xp_percentage >= base_percentage * 4) bar=bar4
    if (xp_percentage >= base_percentage * 5) bar=bar5
    if (xp_percentage >= base_percentage * 6) bar=bar6
    if (xp_percentage >= base_percentage * 7) bar=bar7
    if (xp_percentage >= base_percentage * 8) bar=bar8
    if (xp_percentage >= base_percentage * 9) bar=bar9
    if (xp_percentage >= base_percentage * 10) bar=bar10
    if (xp_percentage >= base_percentage * 11) bar=bar11
    if (xp_percentage >= base_percentage * 12) bar=bar12
    if (xp_percentage >= base_percentage * 13) bar=bar13
    if (xp_percentage >= base_percentage * 14) bar=bar14
    if (xp_percentage >= base_percentage * 15) bar=bar15
    if (xp_percentage >= base_percentage * 16) bar=bar16
    if (xp_percentage >= base_percentage * 17) bar=bar17
    if (xp_percentage >= base_percentage * 18) bar=bar18
    if (xp_percentage >= base_percentage * 19) bar=bar19
    if (xp_percentage >= base_percentage * 20) bar=bar20

    let embed = new Discord.RichEmbed()
    .setAuthor(membername)
    .setColor(color)
    // .setTitle(`Rank: ${rank}`)
    //.setThumbnail(memberpic)
    // .addField("XP:", `${xp}/${nlvl}`, inline)
    .addField("Level:", lvl, inline)
    .addField("Ranking", `${rank}`, inline)
    // .setFooter(`${client.user.username} by Hammer1279`, client.user.displayAvatarURL)
    .setFooter(`${xp}xp/${nlvl}xp`)
    // add the directory of the folder with the gif's
    .attachFiles([`././content/${bar}`])
    .setImage(`attachment://${bar}`)
    .setTimestamp()

    message.channel.send(embed)
}