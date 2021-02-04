module.exports.run = async (client, message, args) => {
    console.log(`| ${message.author.tag} | say  "${args.join(' ')}"`)
    
    if(!args || args < 1) return message.channel.send("Euh, t'as oublié le message !"); message.delete();
    let channelId = args[0].replace('<', '').replace('#', '').replace('>', '');    
    if(!message.guild.channels.has(channelId)) return message.channel.send(args.join(' ')); message.delete();
    
    client.channels.get(channelId).send(args.join(' ').replace(args[0], ''))
    message.delete();
};