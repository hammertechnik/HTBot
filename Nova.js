// @ts-check

exports.index = (async (token, db, beta) => {

  const Discord = require('discord.js')
  const fs = require('fs')
  const { promisify } = require("util");
  // @ts-ignore
  const { inspect } = require("util");
  const readdir = promisify(require("fs").readdir);
  const Enmap = require("enmap")
  // @ts-ignore
  const exectMath = require('exact-math')
  const client = new Discord.Client();
  const chalk = require('chalk');

  console.log("Modules Loaded!")

  // const dl = require('discord-leveling')

  // @ts-ignore
  global.servers = {};

  // @ts-ignore
  const conf = { "prefix": "!" }
  // @ts-ignore
  const mode_list = require('./storage/mode.json');
  // @ts-ignore
  const package = require('./package.json');

  // @ts-ignore
  const talkedRecently = new Set();

  /debug tools/
  let config = new Enmap({ name: "config" })
  //const beta=false //depricated, only use for permlvl 4 | disabled update 3.3.5
  const logging = false //old vars, needs update
  const console_mode = false //depricated, got removed in QoL1
  const leveling = true //disable in event of work on rank enmap
  const advanced_status = true //dynamic status
  const devstream = false //must turn advanced status off
  const live_panel = true //live status panel
  const counter = false //live member counter (VC's)
  const music = true //disable music command
  const bclk = true //disables blacklisting system

  const dmchannel = "586718051811065872"
  const serverlog = "616263131974467588"
  const lp_chn_id = "640353615088844820"
  const lp_msg_id = "679076997246353427"
  //@ts-ignore
  client.verifychannel = "647093451569233951"

  // hardcoded servers with limited access
  const limited = ["264445053596991498", "317279640354029569", "547128960140705822"]

  console.log("Bot settings loaded!")

  // @ts-ignore
  if (!leveling) console.warn(chalk.yellow("WARN") + " " + "Leveling System Disabled!")

  // @ts-ignore
  if (!music) console.warn(chalk.yellow("WARN") + " " + "Music System Disabled!")

  // @ts-ignore
  if (!bclk) console.warn(chalk.yellow("WARN") + " " + "Blacklisting System Disabled!")

  //const prefix = '!';

  // Enmap init
  let warnings = new Enmap({ name: "warns" })
  let rank = new Enmap({ name: "rank" })
  let mute = new Enmap({ name: "mute" })
  let language = new Enmap({ name: "lang" })
  //@ts-ignore
  global.language = language
  let welcome = new Enmap({ name: "welcome" })
  let suggest = new Enmap({ name: "suggest" })
  let verification = new Enmap({ name: "partner" })
  let set = new Enmap({ name: "ctrlset" })
  let blacklist = new Enmap({ name: "blcklst" })
  let volume = new Enmap()
  let commands = new Enmap();
  let aliases = new Enmap();
  let tempdb = new Enmap();
  console.log("Enmap init done!")

  // function login(token){
  //   console.log("Attempting to Login to the Client...")
  //   client.login(token)
  //   if(!client){
  //     login(token)
  //   }
  // }
  //
  // login(config.token.main)

  client.on('ready', async () => {
    if (!beta) {
      // @ts-ignore
      console.info(chalk.yellow(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`))
    } else {
      // @ts-ignore
      console.info(chalk.yellow(`Bot started in Beta Mode: ${client.guilds.size} Guilds, ${client.channels.size} Channels and with ${client.users.size} Users!`))
    }

    if (!advanced_status) {
      if (!beta) {
        if (devstream) {
          client.user.setActivity(`the HT DevStream`, { url: 'https://www.twitch.tv/hammertechnik', type: 'STREAMING' },)
        } else {
          client.user.setActivity('HammerMusic', { url: 'https://www.twitch.tv/hammer1279', type: 'LISTENING' },);
          client.user.setStatus('dnd')
        }
      } else {
        client.user.setGame('made by HammerTechnik')
        client.user.setStatus('idle')
      }
    } else {
      //advanced status
      client.user.setStatus('dnd')
      let a = 3
      setInterval(() => {
        if (a == 1) {
          client.user.setActivity(`over ${client.users.size} Members`, { url: 'https://www.twitch.tv/hammer1279', type: 'WATCHING' },)
          a = 2
          return
        }
        if (a == 2) {
          client.user.setActivity(`in ${client.guilds.size} Servers`, { url: 'https://www.twitch.tv/hammer1279', type: 'PLAYING' },)
          if (music) a = 3
          else a = 4
          return
        }
        if (a == 3) {
          client.user.setActivity(`NovaMusic`, { url: 'https://www.twitch.tv/hammer1279', type: 'LISTENING' },)
          a = 4
          return
        }
        if (a == 4) {
          client.user.setActivity(`made by HT`, { url: 'https://www.twitch.tv/hammer1279', type: 'STREAMING' },)
          a = 5
          return
        }
        if (a == 5) {
          client.user.setActivity(`Update ${package.version} - ${package.vname}`, { url: 'https://www.twitch.tv/hammer1279', type: 'WATCHING' },)
          a = 1
          return
        }
      }, 10000)
    }
    //Auto Updating Status Changes
    if (live_panel) {
      setInterval(() => {
        //console.log("Fired!")
        let totalSeconds = (client.uptime / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        let mchannel = "636365781386657803"

        let uptime = `${hours} hours and ${minutes} minutes`;
        //@ts-ignore


        //let membed = client.channels.get("640353615088844820").embeds[0]
        let sembed = new Discord.RichEmbed()
          .setColor('#00eedd')
          .setAuthor(`${client.user.username}:`)
          .attachFiles([`content/avatar.png`])
          // .attachFiles([`content/htlogo.png`])
          // .attachFiles([`content/online.png`])
          .setDescription(`LIVE Info Panel`)
          .setThumbnail(`attachment://avatar.png`)
          .setTimestamp()
          .setFooter(`${client.user.username} created by HammerTechnik`, client.user.avatarURL)
          // .addField("Online:", `<:online:640363931931639828>`)
          .addField("Stats:", `👨Users: ${client.users.size}
      \n🔗Servers: ${client.guilds.size}
      \n#⃣Channels ${client.channels.size}
      \n🛰Ping: ${Math.round(client.ping)}ms
      \n🔋Uptime: ${uptime}`)
        //@ts-ignore
        client.channels.get(lp_chn_id).fetchMessage(lp_msg_id).then(msg => msg.edit(sembed))
      }, 1000 * 60 * 1)
    }

    if (counter) {
      setInterval(() => {
        let users = []
        let bots = []
        client.guilds.get('546008502754082830').members.forEach(u => {
          if (u.user.bot) { bots.push(u.user.id) } else { users.push(u.user.id) }
        })
        //@ts-ignore
        client.channels.get("650744897829208077").setName(`Members: ${client.guilds.get('546008502754082830').members.size}`, "Membercounter Update")
        //@ts-ignore
        client.channels.get("650790545064460328").setName(`Users: ${users.length}`, "Membercounter Update")
        //@ts-ignore
        client.channels.get("").setName(`Bots: ${bots.length}`, "Membercounter Update")
      }, 1000 * 60 * 1)
    }

    /dynamic help init/
    const cmdFiles = await readdir("./commands/")
    // cmdFiles.forEach(cmd => {})
    let i = 0;
    cmdFiles.forEach(commandName => {
      try {
        const props = require(`./commands/${commandName}`).help;
        // console.log(props)
        commands.set(props.name, props);

        props.aliases.forEach(a => {
          //@ts-ignore
          aliases.set(a, props.name)
        })
      } catch (e) {
        if (commandName == "disabled") return
        // @ts-ignore
        console.error(chalk.bgRed("ERR") + " " + `Unable to load ${commandName}: ${e}`)
      } (commandName); i++;
    }); console.log(`Loaded ${i} commands`)

    // @ts-ignore
    console.log(chalk.green("Init done and Ready to serve!"))
  });

  client.on('guildCreate', (guild) => {
    console.log(`| New Guild | ${guild.name} - ${guild.memberCount}`)
    // @ts-ignore
    client.channels.get(serverlog).send(`> | New Guild | ${guild.name} - ${guild.memberCount}`)
  });

  client.on('guildDelete', (guild) => {
    console.log(`| Kicked | ${guild.name}`);
    // @ts-ignore
    client.channels.get(serverlog).send(`> | Kicked | ${guild.name} - ${guild.memberCount}`)
    rank.delete(guild.id)
  });

  /dm listener/
  client.on('message', async message => {
    if (message.author.bot || message.guild) return;
    let msgContent = message.content
    if (client.guilds.get('546008502754082830').roles.get('552758121789915136').members.map(m => m.user.id).includes(message.author.id)) {
      if (msgContent == "supernova") {
        setTimeout(shutdown, 1000);
        function shutdown() {
          process.exit(1)
        }
        return
      }
    }
    let attachment
    let content
    if (!msgContent) {
      attachment = message.attachments.first().url
      content = "Picture:"
    } else {
      if (message.attachments.first()) {
        attachment = message.attachments.first().url
      } else {
        attachment = null
      }
      content = msgContent
    }

    const embed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setDescription(message.author.id)
      .addField(`DM-Message:`, content)
      .setImage(attachment)
      .setTimestamp()
      .setColor("#ff0000")

    // @ts-ignore
    client.channels.get(dmchannel).send(embed)
  })

  client.on('message', async message => {
    if (!message.guild || message.author.bot) return;
    message.guild.fetchMember(message.author);
    if (bclk) {
      if (blacklist.get("users").includes(message.author.id)) return
      if (blacklist.get("servers").includes(message.guild.id)) return
    }
    if (!mute.has(message.guild.id)) mute.set(message.guild.id, "disabled")
    if (!suggest.has(message.guild.id)) suggest.set(message.guild.id, "disabled")
    if (!welcome.has(message.guild.id)) welcome.set(message.guild.id, "disabled")
    if (!warnings.has(message.guild.id)) message.guild.members.forEach(m => { warnings.set(message.guild.id, 0, m.id) })
    if (!warnings.has(message.guild.id, message.author.id)) warnings.set(message.guild.id, 0, message.author.id)

    let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));

    if (!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = {
        prefixes: conf.prefix
      };
    }

    let prefix = prefixes[message.guild.id].prefixes;

    // let channels = JSON.parse(fs.readFileSync("./storage/channels.json", "utf8",));

    let suggestchannel;
    let welcomechannel;
    // let syschannel;

    suggestchannel = suggest.get(message.guild.id)
    welcomechannel = welcome.get(message.guild.id)

    //   if(channels[message.guild.id]) {
    //   suggestchannel = channels[message.guild.id].suggestchannel;
    //   welcomechannel = channels[message.guild.id].welcomechannel;
    //   } else {
    //     if(message.guild.systemChannel) {
    //   syschannel = message.guild.systemChannel.id
    //   suggestchannel = syschannel
    //   welcomechannel = syschannel
    //   //message.guild.owner.send(`Hello, it seems like you are the owner of ${message.guild.name}?\nYou still need to set up the basic Channels like the Welcomechannel or the Suggestchannel.\nThe problem is that otherwise Nova will crash becouse we dont have something to work around that.\nThank you for Using Nova!\nGreetings, Hammer1279 - Leader of HammerTechnik Development`)
    //     } else {
    //       syschannel = message.channel.id
    //       suggestchannel = syschannel
    //       welcomechannel = syschannel
    //     }

    //   channels[message.guild.id] = {
    //     suggestchannel: syschannel,
    //     welcomechannel: syschannel
    // };

    // fs.writeFile("./storage/channels.json", JSON.stringify(channels, null, '\t'), (err) => {
    //   if(err) console.log(err)
    // })

    // }
    //@ts-ignore
    let language = global.language

    if (!language.has(message.guild.id)) {
      language.set(message.guild.id, "eng")
    }
    /check verified/
    let verified
    if (!verification.has(message.guild.id)) verification.set(message.guild.id, false)
    verified = verification.get(message.guild.id);
    /Permlvl System/
    let permlvl

    let blacklisted
    if (blacklist.get("users").includes(message.author.id)) { blacklisted = true } else { blacklisted = false }

    if (!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("ADMINISTRATOR") || !client.guilds.get('546008502754082830').roles.get('548492717118849034').members.map(m => m.user.tag).includes(message.author.id) || !client.guilds.get('546008502754082830').roles.get('552758121789915136').members.map(m => m.user.tag).includes(message.author.id)) {
      permlvl = 1

    }

    if (message.member.hasPermission("MANAGE_MESSAGES")) {
      permlvl = 2
    }

    if (message.member.hasPermission("ADMINISTRATOR")) {
      permlvl = 3
    }

    if (beta) {
      if (client.guilds.get('546008502754082830').roles.get('548492717118849034').members.map(m => m.user.id).includes(message.author.id)) {
        permlvl = 4
      }
    }

    if (client.guilds.get('546008502754082830').roles.get('552758121789915136').members.map(m => m.user.id).includes(message.author.id)) {
      permlvl = 5
    }

    if (blacklisted) {
      permlvl = 0
    }

    //           /Premium System/
    let premium_file = JSON.parse(fs.readFileSync("./storage/premium.json", "utf8"));
    let premium
    if (premium_file.toString().includes(message.author.id)) { premium = true } else { premium = false }

    /client export/

    // @ts-ignore
    client.premium = premium
    // @ts-ignore
    client.permlvl = permlvl
    // @ts-ignore
    client.beta = beta
    // @ts-ignore
    client.language = language
    // @ts-ignore
    client.prefix = prefix
    // @ts-ignore
    client.prefixes = prefixes
    // @ts-ignore
    client.suggestchannel = suggestchannel
    // @ts-ignore
    client.welcomechannel = welcomechannel
    // @ts-ignore
    client.warnings = warnings
    // @ts-ignore
    client.leveling = leveling
    //@ts-ignore
    global.music = music
    // @ts-ignore
    client.rank = rank
    //@ts-ignore
    client.mute = mute
    //@ts-ignore
    client.welcome = welcome
    //@ts-ignore
    client.suggest = suggest
    //@ts-ignore
    client.set = set
    //@ts-ignore
    client.commands = commands
    //@ts-ignore
    client.aliases = aliases
    //@ts-ignore
    client.verification = verification
    //@ts-ignore
    client.verified = verified
    //@ts-ignore
    client.blacklist = blacklist
    //@ts-ignore
    client.blacklisted = blacklisted
    //@ts-ignore
    global.volume = volume
    //@ts-ignore
    global.temp = tempdb
    //@ts-ignore
    client.ignore = limited
    //@ts-ignore
    client.temp = tempdb
    //@ts-ignore
    global.temp = tempdb

    /*functions*/
    // @ts-ignore
    client.awaitReply = async (msg, question, limit, del) => {
      const filter = m => m.author.id === msg.author.id;
      const m = await msg.channel.send(question);
      try {
        const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
        if (del) { m.delete(); collected.first().delete() }
        return collected.first().content;
      } catch (e) {
        return false;
      }
    };
    // @ts-ignore
    client.clean = text => {
      if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
        return text;
    };

    if (!message.guild || message.author.bot) return;

    let msg = message.content.toUpperCase();
    let args = message.content.slice(prefix.length).trim().split(" ");
    let command = args.shift().toLowerCase();
    //  // @ts-ignore
    let cmd
    if (set.get(message.guild.id) == 1) {
      if (commands.has(command)) { cmd = commands.get(command).name } else { cmd = aliases.get(command) }
    } else {
      cmd = command
    }
    //  let cmd = commands.get(command).name || commands.get(aliases.get(command));
    //  if(!cmd) return;
    //  if(cmd.permlvl > permlvl)return

    // let cmd = args.shift().toLowerCase();
    //  if(!console_mode){
    //  args = message.content.slice(prefix.length).trim().split(" ");
    //  cmd = args.shift().toLowerCase();
    //  }
    let msgContent = message.content.toLowerCase().trim().split(" ");
    //  if(console_mode) {
    //  //cmd = message.content.toLowerCase().replace(args, "").trim().split(" ")
    //  cmd = msgContent.shift()
    //  // @ts-ignore
    //  args = msgContent.slice(cmd)
    //  }
    if (!limited.includes(message.guild.id)) {
      if (msgContent.includes(`prefix`)) message.channel.send(`My prefix on this server is **${prefix}**`)
    }
    /kill switches/
    //  if(msgContent.includes('novaemergencyshutdown')){
    //   setTimeout(shutdown, 1000);
    //   function shutdown(){
    //       process.exit(1)
    //   }
    //  }
    //  if(msgContent.includes('novaemergencydisconnect')){
    //   setTimeout(disconnect, 1000);
    //   function disconnect(){
    //       client.destroy()
    //   }
    //  }
    if (msgContent.includes('novaping')) {
      setTimeout(ping, 1000);
      function ping() {
        message.channel.send('Ping?').then((msg) => {
          // @ts-ignore
          msg.edit(`Pong! Latency: ${msg.createdTimestamp - message.createdTimestamp}ms. API latency: ${Math.round(client.ping)}ms.`)
        });
      }
    }
    if (msgContent.includes('novauserperm')) {
      setTimeout(perm, 1000);
      function perm() {
        message.reply(permlvl)
      }
    }
    //  if(msgContent.includes('novadebug')){
    //   setTimeout(debug, 1000);
    //   function debug(){
    //     message.channel.send(command)
    //   }
    //  }
    if (msgContent.includes('novalogging')) {
      if (permlvl) { if (permlvl != 5) return }
      setTimeout(loggings, 1000);
      function loggings() {
        let embed = new Discord.RichEmbed()
          .setColor("#ff0000")
          .addField("Logging Infos:", `
args: \`\`[${args}]\`\`
cmd: \`\`${cmd}\`\`
msg: \`\`"${msg}"\`\`
mprefix: \`\`${mprefix}\`\`
prefix: \`\`${uprefix}\`\`
Console Mode: \`\`${console_mode}\`\`
Triggered: \`\`${mprefix == uprefix}\`\`
Suggestion Channel: <#${suggestchannel}>
Welcome Channel: <#${welcomechannel}>
Permlevel: \`\`${permlvl}\`\`
Premium: \`\`${premium}\`\`
Blacklisted: \`\`${blacklisted}\`\`
          `)
        message.channel.send(embed)
      }
    }

    let mprefix = msg.slice(0, prefix.length)
    let uprefix = prefix.toUpperCase()

    //if (!msg.startsWith(prefix)) return;
    if (!logging) {
      if (!console_mode) {
        if (mprefix !== uprefix) return;
      }
    }

    if (logging) {
      if (message.guild.id == "488708757304639520") return
      // let channels = JSON.parse(fs.readFileSync("./storage/channels.json", "utf8",));
      // let welcomechannel = channels[message.guild.id].welcomechannel
      let embed = new Discord.RichEmbed()
        .setColor("#ff0000")
        .addField("Logging Infos:", `
args: "${args}"
cmd: "${cmd}"
msg: "${msg}"
mprefix: "${mprefix}"
prefix: "${uprefix}"
Console Mode: ${console_mode}
Triggered: ${mprefix == uprefix}
Suggestion Channel: <#${suggestchannel}>
Welcome Channel: <#${welcomechannel}>
Permlevel: \`\`${permlvl}\`\`
Premium: \`\`${premium}\`\`
Blacklisted: \`\`${blacklisted}\`\`
    `)
      message.channel.send(embed)
      // @ts-ignore
      let syschannel = message.guild.systemChannel
      //message.reply(syschannel)
      //syschannel.send("its here!")
    }
    if (message.author.bot) return;
    if (!set.has(message.guild.id)) set.set(message.guild.id, 1)
    let path = mode_list[set.get(message.guild.id)].path.commands
    let ai = mode_list[set.get(message.guild.id)].alternateindex.enabled
    // let path = "./commands"
    try {
      if (ai) { if (cmd == "runindex") { let index = require(mode_list[set.get(message.guild.id)].alternateindex.path); let ownerID = require(mode_list[set.get(message.guild.id)].owner.id); if (permlvl < 5) return message.reply("Only Admins can do this!"); index.run(client, message, args); }; return }
      let commandFile = require(`${path}/${cmd}.js`);
      commandFile.run(client, message, args)
    } catch (e) {
    }
  });
  client.on('error', console.error);

  //client.on("guildMemberAdd", member => {
  //    client.channels.get('547321666498199552').send(`Bienvenue sur Beurk, <@${message.author.id}> ! Nous sommes Mulch et Baquet, pour vous servir. Avant de faire quoi que ce soit, nous vous conseillons d'aller lire <#547163007789039852>, c'est plein d'informations utiles !`);
  //});

  // Create an event listener for new guild members
  client.on('guildMemberAdd', member => {
    if (limited.includes(member.guild.id)) return
    if (bclk) {
      if (blacklist.get("users").includes(member.user.id)) return
      if (blacklist.get("servers").includes(member.guild.id)) return
    }
    if (!member.guild) return;

    if (!welcome.has(member.guild.id)) return welcome.set(member.guild.id, "disabled")
    if (welcome.get(member.guild.id) == "disabled") return
    let welcomechannel = welcome.get(member.guild.id)
    if (set.get(member.guild.id) == 1) {
      // @ts-ignore
      const langfile = require("./storage/translation/language.json")
      let lan = JSON.parse(fs.readFileSync("./storage/languages.json", "utf8"));

      //@ts-ignore
      if (!global.language.has(member.guild.id)) {
        //@ts-ignore
        global.language.set(member.guild.id, "eng")
      }

      let lang;
      if (language.get(member.guild.id) == "eng") {
        lang = langfile.english.welcome
      }
      if (language.get(member.guild.id) == "ger") {
        lang = langfile.german.welcome
      }
      if (language.get(member.guild.id) == "fr") {
        lang = langfile.french.welcome
      }
      if (language.get(member.guild.id) == "cz") {
        lang = langfile.czech.welcome
      }
      if (language.get(member.guild.id) == "ru") {
        lang = langfile.russian.welcome
      }

      let channel;
      //let langchannel=lang.channel
      // @ts-ignore
      let message = lang.message

      let syschannel = member.guild.systemChannel
      // Send the message to a designated channel on a server:

      //let haschannel = member.guild.channels.find(ch => ch.name === langchannel)
      //let langchannel=member.guild.channels.find(ch => ch.name === lang.channel)

      if (logging) {
        console.log(welcomechannel)
      }

      if (!welcomechannel) {
        channel = syschannel
      } else {
        channel = client.channels.get(welcomechannel)
      }

      // Do nothing if the channel wasn't found on this server
      if (!channel) return;
      // Send the message, mentioning the member
      // @ts-ignore
      channel.send(`${lang.message[0]} <@${member.user.id}> ${lang.message[1]}`);
    }
    if (set.get(member.guild.id) != 1) {
      let path = mode_list[set.get(member.guild.id)].path.events
      try {
        let mevent = require(`${path}/memberadd.js`);
        mevent.run(client, member)
      } catch (e) { console.log(e) }
    }
  });


  client.on("guildMemberRemove", async member => {
    if (limited.includes(member.guild.id)) return
    if (bclk) {
      if (blacklist.get("users").includes(member.user.id)) return
      if (blacklist.get("servers").includes(member.guild.id)) return
    }
    if (!member.guild) return;

    if (!welcome.has(member.guild.id)) return welcome.set(member.guild.id, "disabled")
    if (welcome.get(member.guild.id) == "disabled") return
    let welcomechannel = welcome.get(member.guild.id)
    if (set.get(member.guild.id) == 1) {
      // @ts-ignore
      const langfile = require("./storage/translation/language.json")
      let lan = JSON.parse(fs.readFileSync("./storage/languages.json", "utf8"));

      //@ts-ignore
      if (!global.language.has(member.guild.id)) {
        //@ts-ignore
        global.language.set(member.guild.id, "eng")
      }

      let lang;
      if (language.get(member.guild.id) == "eng") {
        lang = langfile.english.bye
      }
      if (language.get(member.guild.id) == "ger") {
        lang = langfile.german.bye
      }
      if (language.get(member.guild.id) == "fr") {
        lang = langfile.french.bye
      }
      if (language.get(member.guild.id) == "cz") {
        lang = langfile.czech.bye
      }
      if (language.get(member.guild.id) == "ru") {
        lang = langfile.russian.bye
      }

      let channel;
      //let langchannel=lang.channel
      //let message=lang.message

      let syschannel = member.guild.systemChannel
      // Send the message to a designated channel on a server:

      //let haschannel = member.guild.channels.find(ch => ch.name === langchannel)
      //let langchannel=member.guild.channels.find(ch => ch.name === lang.channel)

      if (logging) {
        console.log(welcomechannel)
      }

      if (!welcomechannel) {
        channel = syschannel
      } else {
        channel = client.channels.get(welcomechannel)
      }

      if (!channel) return;

      // Do nothing if the channel wasn't found on this server
      if (!channel) return;
      // Send the message, mentioning the member
      // @ts-ignore
      channel.send(`${lang.message[0]} **${member.user.tag}** ${lang.message[1]}`);

      // await dl.Delete(member.author.id+member.guild.id)
    }
    if (set.get(member.guild.id) != 1) {
      let path = mode_list[set.get(member.guild.id)].path.events
      try {
        let event = require(`${path}/memberremove.js`);
        event.run(client, member)
      } catch (e) { console.log(e) }
    }
  });

  //add mute perm
  client.on('channelCreate', channel => {
    //@ts-ignore
    //channel.overwritePermissions(channel.guild.defaultRole, { VIEW_CHANNEL: false });
  })

  client.on("guildMemberAdd", member => {
    if (!member.guild || member.user.bot) return;
    // @ts-ignore
    if (member.guild.id == 533060455527350283) {
    } else { return; }
    //member.guild.roles.find(role => role.id === 'id of role')
    const tester = member.guild.roles.find(role => role.id === '533065836102025219')
    const notification = member.guild.roles.find(role => role.id === '538874080254885899')
    const nonsfw = member.guild.roles.find(role => role.id === '533807023574351932')

    member.addRole(tester)
    member.addRole(notification)
    member.addRole(nonsfw)
  });

  client.on("message", async message => {
    if (!message.guild || message.author.bot) return;
    if (set.get(message.guild.id) != 1) {
      let path = mode_list[set.get(message.guild.id)].path.message
      try {
        let msg = require(path);
        msg.run(client, message)
      } catch (e) { console.log(e); }
    }
  })

  // Leveling System
  client.on("message", async message => {
    if (!leveling) return
    if (!message.guild || message.author.bot) return;
    if (bclk) {
      if (blacklist.get("users").includes(message.author.id)) return
      if (blacklist.get("servers").includes(message.guild.id)) return
    }
    if (limited.includes(message.guild.id)) return
    if (talkedRecently.has(message.author.id)) return;
    else {
      //default structure
      const ds = {
        "xp": 0,
        "lvl": 0,
        "total": 0
      }
      //failsave
      if (!rank.has(message.guild.id)) { rank.set(message.guild.id, {}) }
      if (!rank.has(message.guild.id, `${message.author.id}`)) {
        rank.set(message.guild.id, ds, message.author.id)
      }
      //init
      let xp = (rank.get(message.guild.id, `${message.author.id}.xp`))
      let lvl = (rank.get(message.guild.id, `${message.author.id}.lvl`))
      let total = (rank.get(message.guild.id, `${message.author.id}.total`))
      //add XP
      let rxp = Math.floor(Math.random() * (25 - 15 + 1)) + 15;
      let fxp = Math.floor(xp + rxp)
      var nxp = exectMath.floor(5 * (lvl * lvl) + 50 * lvl + 100)
      if (
        //level up?
        nxp <= fxp
      ) {
        rank.set(message.guild.id, 0, `${message.author.id}.xp`)
        //add&set LVL
        const flvl = lvl + 1
        rank.set(message.guild.id, flvl, `${message.author.id}.lvl`)
      } else {
        //set XP
        rank.set(message.guild.id, fxp, `${message.author.id}.xp`)
        rank.set(message.guild.id, total + rxp, `${message.author.id}.total`)
      }
      //cooldown
      talkedRecently.add(message.author.id);
      setTimeout(() => {
        talkedRecently.delete(message.author.id);
      }, 120000)
    }
  })

  // old Leveling System
  // client.on("message", async message => {
  //   if (!message.guild || message.author.bot) return;
  //   if(ignore.includes(message.guild.id))return
  //   if (talkedRecently.has(message.author.id)) {
  //     //message.channel.send("Wait 1 minute before getting typing this again. - " + message.author);
  //     return;
  // } else {


  //   let ranrank = Math.floor(Math.random() * (25 - 15 + 1)) + 15;
  //   let member = (message.author.id+message.guild.id)
  //   var user = await dl.Fetch(member)
  //   dl.AddXp(member, ranrank)
  //   var xp = (user.xp)
  //   var lvl = (user.level)
  //   var nlvl = exectMath.floor(5 * (lvl * lvl) + 50 * lvl + 100)
  //   if(xp > nlvl) {
  //     await dl.AddLevel(member, 1)
  //     await dl.SetXp(member, 0)
  //   }

  // //Adds the user to the set so that they can't talk for a minute
  //   talkedRecently.add(message.author.id);
  // setTimeout(() => {
  //   // Removes the user from the set after a minute
  //   talkedRecently.delete(message.author.id);
  // }, 120000);
  // // 2min cooldown
  // }
  // });


  //old login with token in config
  // if(!beta) {
  // client.login(config.token.main)
  // } else {
  //   client.login(config.token.beta)
  // }

  var superagent = require("superagent")
  // @ts-ignore
  let { body } = await superagent
    .get(db)
    .set('secret-key', token)
    .catch(e => { console.log(`${e}`) })
  // @ts-ignore
  if (beta) client.login(body.discord.beta)
  // @ts-ignore
  else client.login(body.discord.main)

});
