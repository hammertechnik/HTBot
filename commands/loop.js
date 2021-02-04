const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    if (!client.premium) {
        return message.channel.send("<:deny:650472278706094100> **This Command can only be used by Premium Members**")
    }
    let db = client.temp
    if (!db.has(message.guild.id)) await db.set(message.guild.id, {})
    if (!db.has(message.guild.id, "loop")) await db.set(message.guild.id, { "loop": false })
    let state = db.get(message.guild.id, "loop")
    switch (state) {
        case true: { db.set(message.guild.id, { "loop": false }); message.channel.send(`<:deny:650472278706094100> **Song Loop disabled!**`); break }
        case false: { db.set(message.guild.id, { "loop": true }); message.channel.send(`🔁 **Song Loop enabled!**`); break }
    }
}
module.exports.help = {
    name: "loop",
    description: "Loops a Song [P]",
    aliases: [],
    permlvl: 1,
    hidden: false,
    category: "music",
    usage: "loop"
}