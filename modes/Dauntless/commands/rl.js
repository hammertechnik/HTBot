exports.run = (client, message, args) => {

    const devs = ["437999876828037158"];
    if (!~devs.indexOf(message.author.id)) {
        return;
    }
    if (!args || args < 1) return message.reply("you have to add what file to reload.")

    delete require.cache[require.resolve(`./${args[0]}.js`)];
    message.reply(`The file **${args[0]}** has been reloaded!`);
};

module.exports.help = {
    name: "rl",
    perms: 5,
    desciption: "Reload a Specific File",
    hidden: false,
    alieases: [],
    usage: "",
    catergory: ""
}