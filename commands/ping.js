exports.run = (client, message, args) => {
    console.log(`| ${message.author.tag} | ping`)

    message.channel.send('Ping?').then((msg) => {
        msg.edit(`Pong! Latency: ${msg.createdTimestamp - message.createdTimestamp}ms. API latency: ${Math.round(client.ping)}ms.`)
        message.delete();
        console.log(`Latency: ${msg.createdTimestamp - message.createdTimestamp}ms. API latency: ${Math.round(client.ping)}ms.`)
    });
}

module.exports.help = {
    name: "ping",
    permlvl: 1,
    description: "Show the Speed at which we can command you!",
    hidden: false,
    aliases: [],
    usage: "ping",
    category: "info"
}