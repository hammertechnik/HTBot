exports.run = (client, message, args) => {
    message.author.send("Invite me to your Server:\nhttps://discordapp.com/api/oauth2/authorize?client_id=539497240780341248&permissions=1916267615&scope=bot")
    message.delete();
};

module.exports.help = {
    name: "invite",
    permlvl: 1,
    description: "Gives the KappaBot Invite",
    hidden: false,
    aliases: [],
    usage: "invite",
    category: "info"
}