const Discord = require('discord.js')

exports.run = (client, message, args) => {
    require('../index.js').run(client, message)
}