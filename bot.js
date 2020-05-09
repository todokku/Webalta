const Discord = require('discord.js');
const bot = new Discord.Client();
bot.on('ready', () => {
    console.log('I am ready!');
});
bot.on('message', message => {
    if (message.content === 's/ping') {
        var pingembed = new Discord.RichEmbed()
        .setColor("#4682B4")
        .setTitle(`Ping ${bot.ping}ms pong :ping_pong:`)
         message.channel.send(pingembed).then(msg => msg.delete(600000));
      }
});
bot.login(process.env.BOT_TOKEN);


let config = require('./botconfig.json');  // Говорим, что конфиг находится в файле botconfig.json
let token = config.token; // достаём токен и префикс
let prefix = config.prefix; // достаём токен и префикс

bot.on('ready', () => {  // Включаем бота
    console.log(`Запустился бот ${bot.user.username}`); // Отправка в концоль доклад о том, что бот успешно запущен
    bot.generateInvite(["ADMINISTRATOR"]).then(link => { // Администратор генерирует ссылку
        console.log(link);
        bot.user.setPresence({ game: { name: 'производство Стиллеров 👨‍👩‍👧‍👦' }, status: 'online' }) // Установить игру
    });
});


// Команда ping через embed
bot.on('message', message => {
      if (message.content === prefix + "ping") {
      var pingembed = new Discord.RichEmbed()
      .setColor("RED")
      .setTitle("Pong :ping_pong:")
      .addField("Пинг", `${bot.ping}ms`)
       message.channel.send(pingembed)
    }
});


// Команда help через embed
bot.on('message', message => {
    if (message.content === prefix + "help") {
      var help = new Discord.RichEmbed()
      .setColor("#4682B4")
      .setAuthor("◦ R2-D2 Droid ◦", "https://cdn.discordapp.com/attachments/540540568011538478/681240188152053761/unnamed.jpg")
      .addField("Информация", "**👑 Создатель: <@492256216374837249> 👑 \n🤖 Бот был создан 08.02.2020 🤖 \n🔧 Стадия: На разработке 🔧**")
      .addField(`Команды бота`, `**s/ping - узнать время отклика**\n**s/coinflip - небольшая игра в монетку**\n**s/avatar - выдать URL ссылку на Ваш аватар**\n**!опрос - ставит реакции для опросов**\n**s/8ball - рандомный ответ "Да" или "Нет"**\n**s/bug - отправить ошибку [доработка]**\n**s/test1-4 - тест для Stealer Squad\ns/kiss - поцеловать\ns/pat - погладить\ns/hug - обнять\ns/sex - без лишних слов\ns/fight - обматерить\ns/hit - ударить**`)
      .setFooter("Developer | Oliver Stealer", "https://cdn.discordapp.com/avatars/492256216374837249/415154aa3b5c4096d7da69291d79b7e5.png?size=2048")
       message.channel.send(help);
    }
  });


// Команда coinflip и рандомное сообщение из допустимых
  bot.on('message', message => {
    if (message.content === prefix + "coinflip") {
    let answers = ["Орёл", "Решка", "Ребро"]; // Варианты ответов, которые будут выведены
    let rand = Math.floor(Math.random()*answers.length); // Получаем рандомный ответ из предоставленных
    message.channel.send(answers[rand]); // Отправляем сообщение в чат
    }
  });


