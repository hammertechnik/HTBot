exports.run = async (client, message, args) => {
  if(message.member.roles.some(r=>["Développeur de bot", "Chevaucheur d'élite", "Chef", "Mod"].includes(r.name)) ) {
    // has one of the roles
  } else {
      message.reply("doesn't look like you can use that!")
      return;
    // has none of the roles
  }

    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("veuillez entrer un nombre entre 2 et 100 pour indiquer le nombre de messages à supprimer.");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Impossible de supprimer les messages car: \n${error}`));
  }