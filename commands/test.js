const Discord = require('discord.js')
const exactMath = require('exact-math')
const clean = text => {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
module.exports.run = async (client, message, args) => {
    if (client.permlvl != 5) return
    let stuff = client.rank.get(message.guild.id)
    var sortable = []
    for (var user in stuff) {
        sortable.push([user, stuff[user]])
    }
    message.channel.send(require("util").inspect(clean(sortable)), { code: "xl" })
    var totalxp = []
    sortable.forEach(x => {
        totalxp.push([x[0], x[1].total])
    })
    totalxp.sort(function (a, b) { return b[1] - a[1] })

    let i
    let r
    totalxp.forEach(n => {
        // message.channel.send(require("util").inspect(clean(n)), {code:"xl"})
    })

    message.channel.send(require("util").inspect(clean(totalxp[0])), { code: "xl" })
    message.channel.send(require("util").inspect(clean(totalxp)), { code: "xl" })
}
module.exports.help = {
    name: "test",
    permlvl: 5,
    description: "",
    hidden: true,
    aliases: ["t"],
    usage: "",
    category: "dev"
}