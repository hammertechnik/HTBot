// @ts-check
const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    let color;
    let imidient;

    if (!args || args < 1) {
        imidient = false
    } else {
        imidient = true
    }

    if (imidient) {
        if (args[0].slice(0, 1) == "#") {
            if (args[0].length !== 7) {
                message.reply("That isn't a valid hexcode, remember to include the #")
                return
            }
            color = args[0]
            let rankcard = JSON.parse(fs.readFileSync("./storage/rankcard.json", "utf8",));

            rankcard[message.author.id] = {
                color: color
            };

            fs.writeFile("./storage/rankcard.json", JSON.stringify(rankcard, null, '\t'), (err) => {
                if (err) console.log(err)
            });
            await message.channel.send("Rankcard updated!")
            return
        } else {
            message.reply("That isn't a valid hexcode, remember to include the #")
            return
        }
    }

    client.awaitReply = async (msg, question, limit = 60000) => {
        const filter = m => m.author.id === msg.author.id;
        await msg.channel.send(question);
        try {
            const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
            return collected.first().content;
        } catch (e) {
            return false;
        }
    };

    const response = await client.awaitReply(message, "To customize the color of your rankcard send the hexcode for the color you want your card to have\n(You can find the hexcode here: https://htmlcolorcodes.com/color-picker/)");
    // if (["test"].includes(response)) {
    //     message.channel.send("test");
    // }else

    if (["cancel"].includes(response)) {
        message.reply("Canceled!");
        return
    } else

        if (["remove"].includes(response)) {
        } else

            if (response.slice(0, 1) !== "#") {
                message.reply("That isn't a valid hexcode, remember to include the #")
                return
                // message.channel.send(`${response.slice(0,1)}, ${response.length}`)
            } else

                if (response.length !== 7) {
                    message.reply("That isn't a valid hexcode, remember to include the #")
                    return
                }

    if (!imidient) {
        color = response
    }

    /*json write here*/

    let rankcard = JSON.parse(fs.readFileSync("./storage/rankcard.json", "utf8",));

    rankcard[message.author.id] = {
        color: color
    };

    fs.writeFile("./storage/rankcard.json", JSON.stringify(rankcard, null, '\t'), (err) => {
        if (err) console.log(err)
    });

    await message.channel.send("Rankcard updated!")

}

module.exports.help = {
    name: "rankcolor",
    permlvl: 1,
    description: "Change the color of you rankcard",
    hidden: false,
    aliases: ["rc"],
    usage: "rankcolor [#hex]",
    category: "misc"
}