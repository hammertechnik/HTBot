// @ts-check
const chalk = require('chalk');
console.log("Welcome to HT-IndexScript by HammerTechnik\n\nThis is the NovaJS Booter, please answer all given questions to continue,\nif you have questions to given questions,\nopen a ticket here: https://discord.gg/BSuJSJa")
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Run Mode?\n[default|sharding]', (answer) => {
    //rl.close();
    //process.emitWarning("index.js:10:13", "OUT_OF_BOUNDS")
    switch (answer.trim()) {
        case "default": {
            rl.question('Login Token?\n[default|custom]', (answers) => {
                //rl.close(); enable for disable-ing smth custom token server
                switch (answers.trim()) {
                    case "default": {
                        let NovaJS = require('./Nova.js')
                        let token = "Token"
                        let db = "Host"
                        rl.question('Enable Beta Mode?\n[true|false]', (answers) => {
                            rl.close();
                            switch (answers.trim()) {
                                case "false": {
                                    NovaJS.index(token, db, false)
                                    break
                                }
                                case "true": {
                                    NovaJS.index(token, db, true)
                                    break
                                }
                                default: {
                                    console.log(`That's not a valid answer! | ${answers.trim()}`)
                                    setTimeout(() => { process.exit() }, 3000)
                                }
                            }
                        })
                        break
                    }
                    case "custom": {
                        //return console.log("not supported yet!")
                        console.log("be sure the looginserver is filled in")
                        let fs = require('fs')
                        var config = JSON.parse(fs.readFileSync('./loginserver', 'utf8'))
                        let NovaJS = require('./Nova.js')
                        if (config.type != "private") console.log("public db's are not supported yet")
                        rl.question('Enable Beta Mode?\n[true|false]', (answers) => {
                            rl.close();
                            switch (answers.trim()) {
                                case "false": {
                                    NovaJS.index(config.token, config.url, false)
                                    break
                                }
                                case "true": {
                                    NovaJS.index(config.token, config.url, true)
                                    break
                                }
                                default: {
                                    console.log(`That's not a valid answer! | ${answers.trim()}`)
                                    setTimeout(() => { process.exit() }, 3000)
                                }
                            }
                        })
                        break
                    }
                    default: {
                        console.log(`That's not a valid answer! | ${answers.trim()}`)
                        setTimeout(() => { process.exit() }, 3000)
                    }
                }
            })
            break
        }
        case "sharding": {
            return console.log("not supported yet!")
            rl.close()
            const { ShardingManager } = require('discord.js');
            // @ts-ignore
            const config = require('./storage/config.json');
            const manager = new ShardingManager('./runNova.js', { token: config.token.main });

            manager.spawn();
            manager.on('launch', shard => console.log(`Launched shard ${shard.id}`));
            break
        }
        default: {
            console.log(`That's not a valid answer! | ${answer.trim()}`)
            setTimeout(() => { process.exit() }, 3000)
        }
    }
})

