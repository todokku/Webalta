const Discord = require('discord.js'); 
 
exports.run = (bot,message,args) => {
  let pages = []; 
  let page = 1; 
  const embed = new Discord.RichEmbed() 
    .setColor(`#4682B4`)
    .setFooter(`Страница ${page} из ${pages.length}`) 
    .setDescription(pages[page-1])
  message.channel.send(embed).then(msg => { 
    msg.react('⏪').then( r => { 
      msg.react('⏩') 
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;
      const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 }); 
      const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });
      backwards.on('collect', r => { 
        if (page === 1) return; 
        page--; 
        embed.setDescription(pages[page-1])
        .setAuthor("© Oliver Stealer", "https://cdn.discordapp.com/attachments/632202420956692501/708676052548845608/659407-1024x576.jpg")
        .addField("**Информация**", "**👑 Создатель: <@492256216374837249> 👑 \n🤖 Бот был создан 08.02.2020 🤖 \n🔧 Стадия: Стоит на хостинге и ждёт обновлений 🔧**");
        embed.setFooter(`Страница ${page} из ${pages.length}`); 
        msg.edit(embed) 
      })
      forwards.on('collect', r => { 
        if (page === pages.length) return; 
        page++; 
        embed.setDescription(pages[page-1])
        .addField('**Команды бота**', '`s/ping` **┃ узнать время отклика**\n`s/coinflip` **┃ небольшая игра в монетку**\n`s/avatar` **┃ выдать URL ссылку на ваш аватар**\n`s/vote` **┃ ставит реакции для опросов**\n`s/8ball` **┃ рандомный ответ "Да" или "Нет"**\n`s/bug` **┃ отправить ошибку [доработка]**\n`s/test1-4` **┃ тест для Stealer Squad**\n`s/say` **┃ отправить сообщение от имени бота**\n`s/serverinfo` **┃ показать информацию о сервере**\n`s/userinfo` **┃ показать информацию о юзере**'); 
        embed.setFooter(`Страница ${page} из ${pages.length}`); 
        msg.edit(embed) 
      }) 
      forwards.on('collect', r => { 
        if (page === pages.length) return; 
        page++; 
        embed.setDescription(pages[page-1])
        .addField('**Role Play команды**', '`s/kiss` **┃ поцеловать**\n`s/pat` **┃ погладить**\n`s/hug` **┃ обнять**\n`s/sex` **┃ без лишних слов**\n`s/fight` **┃ обматерить**\n`s/hit` **┃ ударить**')
        embed.setFooter(`Страница ${page} из ${pages.length}`); 
        msg.edit(embed) 
      })
      forwards.on('collect', r => { 
        if (page === pages.length) return; 
        page++; 
        embed.setDescription(pages[page-1])
        .addField('**Команды модерации**', '`s/warn` **┃ выдать предупреждение**\n`s/unwarn` **┃ снять предупреждение**\n`s/ban` **┃ выдать блокировку**\n`s/mute` **┃ выдать мут**')
        embed.setFooter(`Страница ${page} из ${pages.length}`); 
        msg.edit(embed) 
      })
    })
  })
}

module.exports.help = {
    name: "pages",
    aliases: []
};
