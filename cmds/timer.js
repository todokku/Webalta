const Discord = module.require('discord.js');
const ms = require('ms');

module.exports.run = async (bot, message, args) => {

  let Timer = args[0];
  if(isNaN(Timer)) return message.reply('`Напиши текст` <:err:715285004657229896>')
  if (ms(Timer) > 2147483647) return message.reply('`Я не могу на такое долгое время поставить таймер` <:err:715285004657229896>')
  if(ms(Timer) < 1) return message.reply("What's the point of that?")

  if(!args[0]){
    return message.channel.send(" " + "| Введи период времени в \"S ; M ; H\"");
  }

  if(args[0] <= 0){
    return message.channel.send(" " + "| Введи период времени в \"S ; M ; H\"");
  }

  message.channel.send("⏳ " + "| Таймер запущен: " + `${ms(ms(Timer), {long: true})}`)

  setTimeout(function(){
    message.channel.send(message.author.toString() + `Таймер сработал! Он продолжался: ${ms(ms(Timer), {long: true})}`)
  }, ms(Timer));
}

module.exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
module.exports.help = {
    name: 'timer',
    description: 'Create a timer.',
    usage: 'timer'
  };
