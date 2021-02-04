module.exports.run = async (client, message, args) => {
    if (!args || args < 1)return message.channel.send('Vous avez oublié votre participation...');
  
    const Discord = require('discord.js')
    const embed = new Discord.RichEmbed()
    .setColor(746215)
    .setFooter(`Mulch & Baquet fait par Hammer1279 - Suggéré par: ${message.author.tag} `, 'https://cdn.discordapp.com/attachments/547529560175017997/547765249126825995/20190219_205817.jpg')
    //.setTimestamp()
    //.setThumbnail('https://cdn.discordapp.com/attachments/547529560175017997/547765249126825995/20190219_205817.jpg')
    .setThumbnail(message.guild.iconURL)
    .addField(`Server: ${message.guild.name}`, args.join(" "), true)
    
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
    
    const response = await client.awaitReply(message, 'êtes-vous sûr de vouloir envoyer votre participation ? écris "o" (oui) ou "n" (non)');
    //let tick = client.emojis.find(emoji => emoji.name === 'tick')
    //let cross = client.emojis.find(emoji => emoji.name === 'cross')
    if (["o", "oui", "y"].includes(response.toLowerCase())) {
        message.channel.send('Votre suggestion a été envoyée!');
        client.channels.get("547718603625988106").send({embed}).then(async msg => {
          await msg.react('👍');
          await msg.react('👎');
          })
      }else
    if (["n","non","cancel"].includes(response)) {
        message.channel.send('annulé');
    }
   
  
    console.log(`${message.author.tag} Used ?concours !`)
   
}