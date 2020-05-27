/*
const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    try{
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('`[Ошибка] Ты ещё мал для такой команды!`');
    if(args[0]>100) return bot.send('`[Ошибка] Укажи значение меньше 100`');
    if(args[0]<1) return bot.send('`[Ошибка] Укажите значение больше 1`');
    message.channel.bulkDelete(args[0]).then(() =>{
        message.channel.send(`**Удалено ${args[0]} сообщений!**`).then(msg => msg.delete(15*1000));
    });
    bot.send(botmessage);
}catch(err){
    console.log(err.name)
}
   if (message.content.startsWith("s/clear")){
   message.reply('`[Ошибка] Ты не указал количество сообщений, которое нужно удалить!`')
   }
};
module.exports.help = {
    name: "clear"
};
*/

const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = function(bot, message, args) {
    //if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("❌**Error:** You don't have the **Manage Messages** permission!");
    if(!args[0]) return message.reply('`Используй: purge all|bots|user|author|images <кол-во>` <:err:715285004657229896>')
    if(args[0] === 'all') {
      if(!args[1]) return message.channel.send('`Нужно указать количество` <:err:715285004657229896>');
      if(isNaN(args[1])) return message.channel.send('`Укажи действительное количество` <:err:715285004657229896>');
      if(parseInt(args[1]) > 100) return message.channel.send('`Я могу удалить максимум 100 сообщений за раз` <:err:715285004657229896>')
  
      let messagecount = parseInt(args[1]);
      message.channel.messages.fetch({
        limit: 100
      }).then(messages => message.channel.bulkDelete(messagecount))
      .catch(e => {
        if(e) return message.channel.send("Error: ", e)
      })
    }
    else if(args[0] === 'bots') {
      if(!args[1]) return message.channel.send('`Нужно указать количество` <:err:715285004657229896>');
      if(isNaN(args[1])) return message.channel.send('`Укажи действительное количество` <:err:715285004657229896>');
      if(parseInt(args[1]) > 100) return message.channel.send('`Я могу удалить максимум 100 сообщений за раз` <:err:715285004657229896>')
  
      message.channel.messages.fetch({
        limit: args[1]
      }).then(messages => {
        const userMessages = messages.filter(message => message.author.bot) 
        message.channel.bulkDelete(userMessages)
      }).catch(e => {
        if(e) return message.channel.send("Error: ", e)
      })
    }
    else if(args[0] === 'user') {
      if(!args[1]) return message.channel.send('`Нужно указать количество` <:err:715285004657229896>');
      if(isNaN(args[1])) return message.channel.send('`Укажи действительное количество` <:err:715285004657229896>');
      if(parseInt(args[1]) > 100) return message.channel.send('`Я могу удалить максимум 100 сообщений за раз` <:err:715285004657229896>')
  
      message.channel.messages.fetch({
        limit: args[1]
      }).then(messages => {
        const userMessages = messages.filter(message => !message.author.bot) 
        message.channel.bulkDelete(userMessages)
      }).catch(e => {
        if(e) return message.channel.send("Error: ", e)
      })
    }
    else if(args[0] === 'author'){
      if(!message.mention || message.mentions.users.size < 1) return message.channel.send("Ping someone to delete their message!")
      if(!args[2]) return message.channel.send('`Нужно указать количество` <:err:715285004657229896>');
      if(isNaN(args[2])) return message.channel.send('`Укажи действительное количество` <:err:715285004657229896>');
      if(parseInt(args[2]) > 100) return message.channel.send('`Я могу удалить максимум 100 сообщений за раз` <:err:715285004657229896>')
  
      message.channel.messages.fetch({
        limit: parseInt(args[2])
      }).then(messages => {
        const userMessages = messages.filter(message => message.mentions.users.first() || message.author) 
        message.channel.bulkDelete(userMessages)
      }).catch(e => {
        if(e) return message.channel.send("<:err:715285004657229896> ", e)
      })
    }
    else if(args[0] === 'image') {
      message.reply("Новые возможности")
    }
    else {
      message.reply('Используй: purge all|bots|user|author <кол-во>')
    }
  };
  
  module.exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 1
  };
  
  module.exports.help = {
    name: 'clear',
    description: 'Purges X amount of messages from a given channel.',
    usage: 'purge all|bots|user|author <amount>'
  };
  
