const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {

    let roles = new Discord.RichEmbed()
    .setColor(`#4682B4`)
    .setDescription(`Ролей на сервере: ${message.guild.roles.size}`)
    .addField(`**Имя ролей:**`, `${message.guild.roles.array()}`, true)
    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)

    message.channel.send(roles);
};

module.exports.help = {
  name:"serverroles"
};
