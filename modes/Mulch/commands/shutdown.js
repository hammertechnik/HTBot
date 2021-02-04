module.exports.run = async (client, message, args, p, host) => {
if(host.permlvl < 3)return
    message.channel.send('Fermeture....')
    setTimeout(shutdown, 1000);
    function shutdown(){
        client.destroy()
    }
    
}