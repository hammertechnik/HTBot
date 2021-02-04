const Discord = require("discord.js");
const fs = require("fs")

const needed_permlvl = 5

module.exports.run = async (client, message, args) => {
    if (client.permlvl < needed_permlvl) return
    const name = client.user.username
    if (!args[0]) {
        const embed = new Discord.RichEmbed()
            .addField(`GET ${name} Stats`, `\`\`user\`\`\n\`\`server\`\`\n\`\`commands\`\`\n\`\`id\`\``)
            .setColor('#00ffff')
        message.channel.send(embed)
    } else {
        switch (args[0]) {
            case "user": {
                let member_ID = client.guilds.get('546008502754082830').roles.get('605071787721490435').members.map(m => `${m.user.tag}`);
                message.channel.send(`\`\`\`${member_ID.join(" | ")}\`\`\``)
                break
            }
            case "id": {

                let member_ID = client.guilds.get('546008502754082830').roles.get('605071787721490435').members.map(m => `"${m.user.id}"`);
                message.channel.send(`\`\`\`[${member_ID}]\`\`\``)
                break
            }
            case "server": {
                let servers = client.guilds.map(g => g.name).join('\n')
                message.channel.send(`\`\`\`${servers}\`\`\``)
                break
            }
            case "commands": {
                let commands = client.commands.map(cmd => cmd.name + " [" + cmd.aliases + "] - " + cmd.category + "\n").join("")
                message.channel.send(`\`\`\`${commands}\`\`\``)
                break
            }
            case "link": {
                let c = []
                client.guilds.forEach(g => {
                    let s = g.systemChannel
                    if (!s) s = g.channels.find().find(channel => channel.name === "General")
                    let channels = guild.channels.filter((channel) => {
                        return channel.type === 'text' && channel.permissionsFor(guild.me).has(['VIEW_CHANNEL', 'CREATE_INSTANT_INVITE']);
                    });
                    if (channels.array().length > 0) {
                        channels = channels.sort((a, b) => {
                            return a.calculatedPosition - b.calculatedPosition;
                        }).array();
                    }
                    try {
                        if (client.ignore.includes(message.guild.id)) return c.push(`\`\`\`${g.name} | \~NO INVITE\~\`\`\`\n`)
                        channels[0].createInvite({ temporary: true, maxAge: 0, maxUses: 1, unique: true }, `Developer Generated Invite`)
                            .then(i => c.push(`\`\`\`${g.name} | https://discord.gg/${i.code}/\`\`\`\n`))
                    } catch (e) { console.error; c.push(`\`\`\`${g.name} | \~NO INVITE\~\`\`\`\n`) }
                });
                message.channel.send(`\`\`\`${c}\`\`\``)
                break
            }
            // case "update": {
            //     let raw = client.guilds.get('546008502754082830').roles.get('605071787721490435').members.map(m=>`"${m.user.id}"`);
            //     let data = `[${raw}]`
            //     fs.writeFile('./storage/premium.json', data, (err) => {console.log(err)})
            //     message.reply("done!")
            //     break
            // }
            default: {
                message.reply("teh fucq?")
            }
        }
    }
}

module.exports.help = {
    name: "get",
    permlvl: 5,
    description: "Get Nova Stats",
    hidden: false,
    aliases: [],
    usage: "get <info set>",
    category: "info"
}