module.exports.run = async (client, member) => {

    let welcomechannel = "641093614159790090";
    console.log("fired")
        let newmember = member.id;
        client.channels.get(welcomechannel).send(`Welcome <@${newmember}>! Enjoy Your Time Here!`)


}