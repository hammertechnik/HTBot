const Discord = require("discord.js");

var debug = false

const sophie_pic = "https://cdn.discordapp.com/attachments/575326831306211328/576159561497575431/sophie.png"
const maxi_pic = "https://cdn.discordapp.com/attachments/575326831306211328/576185045270921226/unknown.png"
const meerlies_big = "https://cdn.discordapp.com/attachments/575326831306211328/576184382159585291/unknown.png"
const hpic = "https://cdn.discordapp.com/attachments/546008503299604508/564516393475899402/hammernew.png"
const ht = "https://cdn.discordapp.com/attachments/553609449898639360/566005853795123201/HammerTechnik.png"

module.exports.run = async (client, message, args) => {

    const max = 2
    const min = 1
    let ran = Math.floor(Math.random() * (max - min + 1)) + min;

    let pic;
    if (ran == 1) {
        pic = sophie_pic
    } else {
        pic = maxi_pic
    }

    let embed = new Discord.RichEmbed()
        .setAuthor("Hammer1279#2365", hpic)
        .setColor('#00ffff')
        .addField("My Guinea Pigs:", `
Goodbye... we will miss you both...
you were there, when Kappa was made,
when i got into my new school...
and were there on the final version of Kappa,
idk what to do now without you 😭\n\`\`\`yaml
R.I.P. Sophie *2013 - †2019
R.I.P. Maxi   *2013 - †2019
R.I.P. Fette  *2020 - †2021
\`\`\``)
        .setFooter(`HT-Messenger | 9.5.2019 - 17:26 (GMT+2)`, ht)
        .setThumbnail(pic)
        .setImage(meerlies_big)

    const channel = message.channel.id

    let sophie = client.emojis.find(emoji => emoji.id === '576145014107668481')
    let maxi = client.emojis.find(emoji => emoji.id === '577184050381586472')

    client.awaitReply = async (msg, question, limit = 60000) => {
        const filter = m => m.author.id === msg.author.id;
        await msg.channel.send(question);
        try {
            const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
            return collected.first().content;
        } catch (e) {
            return false;
        }
    };

    const response = await client.awaitReply(message, "Access Code? [4-digits]");

    if (["4936"].includes(response.toLowerCase())) {
        // message.channel.send(lan.send);
        //let suggestchannel = message.guild.channels.find(`name`, "suggestions");
        client.channels.get(channel).send({ embed }).then(async msg => {
            await msg.react(sophie);
            await msg.react(maxi);
        });
    } else

        if (!["4936"].includes(response.toLowerCase())) {
            message.reply("invalid Code!")
            return;
        }

}

module.exports.help = {
    name: "secret",
    permlvl: 1,
    description: "**Very Secret**",
    hidden: true,
    aliases: [],
    usage: "secret => 4936",
    category: "info"
}