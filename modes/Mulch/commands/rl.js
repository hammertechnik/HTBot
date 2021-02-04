exports.run = (client, message, args) => {

    const devs = ["437999876828037158"];
    if (!~devs.indexOf(message.author.id)) {
        return;
    }
    if (!args || args < 1) return message.reply("tu dois ajouter un fichier à réinitialiser.")
   
    delete require.cache[require.resolve(`./${args[0]}.js`)];
    message.reply(` Le fichier **${args[0]}**  a été réinitialisé!`);
}; 