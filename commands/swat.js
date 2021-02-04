const needed_perms = 5

module.exports.run = async (client, message, args) => {
    // const devs = ["437999876828037158"];
    // if (!~devs.indexOf(message.author.id)) {
    //     return (message.reply("You are **NOT** allowed to use this command!"))
    // }

    if (client.permlvl < needed_perms) return message.reply("not enough perms!")

    message.channel.send("👐**UR SWATTED! HANDS UP!**👐\nhttps://tenor.com/view/swat-raids-party-gif-11411207").then(async msg => {
        await msg.react('👐');
    })
    message.delete()
}

module.exports.help = {
    name: "swat",
    permlvl: 5,
    description: "Swat your friends!",
    hidden: false,
    aliases: ["fbi"],
    usage: "swat",
    category: "misc"
}