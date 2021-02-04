const Discord = require("discord.js");
const mysql = require("mysql");

module.exports.run = async (client, message, args, prefix, language, beta, con) => {

con.query(`SELECT TOP 5|percent coins FROM dvbot;`, (err, rows) => {

})

}

module.exports.help = {
  name: "coin leaderboard"
}
