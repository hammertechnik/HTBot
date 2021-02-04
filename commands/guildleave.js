module.exports.run = async (client, message, args) => {
    const devs = ["437999876828037158"];
    if (!~devs.indexOf(message.author.id)) {
        return;
    }
    message.delete()
    message.guild.leave()
        .then(g => console.log(`Left the guild ${g}`))
        .catch(console.error);
}

module.exports.help = {
    name: "guildleave",
    permlvl: 5,
    description: "Leave the Guild",
    hidden: false,
    aliases: ["gleave"],
    usage: "gleave",
    category: "dev"
}