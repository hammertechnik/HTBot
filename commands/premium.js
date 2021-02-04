const Discord = require("discord.js");
const fs = require("fs");

const needed_permlvl = 1

module.exports.run = async (client, message, args) => {
    if (client.permlvl < needed_permlvl) return

    const pic = client.user.displayAvatarURL;
    const hpic = "https://cdn.discordapp.com/attachments/546008503299604508/564516393475899402/hammernew.png"
    const ht = "https://cdn.discordapp.com/attachments/553609449898639360/566005853795123201/HammerTechnik.png"
    const name = client.user.username

    let done
    if (client.premium) { done = true } else { done = false }

    if (client.permlvl == 5) {
        if (args[0] == "update") {
            let raw = client.guilds.get('546008502754082830').roles.get('605071787721490435').members.map(m => `"${m.user.id}"`);
            let data = `[${raw}]`
            fs.writeFile('./storage/premium.json', data, (err) => {
                if (err) console.log(err)
            })
            message.reply("done!")
            return
        }
    }

    let embed = new Discord.RichEmbed()
        .setThumbnail(pic)
        .setTitle(`${name} Premium`)
        .setDescription(`Requested by: ${message.author.tag}`)
        .setFooter(`${name} made by: Hammer1279`, hpic)

    switch (done) {
        case (true): {
            embed.addField(`Premium Activated!`, `${name} Premium is already activated!`).setColor('#00FF00')
            break
        }
        case (false): {
            embed.addField(`Not Activated!`, `Get Premium here: [${name}-Premium](https://www.patreon.com/hammertechnik/ 'HammerTechnik Patreon')`).setColor('#FF0000')
            break
        }
    }

    message.channel.send(embed)
    message.delete(500)

}

module.exports.help = {
    name: "premium",
    permlvl: 1,
    description: "Check your Premium, or Get it!",
    hidden: false,
    aliases: [],
    usage: "premium",
    category: "info"
}