exports.run = (client, message, args, p, host) => {
    const devs = ["437999876828037158"];
    if (!~devs.indexOf(message.author.id)) {
        return (message.reply("You are **NOT** allowed to use this command!"))
    }

    const clean = text => {
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
      }
 
        try {
          let evaled = eval(args.join(' '));
     
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
     
          message.channel.send(clean(evaled), {code:"xl"});
        } catch (err) {
          message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
      
};