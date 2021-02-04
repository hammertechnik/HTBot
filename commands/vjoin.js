module.exports.run = async (bot, msg, args) => {
    const devs = ["437999876828037158"];
    if (!~devs.indexOf(msg.author.id)) {
        return (msg.reply("You are not allowed to use this command!"))
    }
    msg.member.voiceChannel.join()
    msg.delete()
}

module.exports.help = {
    name: "vjoin",
    permlvl: 5,
    description: "Force join Nova to a VC",
    hidden: false,
    aliases: [],
    usage: "vjoin",
    category: "dev"
}