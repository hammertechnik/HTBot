const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

        let updateEmbed = new Discord.RichEmbed()
        .setDescription("Update")
        .setColor("#002766")
        .addField("We are on the next major update", "1.1.0!")
        .addField("Our Full Update Information is over at", "https://sites.google.com/view/dvbot/update")
        .setFooter("DV Bot, Created by DefiantVideos (Lord Bidoof)", 'https://images-ext-2.discordapp.net/external/ViDkf_sNvzcI9ltiMhIawCxVqazVnpHbaUp_o_ytZXc/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/562836708564140043/4cf52de832b02938d8b5275395a7bc5f.png?width=449&height=449')
        .setThumbnail("https://images-ext-2.discordapp.net/external/ViDkf_sNvzcI9ltiMhIawCxVqazVnpHbaUp_o_ytZXc/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/562836708564140043/4cf52de832b02938d8b5275395a7bc5f.png?width=449&height=449")

        message.delete().catch(O_o=>{});

        return message.reply(updateEmbed);

}

module.exports.help = {
  name: "update"
}
