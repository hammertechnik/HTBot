exports.run = (client, message, args) => {
    if (!args[0]) return message.channel.send('> You have got to say something! :facepalm:');
    message.channel.send(args.join(' '))
    message.delete()
};