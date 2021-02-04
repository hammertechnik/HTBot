// @ts-check

const Discord = require("discord.js");
// const dl = require('discord-leveling')
const exectMath = require('exact-math')
const fs = require("fs");
// let rank = require("../storage/ranks.json");
let premium_file = JSON.parse(fs.readFileSync("./storage/premium.json", "utf8"));

const inline = true

async function totalxpcalc(client, message) {
  let stuff = client.rank.get(message.guild.id)
  var sortable = []
  for (var user in stuff) {
    sortable.push([user, stuff[user]])
  }
  var totalxp = []
  sortable.forEach(x => {
    totalxp.push([x[0], x[1].total])
  })
  totalxp.sort(function (a, b) { return b[1] - a[1] })
  let output = { "s": sortable, "txp": totalxp }
  return totalxp
}

module.exports.run = async (client, message, args) => {
  if (!client.leveling) return message.reply("Leveling has been disabled temporarily!")

  let member;
  let membername;
  let memberid
  let memberpic;
  let memberbot;
  let badge = "";
  let ranking;

  let rankcard = JSON.parse(fs.readFileSync('./storage/rankcard.json', "utf8",));
  let color;
  const defcolor = "#00eedd"

  if (!args[0]) {
    member = (message.author.id)
    memberbot = false
    membername = message.author.tag
    memberid = message.author.id
    memberpic = message.author.avatarURL
    ranking = NaN

    if (!rankcard[message.author.id]) {
      color = defcolor
    } else {
      color = rankcard[message.author.id].color
    }
  } else {
    const tag = args.shift().slice(0, 1)
    if (tag !== "<") return message.reply("invalid tag provided!").then(msg => { msg.delete(5000) }).then(message.delete())

    if (!rankcard[message.guild.member(message.mentions.users.first()).user.id]) {
      color = defcolor
    } else {
      color = rankcard[message.guild.member(message.mentions.users.first()).user.id].color
    }

    // let stuff = client.rank.get(message.guild.id)
    // var sortable = []
    // for (var user in stuff) {
    //     sortable.push([user, stuff[user]])

    // }
    // var totalxp = []
    // sortable.forEach(x => {
    //     totalxp.push([x[0], x[1].total])
    // })
    // totalxp.sort(function(a, b){return b[1]-a[1]})

    member = message.guild.member(message.mentions.users.first()).user.id
    memberbot = message.guild.member(message.mentions.users.first()).bot
    membername = message.guild.member(message.mentions.users.first()).user.tag
    memberid = message.guild.member(message.mentions.users.first()).user.id
    memberpic = message.guild.member(message.mentions.users.first()).user.avatarURL
    ranking = client.clean(totalxpcalc)
  }
  if (!client.rank.has(message.guild.id)) return message.reply(`there has been a Error! Please report it to the Support Staff at HT, or with the Bug Report Tool: \`\`!bug\`\`\nError code: \`\`RANK_GUILD_EXEPTION\`\``)
  if (memberbot) return message.reply(`Bots dont have a Rank!`)
  if (!client.rank.has(message.guild.id, member)) return message.channel.send(`The Member <@${member}> isnt ranked yet!`)
  if (premium_file.toString().includes(memberid)) badge = "🎖️"
  if (client.guilds.get('546008502754082830').roles.get('552758121789915136').members.map(m => m.user.id).includes(memberid)) badge = "<:dev:647216230448496655>"

  let xp = client.rank.get(message.guild.id, `${member}.xp`)
  let lvl = client.rank.get(message.guild.id, `${member}.lvl`)
  var nxp = exectMath.floor(5 * (lvl * lvl) + 50 * lvl + 100)

  let rankEmbed = new Discord.RichEmbed()
    .setTitle(`${badge} ${membername}`)
    .setColor(color)
    // .setDescription(`Rank: #${ranking}`)
    .setThumbnail(memberpic)
    .addField("XP:", `${xp}/${nxp}`, inline)
    .addField("Level:", lvl, inline)
    .setFooter(`${client.user.username} by Hammer1279`, client.user.displayAvatarURL)
    .setTimestamp()

  message.channel.send(rankEmbed)//.then(msg => {msg.delete(8000)});
  message.delete()

  console.log(lvl)

}

module.exports.help = {
  name: "rank",
  permlvl: 1,
  description: "Check your Rank",
  hidden: false,
  aliases: ["r"],
  usage: "rank <@user>",
  category: "info"
}