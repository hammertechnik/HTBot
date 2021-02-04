// @ts-nocheck

const langfile = require("../storage/translation/language.json")

"use strict"
const YTDL = require("ytdl-core");
const search = require("youtube-search");

var options1 = {
    maxResults: 10,
    type: 'video',
    videoCategoryId: '10',
    key: 'YoutubeAPI-Key'
};
var options2 = {
    maxResults: 1,
    type: 'video',
    videoCategoryId: '10',
    key: 'YoutubeAPI-Key'
};

let max_loop = 10

async function Play(connection, message, lan) {
    var server = global.servers[message.guild.id];
    if (!global.volume.has(message.guild.id)) { await global.volume.set(message.guild.id, 1) }
    server.dispatcher = connection.playStream(YTDL(server.queue[0], { quality: "highestaudio", filter: "audioonly", highWaterMark: 1 << 25 }));
    global.dispatcher = server.dispatcher
    connection.player.setBitrate("auto");
    await server.dispatcher.setVolumeLogarithmic(global.volume.get(message.guild.id))
    YTDL.getInfo(server.queue[0], (err, info) => {
        if (err) return message.reply(lan.err)
        setTimeout(() => {
            if (global.temp.has(message.guild.id)) {
                if (global.temp.has(message.guild.id, "loop")) {
                    if (!global.temp.get(message.guild.id, "loop")) {
                        let i = 0;
                        message.channel.send(`${lan.play}: ${info.author.name} - ${info.title}`); i++; if (i <= max_loop) global.temp.set(message.guild.id, false, "loop"); message.channel.send(`<:deny:650472278706094100> **Song Loop disabled!**`)
                    }
                } else { message.channel.send(`${lan.play}: ${info.author.name} - ${info.title}`); }
            } else { message.channel.send(`${lan.play}: ${info.author.name} - ${info.title}`); }
        }, 1000)
    })

    server.dispatcher.on("end", () => {
        if (global.temp.has(message.guild.id)) { if (global.temp.has(message.guild.id, "loop")) { if (!global.temp.get(message.guild.id, "loop")) { server.queue.shift(); } else { } } } else { server.queue.shift(); }
        if (server.queue[0]) {
            Play(connection, message, lan);
        }
        else {
            connection.disconnect();
            global.volume.delete(message.guild.id)
            message.channel.send(lan.finish);
        }
    });
}

let nl = 25
let bl = 5

const needed_permlvl = 1

