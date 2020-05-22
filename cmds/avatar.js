const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {

    if(message.content.toLowerCase().startsWith("s/avatar"))
    message.delete('s/avatar')
    {
    let mb = message.mentions.members.first() || message.member;
    let color = mb.displayHexColor;
    if (color == '#000000') color = mb.hoistRole.hexColor;
    let embed = new Discord.RichEmbed()
    .setImage(mb.user.avatarURL)
    .setColor(color)
    .setFooter("**Аватар пользователя**" + mb.user.tag);
    message.reply({embed}).then(msg => msg.delete(600000));
  }
};

  module.exports.help = {
    name: "avatar"
};
