exports.run = (client, message, args) => {
    message.channel.send('> Ping? :signal_strength:').then((msg) => {
        msg.edit(`> Looking good! Latency: ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency: ${Math.round(client.ping)}ms.`)
    })
}