// Команда bug для отправления бага
bot.on('message', message => {
  if (!message.guild) return;
if (message.content.toLowerCase().startsWith(`s/bug`)) {
  const args = message.content.slice('/bug').split(/ +/);
  if (!args[1]) {
      message.reply(`\`привет! Для отправки отчета об ошибках используй: s/bug [текст]\``).then(message => message.delete(15000));
      return message.delete()
  }
  let bugreport = args.slice(1).join(" ");
  if (bugreport.length < 5 || bugreport.length > 1300) {
      message.reply(`\`нельзя отправить запрос с длинной меньше 5 или больше 1300 символов!\``).then(message => message.delete(15000));
      return message.delete()
  }
  let author_bot = message.guild.channels.find(c => c.name == "reports");
  if (!author_bot) {
      message.reply(`\`я не смог отправить сообщение.. Канал модераторов не был найден.\``).then(message => message.delete(15000));
      return message.delete()
  }
  author_bot.send(`**Пользователь <@${message.author.id}> \`(${message.author.id})\` отправил запрос с канала \`${message.channel.name}\` \`(${message.guild.id})\`.**\n` +
      `**Суть обращения:** ${bugreport}`);
  message.reply(`\`хэй! Я отправил твое сообщение на рассмотрение моему боссу!\``).then(message => message.delete(15000));
  return message.delete();
}
});

