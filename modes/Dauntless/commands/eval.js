exports.run = (client, message, args) => {
  const devs = ["437999876828037158"];
  if (client.permlvl != 5) {
    return (message.reply("You are **NOT** allowed to use this command!"))
  }

  const clean = text => {
    if (typeof (text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
      return text;
  }

  try {
    let evaled = eval(args.join(' '));

    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);

    message.channel.send(clean(evaled), { code: "xl" });
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }

};

module.exports.help = {
  name: "eval",
  perms: 5,
  desciption: "Evaluate Small Portions of Code or Variables",
  hidden: false,
  alieases: [],
  usage: "",
  catergory: ""
}