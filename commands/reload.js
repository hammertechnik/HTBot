exports.run = (client, message, args) => {

    // const devs = ["437999876828037158"];
    // if (!~devs.indexOf(message.author.id)) {
    //     return;
    // }
    if (client.permlvl != 5) return

    if (!args || args < 1) return message.reply("you have to add what file to reload.")

    let cmd = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));

    try { require(`./${cmd.name}.js`) } catch (e) { return message.channel.send('Thats neither a commandname, nor an alias for one...') }
    delete require.cache[require.resolve(`./${cmd.name}.js`)];

    const props = require(`./${cmd.name}`).help;
    client.commands.set(props.name, props);
    props.aliases.forEach(a => {
        client.aliases.set(a, props.name)
    });
    message.reply(`The file **${cmd.name}.js** has been reloaded`);

    // delete require.cache[require.resolve(`./${args[0]}.js`)];
    // message.reply(`The file **${args[0]}** has been reloaded!`);
};

module.exports.help = {
    name: "reload",
    permlvl: 5,
    description: "Reload a Specific File",
    hidden: false,
    aliases: ["rl"],
    usage: "reload [command]",
    category: "dev"
}