bot.on("message", (message) => { 
  if(message.content == "s/test1")
  { 
  message.reply('**❓ привет! Первый вопрос: что написано в правилах "Общие правила" под пунктом 8? ❓**');
  } 
  }); 
  bot.on("message", (message) => { 
  if(message.content == "t1 8. Токсики, можете выходить из сервера сразу")
  { 
  message.reply("**✅ молодец, правильно! Переходи к следующему вопросу при помощи команды** `s/test2` ✅");
  } 
  }); 

  bot.on("message", (message) => { 
    if(message.content == "s/test2")
    { 
    message.reply('**❓ разрешено ли флудить сообщениями? ❓**');
    } 
    }); 
    bot.on("message", (message) => { 
    if(message.content == "t2 нет")
    { 
    message.reply("**✅ правильно! Переходи к следующему вопросу при помощи команды** `s/test3` ✅");
    } 
    }); 
    bot.on("message", (message) => { 
      if(message.content == "t2 да")
      { 
      message.reply("**фу, флудер** 😢");
      } 
      }); 
      
  bot.on("message", (message) => { 
  if(message.content == "s/test3")
  { 
  message.reply('**❓ разрешено ли пиарить другие Discord сервера? ❓**');
  } 
  }); 
  bot.on("message", (message) => { 
  if(message.content == "t3 нет")
  { 
  message.reply("✅ **правильно! А теперь пропиши последнюю команду** `s/test4` ✅");
  } 
  }); 
  bot.on("message", (message) => { 
    if(message.content == "t3 запрещено")
    { 
    message.reply("✅ **правильно! А теперь пропиши последнюю команду** `s/test4` ✅");
    } 
  });
  bot.on("message", (message) => { 
  if(message.content == "t3 да")
  { 
  message.reply("**эй...запрещён пиар** ⛔");
  } 
});

 /* bot.on("message", (message) => { 
  if(message.content == "s/test4")
  { 
  message.reply('**📨 молодец, все вопросы пройдены! Ожидай пока <@&566347941527420938> выдаст тебе доступ в остальным каналам 📨**');
  } 
  }); */

  bot.on('raw', async event => {
    if (event.t == "MESSAGE_REACTION_ADD") {
        let event_guildid = event.d.guild_id // ID discord сервера
        let event_channelid = event.d.channel_id // ID канала
        let event_userid = event.d.user_id // ID того кто поставил смайлик
        let event_messageid = event.d.message_id // ID сообщение куда поставлен смайлик
        let event_emoji_name = event.d.emoji.name // Название смайлика
  
        if (event_userid == bot.user.id) return // Если поставил смайлик бот то выход
  
        let server = bot.guilds.find(g => g.id == event_guildid); // Получить сервер из его ID
        let channel = server.channels.find(c => c.id == event_channelid); // Получить канал на сервере по списку каналов
        let message = await channel.fetchMessage(event_messageid); // Получить сообщение из канала
        let member = server.members.find(m => m.id == event_userid); // Получить пользователя с сервера
        if (server.id != '628628154075840530' && server.id != '628628154075840534') return
        if (channel.name != 'основной') return
        let capt_moders = ['Стиллер'];
        if (event_emoji_name == '✔') {
            if (!member.roles.some(r => capt_moders.includes(r.name)) && !member.hasPermission("ADMINISTRATOR")) return
            message.clearReactions();
            let chan = server.channels.find(c => c.name == 'основной');
            if (!chan) return message.reply(`**\`произошла ошибка. Канал 'основной' не был найден.\`**`);
            let embed = new Discord.RichEmbed();
            embed.setAuthor(server.name, server.iconURL);
            embed.setColor(member.colorRole.hexColor);
            embed.setThumbnail(message.member.user.avatarURL);
            embed.setDescription(`**${message.member} - \`${message.content}\`\n${member} - \`одобрено\`**`);
            embed.setFooter(`Одобрил: ${member.displayName || member.user.username + member.user.tag}`, member.user.avatarURL);
            embed.setTimestamp(new Date());
            chan.send(embed);
            if (message.content.toLowerCase().includes('s/test4') || message.content.toLowerCase().includes('test4') || message.content.toLowerCase().includes('test')) message.reply(`**\`тест был одобрен Дискорд Мастером:\`** ${member}`);
            let role = member.guild.roles.find(r => r.name == 'Выдаваемая роль')
            await member.addRole(role.id)
         //   if (message.content.toLowerCase().includes('s/test4')) message.reply(`**\`тест был одобрен:\`** ${member}`);
        } else if (event_emoji_name == '✖') {
            if (!member.roles.some(r => capt_moders.includes(r.name)) && !member.hasPermission("ADMINISTRATOR")) return
            if (message.content.toLowerCase().includes('s/test4') || message.content.toLowerCase().includes('test4') || message.content.toLowerCase().includes('test')) message.reply(`**\`тест был отклонен Дискорд Мастером:\`** ${member}`);
            let role = member.guild.roles.find(r => r.name == 'Снимаемая роль')
            await member.removeRole(role.id)
           // if (message.content.toLowerCase().includes('s/test4')) message.reply(`**\`тест был отклонен:\`** ${member}`);
            message.clearReactions();
        }
    }
  });

  bot.on('message', async (message) => {
    if (message.guild.id != '628628154075840530' && message.guild.id != '628628154075840534') return
    if (message.author.bot) return
    if (message.channel.type == "dm") return
    if ((message.content.toLowerCase().includes('s/test4') || message.content.toLowerCase().includes('test4') || message.content.toLowerCase().includes('test')) && message.channel.name == 'основной') {
        await message.react(`✔`);
        await message.react(`✖`);
    } else if (message.content.toLowerCase().includes('s/test4') && message.channel.name == 'основной') {
        await message.react(`✔`);
        await message.react(`✖`);
    }
  });

      bot.on('message', async (message) => {
        if (message.author.bot) return
        if (message.channel.type == "dm") return
        if ((message.content.toLowerCase().includes('Глеквуд') || message.content.toLowerCase().includes('глеквуд') || message.content.toLowerCase().includes('Глэквуд')) && message.channel.name == '🍻┃костёр') {
          await message.react(`💩`);
        }
      }); 

      bot.on('message', message => {
        if (!message.guild) return;
      if (message.content.startsWith(`/mforum`)) {
        if (!message.member.roles.some(r => r.name == "Discord Master", "Модератор Discord") && !member.hasPermission("ADMINISTRATOR")) return message.delete();
        if (message.channel.name !== "🌐welcome") return message.delete();
            const embed = new Discord.RichEmbed()
                .setColor(`#bd00ff`)
                .setTitle('Уважаемые пользователи!')
                .setDescription(`Если у вас есть жалоба на Игрока или же Модератора, то вы можете её оставить на нашем **[форуме](https://goo-gl.su/xmt04VAO)**!`)
                .setFooter('С уважением Команда Модераторов!', 'https://i.imgur.com/VZZ4PrO.png');
        message.channel.send(embed);
        return message.delete()
    }
  });


