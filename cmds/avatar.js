const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {

    if(message.content.toLowerCase().startsWith("s/avatar"))
    message.delete('s/avatar')
    {
    let mb = message.mentions.members.first() || message.member; // Если есть упомянание человека в сообщении, то берём его, если нету, то себя. Расскажу чуть позже.
    let color = mb.displayHexColor; //Цвет самой высокой роли человека, если цвет невидимый то самой высокой отображаемой роли.
    if (color == '#000000') color = mb.hoistRole.hexColor;//Цвет самой высокой роли человека.
    let embed = new Discord.RichEmbed() //Создаём эмбед
    .setImage(mb.user.avatarURL) //Устанавливаем картинку - аватар человека.
    .setColor(color) //Цвет.
    .setFooter("**Аватар пользователя**" + mb.user.tag); //Устанавливаем в подпись чей это аватар.
    message.reply({embed}).then(msg => msg.delete(600000)); //Отправляем.
  }
};

  module.exports.help = {
    name: "avatar"
};
