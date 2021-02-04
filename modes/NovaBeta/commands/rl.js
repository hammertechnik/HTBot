exports.run = (client, message, args) => {

    const devs = ["437999876828037158"];
    if (!~devs.indexOf(message.author.id)) {
        return;
    }
    if (!args || args < 1) return message.reply("you have to add what file to reload.")
    if(args[0] == "index"){
        delete require.cache[require.resolve(`../index.js`)];
        message.reply(`The index file has been reloaded!`);
    }
   
    delete require.cache[require.resolve(`./${args[0]}.js`)];
    message.reply(`The file **${args[0]}** has been reloaded!`);
}; 

module.exports.help = {
    name:"rl",
    perms: 5,
    desciption: "Reload a Specific File",
    hidden: false,
    alieases: [],
    usage: "",
    catergory: ""
  }