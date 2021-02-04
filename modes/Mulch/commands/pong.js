exports.run = (client, message, args) => {
    console.log(`| ${message.author.tag} | ping`)

    message.channel.send('Ping?').then((msg) => {
        msg.edit(`Pong! Latency: ${msg.createdTimestamp - message.createdTimestamp}ms. API latency: ${Math.round(client.ping)}ms. `)
        message.delete();
    });
}