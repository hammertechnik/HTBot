const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!args[0]) return
  switch (args[0]) {
    case "stream": {
      if (message.author.id == '486213558577790978') { } else if (client.permlvl < 5) return message.reply("doesnt look like you have the perms to do this!")
      if (["enable", "on"].includes(args[1])) { message.member.addRole("653005846451585046").catch(console.error); return }
      if (["disable", "off"].includes(args[1])) { message.member.removeRole("653005846451585046").catch(console.error); return }
      if (!["enable", "disable"].includes(args[1])) return message.reply("invalid option")
      break
    }
    case "archive": message.reply("https://docs.google.com/forms/d/e/1FAIpQLScZcdQw_Wnd0Xoo4FDfQRiakaauOYSBhdBV3PUpIfA_OwnxoA/viewform"); break
    case "nick": {
      if (client.permlvl < 3) return message.reply("doesnt look like you have the perms to do this!")
      switch (args[1]) {
        case "nova": {
          message.guild.members.get(client.user.id).setNickname(args.join(" ").replace(args[0], '').replace(args[1], ''))
          break
        }
        case "user": {
          message.guild.members.get(args[2].replace("<", "").replace("@", "").replace("!", "").replace(">", "")).setNickname(args.join(" ").replace(args[0], '').replace(args[1], '').replace(args[2], ''))
          break
        }
      }
      break
    }
    case "counter": {
      let users = []
      let bots = []
      client.guilds.get(message.guild.id).members.forEach(u => {
        if (u.user.bot) { bots.push(u.user.id) } else { users.push(u.user.id) }
      })
      //@ts-ignore
      client.channels.get(args[1]).setName(`Members: ${client.guilds.get('546008502754082830').members.size}`, "Membercounter Update")
      //@ts-ignore
      client.channels.get(args[2]).setName(`Users: ${users.length}`, "Membercounter Update")
      //@ts-ignore
      client.channels.get(args[3]).setName(`Bots: ${bots.length}`, "Membercounter Update")
      message.reply("Counter created!")
      setInterval(() => {
        let users = []
        let bots = []
        client.guilds.get(message.guild.id).members.forEach(u => {
          if (u.user.bot) { bots.push(u.user.id) } else { users.push(u.user.id) }
        })
        //@ts-ignore
        client.channels.get(args[1]).setName(`Members: ${client.guilds.get('546008502754082830').members.size}`, "Membercounter Update")
        //@ts-ignore
        client.channels.get(args[2]).setName(`Users: ${users.length}`, "Membercounter Update")
        //@ts-ignore
        client.channels.get(args[3]).setName(`Bots: ${bots.length}`, "Membercounter Update")
      }, 1000 * 60 * 1)
    }
    default: { break }
  }
}
module.exports.help = {
  name: "devtool",
  permlvl: 3,
  description: "Show or Use Devtools",
  hidden: false,
  aliases: ["tool"],
  usage: "devtool [tool]",
  category: "dev"
}

      //Martin or vixel hi im not Hammer
      //Then who are you?
