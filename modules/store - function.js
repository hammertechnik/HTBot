const fs = require('fs')
const Discord = require('discord.js')

function store() {

    /**
    * Buy some Coffee
    * @param user User that bought it
    */
   this.buy = function(user) {
        
    }

    /**
    * Add Money
    * @param {Number} raw Money to add
    * @param {Number} [user=0] UserID to add Money
    */
    this.add = function(raw, user) {
        var an = parseInt(raw)
        
    }

    /**
    * Remove Money
    * @param {Number} raw Money to remove
    * @param {Number} [user=0] UserID to remove Money
    */
    this.remove = function(raw, user) {
        var rnr = parseInt(raw)
        
    }

    /**
    * Show Money
    * @param {Number} [user=0] UserID to add to
    * @returns {money} Money left
    */
    this.show = function(user) {
        let test = 3
        return test
    }

}

module.exports = store