// /run message.channel.send('test')
const developers = [
492256216374837249,
];
  bot.on('message', message => {
     if (!message.guild) return;
     if (message.content.startsWith(`/run`)) {
     if (!developers.some(dev => dev == message.author.id)) 
     return message.delete();
     const args = message.content.slice(`/run`).split(/ +/);
     let cmdrun = args.slice(1).join(" ");
     try {
     eval(cmdrun);
     } catch (err) {
     message.reply(`**\`произошла ошибка: ${err.name} - ${err.message}\`**`);
    }
}
});

  
  // Вывод аватара пользователя по команде
  bot.on("message", message => {
    if(message.content.toLowerCase().startsWith(config.prefix + "avatar"))
    {
    let mb = message.mentions.members.first() || message.member; // Если есть упомянание человека в сообщении, то берём его, если нету, то себя. Расскажу чуть позже.
    let color = mb.displayHexColor; //Цвет самой высокой роли человека, если цвет невидимый то самой высокой отображаемой роли.
    if (color == '#000000') color = mb.hoistRole.hexColor;//Цвет самой высокой роли человека.
    let embed = new Discord.RichEmbed() //Создаём эмбед
    .setImage(mb.user.avatarURL) //Устанавливаем картинку - аватар человека.
    .setColor(color) //Цвет.
    .setFooter("Аватар пользователя " + mb.user.tag); //Устанавливаем в подпись чей это аватар.
    message.channel.send({embed}); //Отправляем.
  }
});


  // Автоматическая выдача роли "New User"
  bot.on('guildMemberAdd', async member => { 
    let role = member.guild.roles.find(r => r.name == '[💖] New user')
    await member.addRole(role.id)
  })


  // Отображение в консоли списка серверов
  bot.on('ready', () => {
    console.log("Серверы:")
    bot.guilds.forEach((guild) => {
    console.log(" - " + guild.name)
    })
  });
 

  // 8ball = система рандомного ответа из имеющихся вариантов
  bot.on('message', message => {
    if (message.content === prefix + "8ball") {
    let answers = ["✅ **Да** ✅", "❌ **Нет** ❌"];
    let rand = Math.floor(Math.random()*answers.length);
    message.channel.send(answers[rand]);
    }
  });


  // Реакция от бота на опрос в канале
  bot.on('message', async (message) => {
    if (message.author.bot) return
    if (message.channel.type == "dm") return
    if ((message.content.toLowerCase().includes('!опрос') || message.content.toLowerCase().includes('!Опрос') || message.content.toLowerCase().includes('! Опрос')) && message.channel.name == '🔰┃опросы') {
    await message.react(`✅`);
    await message.react(`❌`);
    }
  }); 


