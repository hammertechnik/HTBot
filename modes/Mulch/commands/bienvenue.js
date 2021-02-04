module.exports.run = async (client, message, args) => {
    const devs = ["437999876828037158", "317279640354029569", "299948231259979778"];
    if(!~devs.indexOf(message.author.id)) {
      return (message.delete())
    }

    if(!args[0] ) return message.channel.send(`Bienvenue sur Beurk! Nous sommes Mulch et Baquet, pour vous servir. Avant de faire quoi que ce soit, nous vous conseillons d'aller lire ${"<#547163007789039852>"}, c'est plein d'informations utiles !`); message.delete();
    message.channel.send(`Bienvenue sur Beurk, ${args} ! Nous sommes Mulch et Baquet, pour vous servir. Avant de faire quoi que ce soit, nous vous conseillons d'aller lire ${"<#547163007789039852>"}, c'est plein d'informations utiles !`); message.delete();
    }