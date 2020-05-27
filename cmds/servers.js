const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {

    if (message.content == 's/servers') {
    message.delete('s/servers')
    bot.guilds.forEach((guild) => {
        const embed = new Discord.RichEmbed()
        .setDescription(`**- ${guild.name} ┃ ${guild.name}**`)
      //  message.channel.send(`**- ${guild.name}**`);
      message.channel.send(embed);
    });
}
}

  module.exports.help = {
    name: "servers"
  };