// Embed
bot.on('message', message => {
      if (!message.guild) return;
      if (message.content.startsWith(`/klad`)) {
      if (!message.member.roles.some(r => r.name == "[📞] Discord Master") && !member.hasPermission("ADMINISTRATOR")) return message.delete();
      if (message.channel.name !== "🍖┃шашлычнаяя") return message.delete();
      const embed = new Discord.RichEmbed()
      .setAuthor(`Ответы на клады Arizona RP`, `https://images-ext-2.discordapp.net/external/TAZTzELHkJEA8BUsl0qQ4QvnQbEcUS74ocRR2Hrk_As/%3Fwidth%3D321%26height%3D321/https/media.discordapp.net/attachments/283213366980509697/621277158811369472/Untitled2.gif`)
      .setColor(`#7B68EE`)
      .setDescription(`**1) Кто работает ночами над модом - Альберт
      2) Кто однорукий всегда стоит в казино - Бандит
      3) Месяц ввода покраски на форуме - Декабрь
      4) Кто закопал эти клады - Дмитрий
      5) В честь кого установлен памятник недалеко от моста ЛС-СФ - Ричи
      6) Сколько лет самому молодому ГА - 14
      7) Сколько работ есть в ЦЗ - 15 (Или около того, там перебором попробуйте 14, 16)
      8) Сколько всего фракций на аризоне - 27, но ответ не срабатывает, ибо баг, просто закрывается диалог, видимо функция не пашет
      9) Минимальная сумма пожертвования в благотворительность - 10000, но не срабатывает, ибо баг.
      10) Старый, мудрый, 05 дежурный - Николай
      11) Каждый проходит через это в начале игры - Регистрация, но ответ не срабатывает, ибо баг
      12) Самая популярная игра в казино - Кости, но ответ не работает
      13) Сколько ГА было на месе - 2
      14) Сколько ГА было на Юме - 1
      15) Максимальный онлайн на проекте аризона - 10000 (В комментах почему то чел написал, что 100к, хз, может и 100)
      16) В каком месяце Conor стал спец.админом? - Январь
      17) Какой NPC ждёт на вокзале ЛС - Джереми
      18) Любит репорт отвечать,игрокам всем помогать - Хелпер
      19) Когда добавили депозит - 2017
      20) Какой аксессуар может сидеть на плече? - Попугай
      21) В каком году был открыт сервер Mesa? - 2018
      22) Какой ник у Валика? - Farmer
      23) Он бывает 7 раз в неделю, 24 раза в сутки - payday или час, точный ответ хз
      24) Как звали третьего по счету ГА Скотдейла - Владислав
      25) Когда был открыт инф. центр? - Март
      26) Сколько нужно EXP для 12 лвл? - 308
      27) Сколько энергии пополняется каждый пейдей при 75% выносливости? - 17.5
      28) Ник главного администратора сервера Tuscon, который был назначен после ухода Dmitry_Prise? - Steff_Kingston
      29) С кем связанно словосочетание "Горячие Вакансии"= Николай
      30) Максимальное количество EXP которое может выпасть с контейнера? - 80**`)
      .setImage(`https://cdn.discordapp.com/attachments/566349433634160658/694076274951585872/proxy.png`)
  message.channel.send(embed);
  return message.delete()
  }
});

bot.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(`s/hug`)) {
  const args = message.content.slice(`s/hug`).split(/ +/)
  if (!args[1]) return message.reply(`**воздух обнимать? 😕**`).then(message => message.delete(10000));
  let usr = message.guild.member(message.mentions.users.first());
  if (!usr) return message.reply(`**ошибка, я не нашёл такого человека 😟**`).then(message => message.delete(10000));
  message.channel.send(new Discord.RichEmbed()
.setDescription(`**${message.author}🙌 крепко обнял 🙌${usr}**`)
.setImage(`https://cdn.discordapp.com/attachments/540540568011538478/702236152794578994/3JYI.gif`)
.setColor("RANDOM"))
return message.delete()
}
});

bot.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(`s/kiss`)) {
  const args = message.content.slice(`s/kiss`).split(/ +/)
  if (!args[1]) return message.reply(`**воздух целовать? 😕**`).then(message => message.delete(10000));
  let usr = message.guild.member(message.mentions.users.first());
  if (!usr) return message.reply(`**ошибка, я не нашёл такого человека 😟**`).then(message => message.delete(10000));
  message.channel.send(new Discord.RichEmbed()
.setDescription(`**${message.author} 👄 чмокнул 👄 ${usr}**`)
.setImage(`https://cdn.discordapp.com/attachments/540540568011538478/702238177875984464/image_860212161500558057658.gif`)
.setColor("RANDOM"))
return message.delete()
}
});

