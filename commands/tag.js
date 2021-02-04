// @ts-check
exports.run = async (client, message, args) => {
  message.delete()
  const devs = ["437999876828037158", "188762891137056769"];
  if (!~devs.indexOf(message.author.id)) {
    message.channel.send('Who are you fooling?')
    const times = x => f => {
      if (x > 0) {
        f()
        times(x - 1)(f)
      }
    }
    times(args[1])(() => message.reply(''))
    return;
  }
  message.delete()
  const times = x => f => {
    if (x > 0) {
      f()
      times(x - 1)(f)
    }
  }

  times(args[1])(() => message.channel.send(args[0]).then(async msg => await msg.delete(2000).catch(e => message.return(`\`\`ERR\`\`\n${e}`))));
}
exports.help = {
  name: "tag",
  description: "tag someone... a lot",
  usage: "tag [User] [Times]",
  aliases: [],
  permlvl: 5,
  hidden: false,
  category: "dev"
}