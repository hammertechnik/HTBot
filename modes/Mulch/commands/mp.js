module.exports.run = async (client, message, args) => {
if(!args || args < 1) return message.channel.send("Euh, t'as oublié le message !"); message.delete();
let userID = args[0].replace('<', '').replace('@', '').replace('>', '');   
client.users.get(userID).send(args.join(' ').replace(args[0], ''));
message.delete()
console.log(`| ${message.author.tag} | dm  "${args.join(' ')}"`)
}