/*
const Discord = require('discord.js'); 
 exports.run = (bot,message,args) => {
  let pages = []; 
  let page = 1; 
  const embed = new Discord.RichEmbed() 
    .setColor(`#4682B4`)
    .setAuthor("© Oliver Stealer", "https://cdn.discordapp.com/attachments/632202420956692501/708676052548845608/659407-1024x576.jpg")
    .addField("**Информация**", "**👑 Создатель: <@492256216374837249> 👑 \n🤖 Бот был создан 08.02.2020 🤖 \n🔧 Стадия: Стоит на хостинге и ждёт обновлений 🔧**")
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
        .addField('**Команды бота**', '`s/ping` **┃ узнать время отклика**\n`s/coinflip` **┃ небольшая игра в монетку**\n`s/avatar` **┃ выдать URL ссылку на ваш аватар**\n`s/vote` **┃ ставит реакции для опросов**\n`s/8ball` **┃ рандомный ответ "Да" или "Нет"**\n`s/bug` **┃ отправить ошибку [доработка]**\n`s/test1-4` **┃ тест для Stealer Squad**\n`s/say` **┃ отправить сообщение от имени бота**\n`s/serverinfo` **┃ показать информацию о сервере**\n`s/userinfo` **┃ показать информацию о юзере**')
        msg.edit(embed) 
      });
      forwards.on('collect', r => { 
        if (page === pages.length) return; 
        page++; 
        embed.setDescription(pages[page-1])
        .addField('**Role Play команды**', '`s/kiss` **┃ поцеловать**\n`s/pat` **┃ погладить**\n`s/hug` **┃ обнять**\n`s/sex` **┃ без лишних слов**\n`s/fight` **┃ обматерить**\n`s/hit` **┃ ударить**')
        msg.edit(embed) 
      });
      forwards.on('collect', r => { 
        if (page === pages.length) return; 
        page--; 
        embed.setDescription(pages[page-1])
        .addField('**Команды модерации**', '`s/warn` **┃ выдать предупреждение**\n`s/unwarn` **┃ снять предупреждение**\n`s/ban` **┃ выдать блокировку**\n`s/mute` **┃ выдать мут**')
        msg.edit(embed) 
      });
    })
  })
}

module.exports.help = {
    name: "pages",
    aliases: []
};
*/

const Discord = require('discord.js'); 
 
exports.run = (bot,message,args) => {
  let pages = []; 
  let page = 1; 
  const embed = new Discord.RichEmbed() 
    .setColor("#4682B4")
    .setAuthor("© Oliver Stealer", "https://cdn.discordapp.com/attachments/632202420956692501/708676052548845608/659407-1024x576.jpg")
    .addField("**Информация**", "**👑 Создатель: <@492256216374837249> 👑 \n🤖 Бот был создан 08.02.2020 🤖 \n🔧 Стадия: Стоит на хостинге и ждёт обновлений 🔧**")
    .setFooter(`Страница ${page}`) 
  //  .setDescription(`тест 1 pages[page-1]`)
  message.channel.send(embed).then(msg => { 
    msg.react('1️⃣').then( r => { 
      msg.react('2️⃣').then( r => { 
        msg.react('3️⃣').then( r => { 
          msg.react('4️⃣')
      const f1 = (reaction, user) => reaction.emoji.name === '1️⃣' && user.id === message.author.id;
      const f2 = (reaction, user) => reaction.emoji.name === '2️⃣' && user.id === message.author.id;
      const f3 = (reaction, user) => reaction.emoji.name === '3️⃣' && user.id === message.author.id;
      const f4 = (reaction, user) => reaction.emoji.name === '4️⃣' && user.id === message.author.id;
   //   const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 }); 
      const f1 = msg.createReactionCollector(f1, { time: 60000 });
      const f2 = msg.createReactionCollector(f2, { time: 60000 });
      const f3 = msg.createReactionCollector(f3, { time: 60000 });
      const f4 = msg.createReactionCollector(f4, { time: 60000 });
      f1.on('collect', r => { 
        if (page === 1) return; 
        page--; 
    //    embed.setDescription(`тест 2 pages[page-1]`); 
       embed.addField('**Команды бота**', '`s/ping` **┃ узнать время отклика**\n`s/coinflip` **┃ небольшая игра в монетку**\n`s/avatar` **┃ выдать URL ссылку на ваш аватар**\n`s/vote` **┃ ставит реакции для опросов**\n`s/8ball` **┃ рандомный ответ "Да" или "Нет"**\n`s/bug` **┃ отправить ошибку**\n`s/test1-4` **┃ тест для Stealer Squad**\n`s/serverinfo` **┃ показать информацию о сервере**\n`s/userinfo` **┃ показать информацию о юзере**\n`s/translate [ru или en]` **┃ перевод текста**\n`s/weather` **┃ просмотр погоды [доработка]**\n`s/stats` **┃ показатели бота**\n`s/pages` **┃ страницы [доработка]**\n`s/currate` **┃ обменный курс [доработка]**')
        embed.setFooter(`Страница ${page}`);
        msg.edit(embed) 
      })
      f2.on('collect', r => { 
        if (page === pages.length) return; 
        page++; 
    //    embed.setDescription(`тест 3 pages[page-1]`); 
    embed.addField('**Role Play команды**', '`s/kiss` **┃ поцеловать**\n`s/pat` **┃ погладить**\n`s/hug` **┃ обнять**\n`s/sex` **┃ без лишних слов**\n`s/fight` **┃ обматерить**\n`s/hit` **┃ ударить**')
        embed.setFooter(`Страница ${page}`);
        msg.edit(embed) 
      }) 
      f3.on('collect', r => { 
        if (page === 1) return; 
        page--; 
    //    embed.setDescription(`тест 2 pages[page-1]`); 
       embed.addField('**Команды модерации [доработка]**', '`s/warn` **┃ выдать предупреждение**\n`s/unwarn` **┃ снять предупреждение**\n`s/ban` **┃ выдать блокировку**\n`s/mute` **┃ выдать мут**\n`s/pin [id sms]` **┃ закрепить сообщение**\n`s/say` **┃ отправить сообщение от имени бота**\n`s/reload` **┃ перезагрузить команду**\n`s/change` **┃ отредактировать сообщение бота**\n`s/clear` **┃ удалить сообщения**\n`s/kick` **┃ кикнуть юзера**')
        embed.setFooter(`Страница ${page}`);
        msg.edit(embed)
      })
    })
  })
})
  })
}

module.exports.help = {
    name: "pages",
    aliases: []
};
