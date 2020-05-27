const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {

    let embed = new Discord.RichEmbed()
    .setColor(`#4682B4`)
    .addField(`Ролей на сервере`, `${message.guild.roles.size}\nИмя ролей: ${message.guild.roles.array()}`, true)
    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`);

    message.channel.send(embed);
}

module.exports.help = {
  name:"serverroles"
}
