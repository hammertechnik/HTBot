module.exports.run = async (client, message, args) => {
const Discord = require('discord.js')

let totalSeconds = (client.uptime / 1000);
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = totalSeconds % 60;

let uptime = `${hours} hours, ${minutes} minutes and ${Math.floor(seconds)} seconds`;

let embed = new Discord.RichEmbed()
.setColor('#00eedd')
.setAuthor("DV Bot:")
.setThumbnail("https://images-ext-2.discordapp.net/external/ViDkf_sNvzcI9ltiMhIawCxVqazVnpHbaUp_o_ytZXc/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/562836708564140043/4cf52de832b02938d8b5275395a7bc5f.png?width=449&height=449")
.setTimestamp()
.setFooter("DV Bot, Created by DefiantVideos (Lord Bidoof)", 'https://images-ext-2.discordapp.net/external/ViDkf_sNvzcI9ltiMhIawCxVqazVnpHbaUp_o_ytZXc/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/562836708564140043/4cf52de832b02938d8b5275395a7bc5f.png?width=449&height=449')
.addField("Stats:", `<:cookies:592544802013184010>Users: ${client.users.size}
\n🔗Servers: ${client.guilds.size}
\n#⃣Channels ${client.channels.size}
\n<:melon:597484763967651848>Ping: ${Math.round(client.ping)}ms
\n🔋Uptime: ${uptime}`
//\n"Links:"`, true)
)
message.channel.send({embed});
message.delete()
}
