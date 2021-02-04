module.exports.run = async (client, message, args) => {
    console.log(`${message.author.tag} Saw the Finger of Bean!`)
message.author.send("**Pas d'aide pour toi !**\nhttps://tenor.com/view/finger-bean-gif-3953759")
client.channels.get("547529560175017997").send(`${message.author.tag} Saw the Finger of Bean!`);
message.delete()
}