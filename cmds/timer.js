const Discord = module.require('discord.js');
const ms = require('ms');
module.exports.run = async (bot, message, args) => {

  let Timer = args[0];

  if (message.content.startsWith(`s/timer`)) {
const args = message.content.slice(`s/timer`).split(/ +/)
  if(!args[0]){
    return message.channel.send(
      new Discord.RichEmbed()
      .setColor('FF0000')
      .setTitle('⚠️ | Укажите время на которое вы хотите поставить таймер!')
      .addField('**Пример:**', '**s/timer 10m**')
    );
  }

  
  if(args[0] <= 0){
    return message.channel.send(
      new Discord.RichEmbed()
      .setColor('FF0000')
      .setTitle('⚠️ | Укажите верное время!')
      .addField('**Пример:**', '**p!timer 10m**')
    );
  }

  message.channel.send(
    new Discord.RichEmbed()
    .setColor('00FF00')
    .setTitle('Таймер')
    .setDescription(`Таймер запущен на ${ms(ms(Timer), {long: true})}`)
    .setFooter('Запустил: ' + message.author.username, message.author.avatarURL)
  )


  setTimeout(function(){
    message.channel.send(
      new Discord.RichEmbed()
      .setColor('00FF00')
      .setTitle('Таймер')
      .setDescription(message.author + ', ваш таймер на нуле!')
      .setFooter('Таймер был запущен ' + ms(ms(Timer), {long: true}) + ' назад')
    )
    message.author.send(
      new Discord.RichEmbed()
      .setColor('00FF00')
      .setTitle('Таймер')
      .setDescription(message.author + ', ваш таймер на нуле!')
      .setFooter('Таймер был запущен ' + ms(ms(Timer), {long: true}) + ' назад')
    )

  }, ms(Timer));

};
};
module.exports.help = {
    name: "timer"
};