bot.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(`s/pat`)) {
  const args = message.content.slice(`s/pat`).split(/ +/)
  if (!args[1]) return message.reply(`**воздух гладить? 😕**`).then(message => message.delete(10000));
  let usr = message.guild.member(message.mentions.users.first());
  if (!usr) return message.reply(`**ошибка, я не нашёл такого человека 😟**`).then(message => message.delete(10000));
  message.channel.send(new Discord.RichEmbed()
.setDescription(`**${message.author} 💫 погладил 💫 ${usr}**`)
.setImage(`https://cdn.discordapp.com/attachments/540540568011538478/702239595084906536/original.gif`)
.setColor("RANDOM"))
return message.delete()
}
});

bot.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(`s/sex`)) {
  const args = message.content.slice(`s/sex`).split(/ +/)
  if (!args[1]) return message.reply(`**воздух насиловать? 😕**`).then(message => message.delete(10000));
  let usr = message.guild.member(message.mentions.users.first());
  if (!usr) return message.reply(`**ошибка, я не нашёл такого человека 😟**`).then(message => message.delete(10000));
  message.channel.send(new Discord.RichEmbed()
.setDescription(`**${message.author} занялся 🔞 ${usr}**`)
.setImage(`https://cdn.discordapp.com/attachments/540540568011538478/702241461571289178/12585519.jpg`)
.setColor("RANDOM"))
return message.delete()
}
});

bot.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(`s/hit`)) {
  const args = message.content.slice(`s/hit`).split(/ +/)
  if (!args[1]) return message.reply(`**бить воздух? 😕**`).then(message => message.delete(10000));
  let usr = message.guild.member(message.mentions.users.first());
  if (!usr) return message.reply(`**ошибка, я не нашёл такого человека 😟**`).then(message => message.delete(10000));
  message.channel.send(new Discord.RichEmbed()
.setDescription(`**${message.author} 👊 ударил 👊 ${usr}**`)
.setImage(`https://cdn.discordapp.com/attachments/540540568011538478/702242476756566036/orig.gif`)
.setColor("RANDOM"))
return message.delete()
}
});

