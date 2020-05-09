const Discord = require('discord.js');
const bot = new Discord.Client();
bot.on('ready', () => {
    console.log('I am ready!');
bot.login(process.env.BOT_TOKEN);
});
bot.on('message', message => {
    if (message.content === 's/ping') {
        var pingembed = new Discord.RichEmbed()
        .setColor("#4682B4")
        .setTitle(`Ping ${bot.ping}ms pong :ping_pong:`)
         message.channel.send(pingembed).then(msg => msg.delete(600000));
      }
});

bot.on('ready', () => {
    console.log(`Выполнен вход как ${bot.user.username}`);
    bot.generateInvite(["ADMINISTRATOR"]).then(link =>{
        console.log(link);
        setInterval(() => {
      bot.user.setActivity(`за Стиллерами\n                        👀`, { type: "WATCHING" });
      bot.user.setActivity('инструкции и приказы\n               (╯°□°）╯', { type: "LISTENING" });
    }, 5000)
});
});

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

  bot.on('guildMemberAdd', async member => { 
    let role = member.guild.roles.find(r => r.name == '[💖] New user')
    await member.addRole(role.id)
  })

  bot.on('ready', () => {
    console.log("Серверы:")
    bot.guilds.forEach((guild) => {
    console.log(" - " + guild.name)
    })
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

    var mysql = require('mysql');
console.log('[MYSQL] Подключение...');
var conn = mysql.createConnection({ 
database: 'stealer', 
host: "db4free.net", 
user: "oliverstealer", 
password: "qaz12345"
});
conn.connect(function(err) { 
if (err) throw err; 
console.log("[MYSQL] База данных подключена!");
});

bot.on("message", (message) => { 
    if (message.channel.id == '566345849412648971' || message.channel.id == '649274423605723163') {
    if(message.content == "s/test1")
    { 
    message.reply('**❓ привет! Первый вопрос: что написано в правилах "Общие правила" под пунктом 8? ❓**');
    } 
    }
    }); 
    bot.on("message", (message) => { 
        if(message.content == "t1 8. Токсики, можете выходить из сервера сразу")
    { 
    message.reply("**✅ молодец, правильно! Переходи к следующему вопросу при помощи команды** `s/test2` ✅");
    } 
    }); 
  
    bot.on("message", (message) => { 
        if (message.channel.id == '566345849412648971' || message.channel.id == '649274423605723163') {
      if(message.content == "s/test2")
      { 
      message.reply('**❓ разрешено ли флудить сообщениями? ❓**');
      } 
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
    if (message.channel.id == '566345849412648971' || message.channel.id == '649274423605723163') {
    if(message.content == "s/test3")
    { 
    message.reply('**❓ разрешено ли пиарить другие Discord сервера? ❓**');
    } 
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
    message.reply("**эй...пиар запрещён** ⛔");
    } 
  });
  
   bot.on("message", (message) => { 
    if (message.channel.id == '566345849412648971' || message.channel.id == '649274423605723163') {
    if(message.content == "s/test4")
    { 
    message.reply('**📨 молодец, все вопросы пройдены! Ожидай пока <@&566347941527420938> выдаст тебе доступ в остальным каналам 📨**');
    } 
      }
    });
  
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
          if (server.id != '566345849412648971' && server.id != '649274423605723163') return
          if (channel.name != '🎮┃тест') return
          let capt_moders = ['[📞] Discord Master'];
          if (event_emoji_name == '✔') {
              if (!member.roles.some(r => capt_moders.includes(r.name)) && !member.hasPermission("ADMINISTRATOR")) return
              message.clearReactions();
              let chan = server.channels.find(c => c.name == '🎮┃тест');
              if (!chan) return message.reply(`**\`произошла ошибка. Канал '🎮┃тест' не был найден.\`**`);
              let embed = new Discord.RichEmbed();
              embed.setAuthor(server.name, server.iconURL);
              embed.setColor(member.colorRole.hexColor);
              embed.setThumbnail(message.member.user.avatarURL);
              embed.setDescription(`**${message.member} - \`${message.content}\`\n${member} - \`одобрено\`**`);
              embed.setFooter(`Одобрил: ${member.displayName || member.user.username + member.user.tag}`, member.user.avatarURL);
              embed.setTimestamp(new Date());
              chan.send(embed);
              if (message.content.toLowerCase().includes('s/test4')) /* || message.content.toLowerCase().includes('test4') ||  message.content.toLowerCase().includes('test')) */ message.reply(`**\`тест был одобрен Дискорд Мастером:\`** ${member}`);
              let role = member.guild.roles.find(r => r.name == '[👾] Пупс')
              await member.addRole(role.id)
           //   if (message.content.toLowerCase().includes('s/test4')) message.reply(`**\`тест был одобрен:\`** ${member}`);
          } else if (event_emoji_name == '✖') {
              if (!member.roles.some(r => capt_moders.includes(r.name)) && !member.hasPermission("ADMINISTRATOR")) return
              if (message.content.toLowerCase().includes('s/test4')) /* || message.content.toLowerCase().includes('test4') || message.content.toLowerCase().includes('test')) */ message.reply(`**\`тест был отклонен Дискорд Мастером:\`** ${member}`);
              let role = member.guild.roles.find(r => r.name == '[💖] New user')
              await member.removeRole(role.id)
             // if (message.content.toLowerCase().includes('s/test4')) message.reply(`**\`тест был отклонен:\`** ${member}`);
              message.clearReactions();
          }
      }
    });
  
    bot.on('message', async (message) => {
      if (message.guild.id != '566345849412648971' && message.guild.id != '649274423605723163') return
      if (message.author.bot) return
      if (message.channel.type == "dm") return
      if ((message.content.toLowerCase().includes('s/test4')) /*|| message.content.toLowerCase().includes('test4') || message.content.toLowerCase().includes('test'))*/ && message.channel.name == '🎮┃тест') {
          await message.react(`✔`);
          await message.react(`✖`);
      } else if (message.content.toLowerCase().includes('s/test4') && message.channel.name == '🎮┃тест') {
          await message.react(`✔`);
          await message.react(`✖`);
      }
    });

    bot.on('message', async (message) => {
        if (message.author.bot) return
        if (message.channel.type == "dm") return
        if ((message.content.toLowerCase().includes('Стиллеры') || message.content.toLowerCase().includes('Стиллер') || message.content.toLowerCase().includes('стиллер')) && message.channel.name == '🍖┃шашлычная') {
          await message.react(`📀`);
          await message.react(`🏆`);
          await message.react(`🕹`);
          await message.react(`🎭`);
          await message.react(`🔮`);
          await message.react(`🎈`);
          await message.react(`🎁`);
          message.clearReactions();
        }
      }); 
    
      bot.on('message', message => {
        if (!message.guild) return;
        if (message.content.startsWith(`s/timer`)) {
        setInterval(() => {
            message.channel.send('```asciidoc\n= Привет! =\n```\n`Мы старались и написали` <#586643283862749212> `для дискорд сервера! Так же всю полезную информацию ты можешь найти в канале` <#613499980497551370> 🧸')
        return message.delete()
             }, 43200000)
           }
        });

        bot.on('message', message => {
            if (!message.guild) return;
            if (message.content.startsWith(`s/timer`)) {
            setInterval(() => {
            message.channel.send('```asciidoc\n= Привет! =\n```\n`Если у тебя есть вопросы по дискорд серверу или же предложения по тому, как улучшить его, то можешь их написать в канал` <#630149890089025536>\n`Нужно просто нажать на реакцию и перейти в созданный канал` 🎈');
            return message.delete()
                 }, 86400000)
               }
            });

            bot.on('message', message => {
                if (!message.guild) return;
                if (message.channel.id == '566345849412648971' || message.channel.id == '706239180589760602') {
                if (message.content.startsWith('Роль')||message.content.startsWith('роль')) {
                const embed = new Discord.RichEmbed()
                  .setColor('#4682B4')
                  .setDescription('`Привет! Получить роль можно в нескольких каналах:\n|1| В канале` <#686269179359526979> `часто проходят розыгрыши на личные роли`\n`|2| В канале` <#605112700770713611> `есть множество ролей на выбор`')
              message.reply(embed).then(msg => msg.delete(600000));
               }
             }
           });

           bot.on('message', message => {
            if (!message.guild) return;
           if (message.content === "s/coinflip") {
            let answers = ["**🦅 Выпал орёл 🦅**", "**💰 Решка 💰**", "**🎩 Ребро 🎩**"]; // Варианты ответов, которые будут выведены
            let rand = Math.floor(Math.random()*answers.length); // Получаем рандомный ответ из предоставленных
            message.channel.send(answers[rand]).then(msg => msg.delete(600000)); // Отправляем сообщение в чат
            }
    });

    bot.on('message', message => {
        if (!message.guild) return;
    if (message.content.toLowerCase().startsWith(`s/bug`)) {
        const args = message.content.slice('s/bug').split(/ +/);
        if (!args[1]) {
            message.reply(`\`привет! Для отправки отчета об ошибках используй: s/bug [текст]\``).then(message => message.delete(15000));
            return message.delete()
        }
        let bugreport = args.slice(1).join(" ");
        if (bugreport.length < 5 || bugreport.length > 1300) {
            message.reply(`\`нельзя отправить запрос с длинной меньше 5 или больше 1300 символов!\``).then(message => message.delete(15000));
            return message.delete()
        }
        let author_bot = message.guild.channels.find(c => c.name == "💫┃moder-chat");
        if (!author_bot) {
            message.reply(`\`я не смог отправить сообщение.. Канал модераторов не был найден.\``).then(message => message.delete(15000));
            return message.delete()
        }
        author_bot.send(`**Пользователь <@${message.author.id}> \`(${message.author.id})\` отправил запрос с канала <#${message.channel.id}> \`(${message.guild.id})\`.**\n` +
            `**Суть обращения:** \`${bugreport}\``);
        message.reply(`\`хэй! Я отправил твое сообщение на рассмотрение дискорд мастеру!\``).then(message => message.delete(15000));
        return message.delete();
      }
    });

    bot.on('message', message => {
        if (message.content === prefix + "8ball") {
        let answers = ["✅ **Да** ✅", "❌ **Нет** ❌"];
        let rand = Math.floor(Math.random()*answers.length);
        message.channel.send(answers[rand]);
        }
      });

      bot.on('message', message => {
        if (!message.guild) return;
      if (message.channel.id == '566345849412648971' || message.channel.id == '694811994217381958') {
        if (message.author.bot) return
        if (message.channel.type == "dm") return
        if ((message.content.toLowerCase().includes('s/vote')) && message.channel.name == '🔰┃опросы') {
        await message.react(`✅`);
        await message.react(`❌`);
        }
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
