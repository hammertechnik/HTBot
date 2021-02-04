module.exports.run = async (client, message, args) => {
    const devs = ["437999876828037158"];
    if(client.permlvl != 5) {
        return;
    }
    message.channel.send('Shutting down...')
    setTimeout(shutdown, 1000);
    function shutdown(){
        process.exit(1)
    }
    console.log(`Shutting down...`)
    
}

module.exports.help = {
    name:"shutdown",
    perms: 5,
    desciption: "Restart the Bot (PM2 Exclusive)",
    hidden: false,
    alieases: [],
    usage: "",
    catergory: ""
  }