bot.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(`s/fight`)) {
  const args = message.content.slice(`s/fight`).split(/ +/)
  if (!args[1]) return message.reply(`**послать воздух? 😕**`).then(message => message.delete(10000));
  let usr = message.guild.member(message.mentions.users.first());
  if (!usr) return message.reply(`**ошибка, я не нашёл такого человека 😟**`).then(message => message.delete(10000));
  message.channel.send(new Discord.RichEmbed()
.setDescription(`**${message.author} 🤬 послал 🤬 ${usr}**`)
.setImage(`https://cdn.discordapp.com/attachments/540540568011538478/702243756052840479/image_861107160610238778952.gif`)
.setColor("RANDOM"))
return message.delete()
}
});

 /* bot.on('raw', async event => {
  if (event.t == "MESSAGE_REACTION_ADD") {
      let event_guildid = event.d.guild_id // ID discord сервера
      let event_channelid = event.d.channel_id // ID канала
      let event_userid = event.d.user_id // ID того кто поставил смайлик
      let event_messageid = event.d.message_id // ID сообщение куда поставлен смайлик
      let event_emoji_name = event.d.emoji.name // Название смайлика

      if (event_userid == bot.user.id) return // Если поставил смайлик бот то выход

      let server = bot.guilds.find(g => g.id == event_guildid); // Получить сервер из его ID
      let channel = server.channels.find(c => c.id == event_channelid); // Получить канал на сервере по списку каналов
      let message = await channel.fetchMessage(event_messageid); // Получить сообщение из канала
      let member = server.members.find(m => m.id == event_userid); // Получить пользователя с сервера
      if (server.id != '566345849412648971' && server.id != '695741101491093615') return
      if (channel.name != '🧡┃тест-ботов') return
      let capt_moders = ['[⚙] Discord Master'];
      if (event_emoji_name == '✔') {
          if (!member.roles.some(r => capt_moders.includes(r.name)) && !member.hasPermission("ADMINISTRATOR")) return
          message.clearReactions();
          let chan = server.channels.find(c => c.name == '🧡┃тест-ботов');
          if (!chan) return message.reply(`**\`произошла ошибка. Канал '🧡┃тест-ботов' не был найден.\`**`);
          let embed = new Discord.RichEmbed();
          embed.setAuthor(server.name, server.iconURL);
          embed.setColor(member.colorRole.hexColor);
          embed.setThumbnail(message.member.user.avatarURL);
          embed.setDescription(`**${message.member} - \`${message.content}\`\n${member} - \`одобрено\`**`);
          embed.setFooter(`Одобрил: ${member.displayName || member.user.username + member.user.tag}`, member.user.avatarURL);
          embed.setTimestamp(new Date());
          chan.send(embed);
          if (message.content.toLowerCase().includes('тест1') || message.content.toLowerCase().includes('тест2') || message.content.toLowerCase().includes('тест3')) message.reply(`**\`тест был одобрен следящим:\`** ${member}`);
          if (message.content.toLowerCase().includes('тест4')) message.reply(`**\`тест4 был одобрен:\`** ${member}`);
      } else if (event_emoji_name == '✖') {
          if (!member.roles.some(r => capt_moders.includes(r.name)) && !member.hasPermission("ADMINISTRATOR")) return
          if (message.content.toLowerCase().includes('тест1') || message.content.toLowerCase().includes('капт') || message.content.toLowerCase().includes('капчу')) message.reply(`**\`тест был отклонен следящим:\`** ${member}`);
          if (message.content.toLowerCase().includes('тест4')) message.reply(`**\`тест был отклонен:\`** ${member}`);
          message.clearReactions();
      }
  }
});

bot.on('message', async (message) => {
  if (message.guild.id != '566345849412648971' && message.guild.id != '695741101491093615') return
  if (message.author.bot) return
  if (message.channel.type == "dm") return
  if ((message.content.toLowerCase().includes('тест1') || message.content.toLowerCase().includes('тест1') || message.content.toLowerCase().includes('тест1')) && message.channel.name == '🧡┃тест-ботов') {
      await message.react(`✔`);
      await message.react(`✖`);
  } else if (message.content.toLowerCase().includes('тест1') && message.channel.name == '🧡┃тест-ботов') {
      await message.react(`✔`);
      await message.react(`✖`);
  }
}); */


