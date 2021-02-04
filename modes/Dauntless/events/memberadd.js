module.exports.run = async (client, member) => {
    client.channels.get(client.welcome.get(member.guild.id)).send(`> Welcome to the server <@${member.user.id}>!`)
}