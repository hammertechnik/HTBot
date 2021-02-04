exports.run = (client, message, args) => {
    message.channel.send(`> **__Users:__**\n> ${client.users.size}\n> \n> **__Guilds/Servers:__**\n> ${client.guilds.size}\n> \n> **__Channels:__**\n> ${client.channels.size}`).then((msg) => {
    })
}