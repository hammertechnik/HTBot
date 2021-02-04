const needed_permlvl = 2

module.exports.run = async (client, message, args) => {
  if (client.permlvl < needed_permlvl) return message.reply("doesnt look like you have the perms to do this!")

  const devs = ["437999876828037158"];

  // if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");

  const deleteCount = parseInt(args[0], 10) + 1

  if (!deleteCount || deleteCount < 2 || deleteCount > 101)
    return message.reply("Please provide a number between 1 and 100 for the number of messages to delete");

  const fetched = await message.channel.fetchMessages({ limit: deleteCount });
  message.channel.bulkDelete(fetched)
    .catch(error => message.reply(`Couldn't delete messages because of: \n${error}`));
}

module.exports.help = {
  name: "clear",
  permlvl: 2,
  description: "Remove a Number of Messages",
  hidden: false,
  aliases: [],
  usage: "clear [number]",
  category: "mod"
}