module.exports.run = async (client, message, args) => {
    if (client.permlvl < needed_permlvl) return message.reply("doesnt look like you have the perms to do this!")
    if (!global.music) return message.reply("Music has been disabled by the Developers!")
    if (!client.premium) {

    }

    var short = args.join("+")

    let lan
    if (client.language.get(message.guild.id) == "eng") {
        lan = langfile.english.music.play
    }
    if (client.language.get(message.guild.id) == "ger") {
        lan = langfile.german.music.play
    }
    if (client.language.get(message.guild.id) == "fr") {
        lan = langfile.french.music.play
    }
    if (client.language.get(message.guild.id) == "cz") {
        lan = langfile.czech.music.play
    }
    if (client.language.get(message.guild.id) == "ru") {
        lan = langfile.russian.music.play
    }

    if (message.member.voiceChannel) {//commander is in voiceChannel
        if (typeof args[0] == "undefined") {
            message.channel.send(lan.undefined);
        }
        else {
            if (message.guild.voiceConnection) {//I'm in voicechannel
                if (message.member.voiceChannel.id === message.guild.voiceConnection.channel.id) {//ids of my Voicechannel and commander's one are same -> we are in the same voiceChannel
                    if (!global.servers[message.guild.id]) {//If this server isn't in my server list, I'll add it
                        global.servers[message.guild.id] = { queue: [] }//And create queue for it
                    }
                    if (YTDL.validateURL(args[0])) {//If commander entered valid YT url
                        global.servers[message.guild.id].queue.push(args[0]);//I add video url to queue
                        if (!global.servers[message.guild.id].queue[1]) {
                            Play(message.guild.voiceConnection, message, lan);
                        }
                        else {
                            message.channel.send(lan.add);
                        }
                    }
                    else {//I search the video on YouTube
                        //token 1
                        search(short, options1, (err, results) => {
                            if (err) { message.channel.send(client.clean(err), { code: "xl" }), client.temp.set("backup", true); return }
                            // if (err) return console.log(err);
                            if (!client.premium) {
                                let i = 0; global.servers[message.guild.id].queue.forEach(() => { i++ });
                                if (i >= nl) return message.channel.send(`<:deny:650472278706094100> **You Exeeded the ${nl} Song limit!**`)
                            }
                            global.servers[message.guild.id].queue.push(results[0].link);//I add video url to queue

                            if (!global.servers[message.guild.id].queue[1]) {
                                Play(message.guild.voiceConnection, message, lan);
                            }
                            else {
                                message.channel.send(lan.add);
                            }
                        });
                        if (client.temp.get("backup")) {
                            if (client.premium) {
                                let confirm = await client.awaitReply(message, "Using Backup API, Confirm?", 5000, false)
                                if (!confirm) { return } else { if (confirm != "yes") return }
                                message.reply("using Backup API!")
                                search(short, options2, (err, results) => {
                                    if (err) message.channel.send(client.clean(err), { code: "xl" });
                                    let i = 0; global.servers[message.guild.id].queue.forEach(() => { i++ });
                                    if (i >= bl) return message.channel.send(`<:deny:650472278706094100> **You Exeeded the ${bl} Song Backup API Limit!**`)
                                    global.servers[message.guild.id].queue.push(results[0].link);
                                    if (!global.servers[message.guild.id].queue[1]) {
                                        Play(message.guild.voiceConnection, message, lan);
                                    }
                                    else {
                                        message.channel.send(lan.add);
                                    }
                                })
                            } else { }
                            return
                        }

                    }
                }
                else {
                    message.channel.send(lan.channel);
                }
            }
            else { //I join commanders voice channel
                //----------------------
                //TODODODODODODODOOD: dodělat vyhledávání i tady!
                //----------------------
                require("./join").run(client, message, args).then(() => {
                    if (!global.servers[message.guild.id]) {//If this server isn't in my server list, I'll add it
                        global.servers[message.guild.id] = { queue: [] }//And create queue for it
                    }
                    if (YTDL.validateURL(args[0])) {//If commander entered valid YT url
                        global.servers[message.guild.id].queue.push(args[0]);
                        // console.log(global.servers[message.guild.id].queue[0]);
                        Play(message.guild.voiceConnection, message, lan);
                    }
                    else {//I search the video on YouTube
                        let backup = false
                        search(short, options1, (err, results) => {
                            if (err) { message.channel.send(client.clean(err), { code: "xl" }); backup = true; return } //console.log(err);
                            global.servers[message.guild.id].queue.push(results[0].link);//I add video url to queue

                            if (!global.servers[message.guild.id].queue[1]) {
                                Play(message.guild.voiceConnection, message, lan);
                            }
                            else {
                                message.channel.send(lan.add);
                            }
                        });
                        if (backup) {
                            if (client.premium) {
                                search(short, options2, (err, results) => {
                                    let confirm = client.awaitReply(message, "Using Backup API, Confirm?", 5000, false)
                                    if (!confirm) { return } else { if (confirm != "yes") return }
                                    message.reply("using Backup API!")
                                    if (err) return message.channel.send(client.clean(err), { code: "xl" }) //console.log(err);
                                    global.servers[message.guild.id].queue.push(results[0].link);//I add video url to queue

                                    if (!global.servers[message.guild.id].queue[1]) {
                                        Play(message.guild.voiceConnection, message, lan);
                                    }
                                    else {
                                        message.channel.send(lan.add);
                                    }
                                });
                            }
                        }
                    }
                });
            }
        }
    }
    else {
        message.channel.send(lan.nochannel);
    }
}

module.exports.help = {
    name: "play",
    permlvl: 1,
    description: "Play some Music.",
    hidden: false,
    aliases: ["p"],
    usage: "play [Name/URL]",
    category: "music"
}