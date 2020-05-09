const Discord = require('discord.js');
const bot = new Discord.Client();
bot.on('ready', () => {
    console.log('I am ready!');
});
bot.on('message', message => {
    if (message.content === 'ping') {
       message.reply('pong');
       }
});
bot.login(process.env.BOT_TOKEN);

bot.on('message', message => {
    if (message.content === "s/help") {
      var help = new Discord.RichEmbed()
      .setColor("#4682B4")
      .setAuthor("© Oliver Stealer", "https://cdn.discordapp.com/attachments/632202420956692501/708676052548845608/659407-1024x576.jpg")
      .addField("**Информация**", "**👑 Создатель: <@492256216374837249> 👑 \n🤖 Бот был создан 08.02.2020 🤖 \n🔧 Стадия: Стоит на хостинге и ждёт обновлений 🔧**")
      .addField('**Команды бота**', '`s/ping` **┃ узнать время отклика**\n`s/coinflip` **┃ небольшая игра в монетку**\n`s/avatar` **┃ выдать URL ссылку на ваш аватар**\n`s/vote` **┃ ставит реакции для опросов**\n`s/8ball` **┃ рандомный ответ "Да" или "Нет"**\n`s/bug` **┃ отправить ошибку [доработка]**\n`s/test1-4` **┃ тест для Stealer Squad**\n`s/say` **┃ отправить сообщение от имени бота**\n`s/serverinfo` **┃ показать информацию о сервере**\n`s/userinfo` **┃ показать информацию о юзере**')
      .addField('**Role Play команды**', '`s/kiss` **┃ поцеловать**\n`s/pat` **┃ погладить**\n`s/hug` **┃ обнять**\n`s/sex` **┃ без лишних слов**\n`s/fight` **┃ обматерить**\n`s/hit` **┃ ударить**')
      .addField('**Команды модерации**', '`s/warn` **┃ выдать предупреждение**\n`s/unwarn` **┃ снять предупреждение**\n`s/ban` **┃ выдать блокировку**\n`s/mute` **┃ выдать мут**')
       message.channel.send(help).then(msg => msg.delete(600000));
       return message.delete()
    }
  });