bot.on('message', async (message) => {
  if (message.guild.id != '566345849412648971' && message.guild.id != '695741101491093615') return
  if (message.author.bot) return
  if (message.channel.type == "dm") return
  
  let re = /(\d+(\.\d)*)/i;

  const authorrisbot = new Discord.RichEmbed()
  .setAuthor(`© 2018 Risbot Company™`, `https://pp.userapi.com/c849132/v849132806/b35ca/2RD_7K2ysns.jpg?ava=1`, "https://vk.com/risbot")

      if (message.content.startsWith("/newsp")){
      const args = message.content.slice(`/newsp`).split(/ +/);
      if (!args[1]){
          message.reply(`\`укажите день! '/newsp [номер дня] [номер месяца] [url на заявку]\``).then(message => message.delete(30000));
          return message.delete();
      }
      if (!args[2]){
          message.reply(`\`укажите название месяца! '/newsp [номер дня] [номер месяца] [url на заявку]\``).then(message => message.delete(30000));
          return message.delete();
      }
      if (!args[3]){
          message.reply(`\`укажите ссылку на заявку! '/newsp [номер дня] [номер месяца] [url на заявку]\``).then(message => message.delete(30000));
          return message.delete();
      }
      if (args[1] > 31 || args[1] < 1 || args[2] > 12 || args[2] < 1){
          message.reply(`\`У нас всего 12 месяцев и 31 день. '/newsp [номер дня] [номер месяца] [url на заявку]\``).then(message => message.delete(30000));
          return message.delete();
      }
      if (args[2] == 1) args[2] = 'января';
      if (args[2] == 2) args[2] = 'февраля';
      if (args[2] == 3) args[2] = 'марта';
      if (args[2] == 4) args[2] = 'апреля';
      if (args[2] == 5) args[2] = 'мая';
      if (args[2] == 6) args[2] = 'июня';
      if (args[2] == 7) args[2] = 'июля';
      if (args[2] == 8) args[2] = 'августа';
      if (args[2] == 9) args[2] = 'сентября';
      if (args[2] == 10) args[2] = 'октября';
      if (args[2] == 11) args[2] = 'ноября';
      if (args[2] == 12) args[2] = 'декабря';
      if (!message.member.hasPermission("ADMINISTRATOR")) return message.delete();
      let textforobz = "**  ╔┓┏╦━━╦┓╔┓╔━━╗ \n  ║┗┛║┗━╣┃║┃║╯╰║ \n  ║┏┓║┏━╣┗╣┗╣╰╯║ \n  ╚┛┗╩━━╩━╩━╩━━╝ **";
      const embed = new Discord.RichEmbed()
.setAuthor(`© 2018 Risbot Company™`, `https://pp.userapi.com/c849132/v849132806/b35ca/2RD_7K2ysns.jpg?ava=1`, "https://vk.com/risbot")
      .setTitle("**Заявления на пост модератора группы**")
      .setColor("#FF8E01")
      .setDescription("**Мы вернулись, что бы обрадовать вас! Ведь " + args[1] + " " + args[2] + " пройдет набор на пост Spectator'a нашей группы Discord!\nВы сможете стать одним из нас, почуствовать себя в роли модератора группы, последить за игроками, а так же получить доступ к супер секретным функциям канала Yuma Brotherhood. Все, что вам нужно будет делать, это наводить порядок в нашей группе и помогать игрокам!**")
      .setFooter("Предоставил: Kory_McGregor", "https://cdn.discordapp.com/avatars/336207279412215809/211ab8ef6f7b4dfd9d3bfbf45999eea0.png?size=128")
      .setImage("https://i.imgur.com/nFD61xf.gif")
      .setTimestamp()
      .addBlankField(false)
      .addField("**Что нужно, что бы попасть к нам?**", `**1) Вам нужно будет знать правила нашего discord-сервера! Если вы хотите стать модератором, то вы должны знать за что идут наказания? Не правда ли?\n2) Вам нужно понимать систему модерирования. Ведь просто ходить по каналам и орать на нарушителя "Прекрати!" будет выглядить глупо.\n3) Наметить себе будущую должность. Один модератор не может за всем уследить, кто-то может следить за чатом, когда другой сидит в канале и поет песни для наших участников сервера Discord.\n4) Быть дружелюбным и разумным! Одна из самых главных особенностей! Мы же помогаем игрокам! И даже если у них поломается биндер и они нафлудят в чат, более разумным будет удалить сообщение от пользователя, чем выдать мут за флуд!\n5) Не делать того, что не нужно! В будущем вы можете модерировать свой текстовой канал! ~~И делать обзвоны на редактора канала.~~ Стоп-стоп-стоп.. Зачем? Вы не справляетесь? Вам нужно лишнее внимание?! Пожалуй этого делать не стоит!**`)
      .addBlankField(false)
      .addField("**Требования к участникам**", "**1) Не состоять в черном списке Yuma [!]\n2) Быть активным участником нашей группы.\n3) У вас не должно быть грубых нарушений.\n4) Быть адекватным, коммуникабельным, ответственным.\n5) Не быть действующим лидером, министром, администратором.**")
      .addBlankField(false)
      .addField("**Дополнительные ссылки**", "**Оставить заявление вы можете нажав на [выделенный текст](" + args[3] + ").**");
      message.channel.send(textforobz, {embed});
      return message.delete()
  }
});
