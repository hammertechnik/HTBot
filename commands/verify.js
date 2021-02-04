const Discord = require("discord.js");

const needed_permlvl = 3

module.exports.run = async (client, message, args) => {
  if (client.permlvl < needed_permlvl) return
  if (!client.premium) { if (!message.guild.large) return message.reply("this Feature is for big Servers (250+) and Premium only!") }
  if (args[0]) { }
  let limit = 60000
  let del = true
  let question = "Are you sure you want to Apply for Verification?\nAnswer with **yes** or **no**"
  let answer = await client.awaitReply(message, question, limit, del)
  // if(!["yes", "no"].includes(answer))return message.reply("You need to Answer with **yes** or **no**!")
  if (answer.toLowerCase() == ('no' || 'cancel')) return message.channel.send('Verification Cancelled!'); if (answer.toLowerCase() !== 'yes') return message.channel.send('That is not a valid reply.')
  if (answer == "no") return message.channel.send("Verification Cancelled!")
  let title = await client.awaitReply(message, "Why did you apply for a Verification?\nType \`\`cancel\`\` to cancel", 120000, del)
  if (title == "cancel") return message.channel.send("Verification Cancelled!")
  if (title == false) return message.channel.send("Verification Timed out!")
  let description = await client.awaitReply(message, "Tell us a little about your Server!\nType \`\`cancel\`\` to cancel", 300000, del)
  if (description == "cancel") return message.channel.send("Verification Cancelled!")
  if (description == false) return message.channel.send("Verification Timed out!")

  let confirmembed = new Discord.RichEmbed()
    .setTitle(`Does this look right? (yes | no)`)
    .setDescription(`
Server: ${message.guild.name}
Why you Applied: ${title}
Info About Your Server: ${description}
`)
    .setColor('#FF0000')
    .setTimestamp()
  let confirm = await client.awaitReply(message, confirmembed, 10000, del)
  if (confirm.toLowerCase() == ('no' || 'cancel')) return message.channel.send('Verification Cancelled!'); if (confirm.toLowerCase() !== 'yes') return message.channel.send('That is not a valid reply.')

  await message.channel.createInvite({ maxAge: 0, maxUses: 1, unique: true }, "Applied for Verification, DO NOT REVOKE")
    .then(async invite => {
      var embed = new Discord.RichEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setTitle(`Verification Request | ID: ${message.guild.id}`)
        .setDescription(`Server Owner: ${message.guild.owner.user.tag}`)
        .addField(`Reason: ${title}`, `Info about Server:\n${description}`)
        .addField(`Invite:`, `
Invite Code: ${invite.code}
Invite Link: [Press Here](${invite.url} '${message.guild.name} Invite')
`)
        .setFooter(`Request by ${message.author.tag}`, message.author.avatarURL)
        .setTimestamp()
      const confirmmessage = await client.channels.get(client.verifychannel).send(embed)
      let verify = client.emojis.get('647128502650404864')
      let deny = client.emojis.get('650472278706094100')
      await confirmmessage.react(verify); await confirmmessage.react(deny);
      const collector = confirmmessage.createReactionCollector(r => {
        r.users.forEach(u => {
          if (u.bot) return//;})
          // if(!r.users.has(message.author.id))return r.users.forEach(u => {if(u.id !== client.user.id) r.remove(u)})
          let f = []
          r.users.forEach(u => { if (u.bot) return; f.push({ id: u.id, tag: u.tag }) })
          switch (r.emoji.id) {
            case verify.id:
              let verifiedembed = new Discord.RichEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL)
                .setTitle(`Verification Accepted | ID: ${message.guild.id}`)
                .setDescription(`Verfied by: <@${f[0].id}>`)
                .addField(`Server: ${message.guild.name}`, `By: ${message.guild.owner.user.tag}`)
                .setFooter(`Request by ${message.author.tag}`, message.author.avatarURL)
                .setTimestamp()
              confirmmessage.edit(verifiedembed)
              confirmmessage.clearReactions()
              collector.stop();
              client.verification.set(message.guild.id, true)
              message.author.send(`Your Server Verification for **${message.guild.name}** got accepted!`)
              if (message.author.id != message.guild.owner.user.id) message.guild.owner.user.send(`Your Server **${message.guild.name}** got verified!`)
              break;
            case deny.id:
              let deniedembed = new Discord.RichEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL)
                .setTitle(`Verification Denied | ID: ${message.guild.id}`)
                .setDescription(`Denied by: <@${f[0].id}>`)
                .addField(`Server: ${message.guild.name}`, `By: ${message.guild.owner.user.tag}`)
                .setFooter(`Request by ${message.author.tag}`, message.author.avatarURL)
                .setTimestamp()
              confirmmessage.edit(deniedembed)
              confirmmessage.clearReactions()
              collector.stop();
              client.verification.set(message.guild.id, false)
              message.author.send(`Your Server Verification for **${message.guild.name}** got denied!`)
              break;
          }
        });
      });
      message.reply(`The Server **${message.guild.name}** has been Applied for Verification!`)
    })
    .catch(console.error);
  message.delete(30000)
}
module.exports.help = {
  name: "verify",
  permlvl: 2,
  description: "Apply your Server for Verification",
  hidden: false,
  aliases: [],
  usage: "verify",
  category: "admin"
}