const Discord = require('discord.js');
const bot = new Discord.Client();
bot.on('ready', () => {
    console.log(`Выполнен вход как ${bot.user.username}`);
    bot.generateInvite(["ADMINISTRATOR"]).then(link =>{
        console.log(link);
    var i = 0;
    });
});

/*bot.on('message', message => {
    if (message.content === 's/ping') {
        var pingembed = new Discord.RichEmbed()
        .setColor("#4682B4")
        .setTitle(`Ping ${bot.ping}ms pong :ping_pong:`)
         message.channel.send(pingembed).then(msg => msg.delete(600000));
      }
});*/

bot.commands = new Discord.Collection();
const fs = require('fs');
bot.mutes = require('./mutes.json');
 let config = require('./botconfig.json');
 let token = config.token;
let prefix = config.prefix;
let profile = require('./profile.json');
fs.readdir('./cmds/',(err,files)=>{
    if(err) console.log(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <=0) console.log("У меня кончились команды");
    console.log(`Я загрузил ${jsfiles.length} команд!`);
    jsfiles.forEach((f,i) =>{
        let props = require(`./cmds/${f}`);
        console.log(`Загружен файл: ${i+1}.${f}`);
        bot.commands.set(props.help.name,props);
    });
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

bot.on("ready", message => {
       var timer = bot.setInterval(function () {    
           var gamePresence = [`за Стиллерами 👾`,`инструкции и приказы 👻`,`за командами s/help 👀`];
          bot.user.setPresence({ game: { name: gamePresence[i%gamePresence.length], type: 3 } });
           i++;
       }, 5000)
    });

    bot.setInterval(()=>{
        for(let i in bot.mutes){
            let time = bot.mutes[i].time;
            let guildid = bot.mutes[i].guild;
            let guild = bot.guilds.get(guildid);
            let member = guild.members.get(i);
            let muteRole = member.guild.roles.find(r => r.name === "❌ Muted ❌"); 
            if(!muteRole) continue;
            if(Date.now()>= time){
                member.removeRole(muteRole);
                delete bot.mutes[i];
                fs.writeFile('./mutes.json',JSON.stringify(bot.mutes),(err)=>{
                    if(err) console.log(err);
                });
            }
        }

    },5000)
});

bot.on('message', message => {
    if (message.content === "s/help") {
      var help = new Discord.RichEmbed()
      .setColor("#4682B4")
      .setAuthor("© Oliver Stealer", "https://cdn.discordapp.com/attachments/632202420956692501/708676052548845608/659407-1024x576.jpg")
      .addField("**Информация**", `**👑 Создатель: <@492256216374837249> 👑 \n🤖 Бот был создан 08.02.2020 🤖 \n🔧 Стадия: Стоит на хостинге и ждёт обновлений 🔧\n🔰 Команд: ${bot.commands.size.toLocaleString()} 🔰**`)
      .addField('**Команды бота**', '`s/ping` **┃ узнать время отклика**\n`s/coinflip` **┃ небольшая игра в монетку**\n`s/avatar` **┃ выдать URL ссылку на ваш аватар**\n`s/vote` **┃ ставит реакции для опросов**\n`s/8ball` **┃ рандомный ответ "Да" или "Нет"**\n`s/bug` **┃ отправить ошибку**\n`s/test1-4` **┃ тест для Stealer Squad**\n`s/serverinfo` **┃ показать информацию о сервере**\n`s/userinfo` **┃ показать информацию о юзере**\n`s/translate [ru или en]` **┃ перевод текста**\n`s/weather` **┃ просмотр погоды [доработка]**\n`s/stats` **┃ показатели бота**\n`s/pages` **┃ страницы [доработка]**\n`s/currate` **┃ обменный курс [доработка]**')
      .addField('**Role Play команды**', '`s/kiss` **┃ поцеловать**\n`s/pat` **┃ погладить**\n`s/hug` **┃ обнять**\n`s/sex` **┃ без лишних слов**\n`s/fight` **┃ обматерить**\n`s/hit` **┃ ударить**')
      .addField('**Команды модерации [доработка]**', '`s/warn` **┃ выдать предупреждение**\n`s/unwarn` **┃ снять предупреждение**\n`s/ban` **┃ выдать блокировку**\n`s/mute` **┃ выдать мут**\n`s/pin [id sms]` **┃ закрепить сообщение**\n`s/say` **┃ отправить сообщение от имени бота**\n`s/reload` **┃ перезагрузить команду**\n`s/change` **┃ отредактировать сообщение бота**\n`s/clear` **┃ удалить сообщения**\n`s/kick` **┃ кикнуть юзера**')
      .addField('**Embed команды**', '`/embhelp` **┃ помощь по командам**\n`/embsetup` **┃ установить значения для embed**\n`/embfield` **┃ настройка строк field**\n`/embsend` **┃ отправить итог в канал**')
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
 
bot.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    let uid = message.author.id;
    bot.send = function (msg){
        message.channel.send(msg);
    };
    if(!profile[uid]){
        profile[uid] ={
            coins:0,
            warns:0,
            xp:0,
            lvl:0,
        };
    };
    let u = profile[uid];

    u.coins++;
    u.xp++;

    if(u.xp>= (u.lvl * 5)){
        u.xp = 0;
        u.lvl += 1;
    };


    fs.writeFile('./profile.json',JSON.stringify(profile),(err)=>{
        if(err) console.log(err);
    });

    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    if(!message.content.startsWith(prefix)) return;
    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot,message,args);
    bot.rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    bot.uId = message.author.id;
});

/*
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
*/

/* bot.on('guildMemberUpdate', async (oldMember, newMember) => {
    if (newMember.guild.id != "566345849412648971") return // Сервер не 03!
    if (oldMember.roles.size == newMember.roles.size) return // Сменил ник или еще чет!
    if (newMember.user.bot) return // Бот не принимается!
    if (oldMember.roles.size < newMember.roles.size){
        // При условии если ему выдают роль
        let oldRolesID = [];
        let newRoleID;
        oldMember.roles.forEach(role => oldRolesID.push(role.id));
        newMember.roles.forEach(role => {
            if (!oldRolesID.some(elemet => elemet == role.id)) newRoleID = role.id;
        })
        let role = newMember.guild.roles.get(newRoleID);
        if (role.name != "[📞] Discord Master" && role.name != "[🥈] Helper") return
        const entry = await newMember.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first());
        let member = await newMember.guild.members.get(entry.executor.id);
        if (member.user.bot) return // Бот не принимается!
        if (!member.hasPermission("ADMINISTRATOR")){
            if (antislivsp1.has(member.id)){
                if (antislivsp2.has(member.id)){
                    member.removeRoles(member.roles);
                    return newMember.guild.channels.find(c => c.name == "💫┃moder-chat").send(`\`[ANTISLIV SYSTEM]\` <@${member.id}> \`подозревался в попытке слива. [3/3] Я снял с него роли. Пострадал:\` <@${newMember.id}>, \`выдали роль\` <@&${role.id}>`);
                }else{
                    newMember.guild.channels.find(c => c.name == "💫┃moder-chat").send(`\`[WARNING]\` <@${member.id}> \`подозревается в попытке слива!!! [2/3] Выдача роли\` <@&${role.id}> \`пользователю\` <@${newMember.id}>`)
                    return antislivsp2.add(member.id);
                }
            }
            newMember.guild.channels.find(c => c.name == "💫┃moder-chat").send(`\`[WARNING]\` <@${member.id}> \`подозревается в попытке слива!!! [1/3] Выдача роли\` <@&${role.id}> \`пользователю\` <@${newMember.id}>`)
            return antislivsp1.add(member.id);
        }
        let spec_chat = await newMember.guild.channels.find(c => c.name == "💫┃moder-chat");
        let question = await spec_chat.send(`<@${member.id}>, \`вы выдали роль\` <@&${role.id}> \`пользователю\` <@${newMember.id}>\n\`Укажите причину выдачи роли в новом сообщении!\``);
        spec_chat.awaitMessages(response => response.member.id == member.id, {
            max: 1,
            time: 120000,
            errors: ['time'],
        }).then(async (answer) => {
            question.delete().catch(() => {});
            spec_chat.send(`\`[MODERATOR_ADD]\` \`${member.displayName} выдал роль\` <@&${role.id}> \`пользователю\` <@${newMember.id}>. \`Причина: ${answer.first().content}\``);
            answer.first().delete().catch(() => {});
        }).catch(async () => {
            question.delete().catch(() => {});
            spec_chat.send(`\`[MODERATOR_ADD]\` \`${member.displayName} выдал роль\` <@&${role.id}> \`пользователю\` <@${newMember.id}>. \`Причина: не указана.\``);
        })
    }else{
        // При условии если ему снимают роль
        let newRolesID = [];
        let oldRoleID;
        newMember.roles.forEach(role => newRolesID.push(role.id));
        oldMember.roles.forEach(role => {
            if (!newRolesID.some(elemet => elemet == role.id)) oldRoleID = role.id;
        })
        let role = newMember.guild.roles.get(oldRoleID);
        if (role.name != "[📞] Discord Master" && role.name != "[🥈] Helper") return
        const entry = await newMember.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first())
        let member = await newMember.guild.members.get(entry.executor.id);
        if (member.user.bot) return // Бот не принимается!
        if (!member.hasPermission("ADMINISTRATOR")){
            if (antislivsp1.has(member.id)){
                if (antislivsp2.has(member.id)){
                    member.removeRoles(member.roles);
                    return newMember.guild.channels.find(c => c.name == "💫┃moder-chat").send(`\`[ANTISLIV SYSTEM]\` <@${member.id}> \`подозревался в попытке слива. [3/3] Я снял с него роли. Пострадал:\` <@${newMember.id}>, \`сняли роль\` <@&${role.id}>`);
                }else{
                    newMember.guild.channels.find(c => c.name == "💫┃moder-chat").send(`\`[WARNING]\` <@${member.id}> \`подозревается в попытке слива!!! [2/3] Снятие роли\` <@&${role.id}> \`пользователю\` <@${newMember.id}>`)
                    return antislivsp2.add(member.id);
                }
            }
            newMember.guild.channels.find(c => c.name == "💫┃moder-chat").send(`\`[WARNING]\` <@${member.id}> \`подозревается в попытке слива!!! [1/3] Снятие роли\` <@&${role.id}> \`пользователю\` <@${newMember.id}>`)
            return antislivsp1.add(member.id);
        }
        let spec_chat = await newMember.guild.channels.find(c => c.name == "💫┃moder-chat");
        let question = await spec_chat.send(`<@${member.id}>, \`вы сняли роль\` <@&${role.id}> \`модератору\` <@${newMember.id}>\n\`Укажите причину снятия роли в новом сообщении!\``);
        spec_chat.awaitMessages(response => response.member.id == member.id, {
            max: 1,
            time: 120000,
            errors: ['time'],
        }).then(async (answer) => {
            question.delete().catch(() => {});
            spec_chat.send(`\`[MODERATOR_DEL]\` \`${member.displayName} снял роль\` <@&${role.id}> \`модератору\` <@${newMember.id}>. \`Причина: ${answer.first().content}\``);
            answer.first().delete().catch(() => {});
        }).catch(async () => {
            question.delete().catch(() => {});
            spec_chat.send(`\`[MODERATOR_DEL]\` \`${member.displayName} снял роль\` <@&${role.id}> \`модератора\` <@${newMember.id}>. \`Причина: не указана.\``);
        })
    }
}); */
  
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
        if (message.guild.id != '566345849412648971' && message.channel.id != '706239180589760602') return
        if (message.content === "s/timer")
        {
            message.reply('`[TIMER]: таймер на правила и информацию запущен! Сообщение будет отправляться каждые 12 часов!`').then(msg => msg.delete(5000));
            if (!developers.some(dev => dev == message.author.id))
            return message.delete();
        setInterval(() => {
            message.channel.send('```asciidoc\n= Привет! =\n```\n`Мы старались и написали` <#586643283862749212> `для дискорд сервера! Так же всю полезную информацию ты можешь найти в канале` <#613499980497551370> 🧸');
            console.log('Таймер на правила и информацию запущен! Сообщение будет отправляться каждые 12 часов!');
             }, 43200000);
           }
        });

        bot.on('message', message => {
            if (!message.guild) return;
            if (message.guild.id != '566345849412648971' && message.channel.id != '706239180589760602') return
            if (message.content === "s/timer")
            {
            message.reply('`[TIMER]: таймер на саппорт запущен! Сообщение будет отправляться каждые 24 часа!`').then(msg => msg.delete(5000));
                if (!developers.some(dev => dev == message.author.id))
                return message.delete();
            setInterval(() => {
            message.channel.send('```asciidoc\n= Привет! =\n```\n`Если у тебя есть вопросы по дискорд серверу или же предложения по тому, как улучшить его, то можешь их написать в канал` <#630149890089025536>\n`Нужно просто нажать на реакцию и перейти в созданный канал` 🎈');
            console.log('Таймер на саппорт запущен! Сообщение будет отправляться каждые 24 часа!');
                 }, 86400000);
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

                bot.on('guildMemberAdd', member => {
                    const channel = member.guild.channels.find(ch => ch.name === '🎮┃тест');
                    if (!channel) return;
                  channel.send(`**☆☆☆ ${member} ☆☆☆**\n**<:hello:693171056516530276> Привет! <:hello:693171056516530276>**\n**Прочитай текст в <#649274339052617749>\nЕсли у тебя в игре фамилия "Stealer", то просто упомяни <@492256216374837249>**`).then(msg => msg.delete(600000));
                 //  const embed = new Discord.RichEmbed()
                  // .setColor(`#4682B4`)
                   //.setDescription(`**Привет! <:hello:693171056516530276>\n>>> Прочитай текст в <#649274339052617749>\nЕсли у тебя в игре фамилия "Stealer", то просто упомяни <@492256216374837249>**`)
                  //  message.channel.send(embed).then(msg => msg.delete(600000));
                    });

               /* bot.on('guildMemberAdd', member => {
                    const channel = member.guild.channels.find(ch => ch.name === '🎮┃тест');
                    if (!channel) return;
                   // channel.send(`${member}`);
                   const embedd = new Discord.RichEmbed()
                   .setColor(`#4682B4`)
                   .setDescription(`**<:hello:693171056516530276> Привет, ${member}! <:hello:693171056516530276>\n**`)
                   .setThumbnail(`https://images-ext-2.discordapp.net/external/TAZTzELHkJEA8BUsl0qQ4QvnQbEcUS74ocRR2Hrk_As/%3Fwidth%3D321%26height%3D321/https/media.discordapp.net/attachments/283213366980509697/621277158811369472/Untitled2.gif`)
                   // channel.send(embedd)//.then(message => message.delete(600000));
                   channel.send(embedd).then(msg => msg.delete(600000));
                    }); */

                     bot.on('message', message => {
                     if (!message.guild) return;
                     if (message.content.startsWith(`@Webalta test`)) {
                        message.channel.send("+++")
                        }
                    });

                    /* bot.on('raw', async event => {
                        if (!events.hasOwnProperty(event.t)) return; // Если не будет добавление или удаление смайлика, то выход
                        if (event.t == "MESSAGE_REACTION_ADD") {
                            let event_guildid = event.d.guild_id // ID discord сервера
                            let event_channelid = event.d.channel_id // ID канала
                            let event_userid = event.d.user_id // ID того кто поставил смайлик
                            let event_messageid = event.d.message_id // ID сообщение куда поставлен смайлик
                            let event_emoji_name = event.d.emoji.name // Название смайлика
                    
                            if (event_userid == bot.user.id) return // Если поставил смайлик бот то выход
                            if (event_guildid != serverid) return // Если сервер будет другой то выход
                    
                            let server = bot.guilds.find(g => g.id == event_guildid); // Получить сервер из его ID
                            let channel = server.channels.find(c => c.id == event_channelid); // Получить канал на сервере по списку каналов
                            let message = await channel.fetchMessage(event_messageid); // Получить сообщение из канала
                            let member = server.members.find(m => m.id == event_userid); // Получить пользователя с сервера
                    
                            if (event_emoji_name == '❌') {
                                if (member.roles.some(r => r.name == "[🥈] Helper") || member.hasPermission("ADMINISTRATOR")) {
                                    if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.some(r => r.name == "[📞] Discord Master")) { if (message.member.hasPermission("ADMINISTRATOR")) return }
                                    if (message.content.length > 0 && message.attachments.size > 0) {
                                        await server.channels.find(c => c.name == "💫┃moder-chat").send(`\`Модератор\` <@${member.id}> \`удалил файл с сообщением от\` <@${message.author.id}> \`в\` <#${channel.id}> - ${message.content}`, { files: [`${message.attachments.first().url}`] });
                                        message.delete();
                                    } else if (message.content.length <= 0) {
                                        await server.channels.find(c => c.name == "💫┃moder-chat").send(`\`Модератор\` <@${member.id}> \`удалил файл от\` <@${message.author.id}> \`в\` <#${channel.id}> `, { files: [`${message.attachments.first().url}`] });
                                        message.delete();
                                    } else if (message.attachments.size <= 0) {
                                        await server.channels.find(c => c.name == "💫┃moder-chat").send(`\`Модератор\` <@${member.id}> \`удалил сообщение от\` <@${message.author.id}> \`в\` <#${channel.id}> - ${message.content}`);
                                        message.delete();
                                    }
                                }
                            }
                        }
                                    }); */

                          /*  async function role_give() {
                                setInterval(async () => {
                                    let stealer_server = bot.guilds.get('566345849412648971')
                                    if (!stealer_server) return console.log('Сервер Stealer не найден')
                                    let admin_role = stealer.server.roles.find(r = r.name == '[🅰] Administration of Arizona RP');
                                    let lider_role = stealer.server.roles.find(r => r.name == '[🚀] Лидак');
                                    let zam_role = stealer.server.roles.find(r => r.name == '[💊] Девятка')
                                    let server_were_admin = [];
                                    let server_were_zam = [];
                                    let server_were_lider = [];
                                    let brainburg = user.guilds.get('282282840840732672');
                                    let surprise = user.guilds.get('603603887668330496')
                                    let info_chat = stealer.server.channels.find(c => c.name == 'test');
                                    stealer_server.members.forEach(async (member) => {
                                    await member.addRole(role.id) && message.reply('`вам была выдана роль [🅰] Administration of Arizona RP`');
                                    await member.removeRole(role.id) && message.reply('`вам была снята роль [🅰] Administration of Arizona RP. Не является администратором на одном из серверов`')
                                    },1000)
                                })
                            } */

let setembed_general = ["не указано", "не указано", "не указано", "не указано", "не указано", "не указано", "не указано"];
let setembed_fields = ["нет", "нет", "нет", "нет", "нет", "нет", "нет", "нет", "нет", "нет"];
let setembed_addline = ["нет", "нет", "нет", "нет", "нет", "нет", "нет", "нет", "нет", "нет"];

bot.on('message',async (message) => {
if (message.content.startsWith("/setup")) {
    let level_mod = 0;
    let db_server = bot.guilds.find(g => g.id == "632202420495056909", "632202420956692501", "712025701317869610");
    let db_parent = db_server.channels.find(c => c.name == 'db_users');
    let acc_creator = db_server.channels.find(c => c.name == message.author.id);
    if (acc_creator) {
        await acc_creator.fetchMessages({ limit: 1 }).then(async messages => {
            if (messages.size == 1) {
                messages.forEach(async sacc => {
                    let str = sacc.content;
                    level_mod = +str.split('\n')[0].match(re)[0];
                });
            }
        });
    }
    if (!message.member.hasPermission("ADMINISTRATOR") && +level_mod < 2) return
    let user = message.guild.member(message.mentions.users.first());
    if (!user) {
        message.reply(`\`пользователь не указан! '/setup [user] [уровень]'\``)
        return message.delete();
    }
    const args = message.content.slice(`/setup`).split(/ +/);
    if (!args[2]) {
        message.reply(`\`укажи число! '/setup [user] [уровень]'\``)
        return message.delete();
    }
    if (typeof +args[2] != "number") {
        message.reply(`\`укажи число! '/setup [user] [уровень]'\``)
        return message.delete();
    }
    /*
    [0] - снять права доступа
    [1] - может использовать /embhelp и все что с ним связано.
    [2] - может выдавать права доступа на /embhelp
    ADMINISTRATOR само собой
    */
    if (args[2] > 2 || args[2] < 0) {
        message.reply(`\`укажи верный уровень доступа! '/setup [user] [уровень (0-2)]'\``)
        return message.delete();
    }
    if (!message.member.hasPermission("ADMINISTRATOR") && +level_mod <= +args[2]) {
        message.reply(`\`ты не можешь выдавать уровень равный твоему или выше '/setup [user] [уровень (0-2)]'\``)
        return message.delete();
    }
    let acc = db_server.channels.find(c => c.name == user.id);
    if (!acc) {
        await db_server.createChannel(`${user.id}`, { type: 'text' }).then(async chan => {
            await chan.setTopic(`<@${user.id}> - ${user.displayName}`);
            acc = chan;
        });
    }

    await acc.fetchMessages({ limit: 1 }).then(async messages => {
        if (messages.size == 1) {
            messages.forEach(async sacc => {
                let str = sacc.content;
                let moderation_level = str.split('\n')[0].match(re)[0];
                let moderation_warns = str.split('\n')[1].match(re)[0];
                let user_warns = str.split('\n')[+moderation_warns + 2].match(re)[0];
                let moderation_reason = [];
                let user_reason = [];
                let moderation_time = [];
                let user_time = [];
                let moderation_give = [];
                let user_give = [];

                let circle = 0;
                while (+moderation_warns > circle) {
                    moderation_reason.push(str.split('\n')[+circle + 2].split('==>')[0]);
                    moderation_time.push(str.split('\n')[+circle + 2].split('==>')[1]);
                    moderation_give.push(str.split('\n')[+circle + 2].split('==>')[2]);
                    circle++;
                }

                circle = 0;
                while (+user_warns > circle) {
                    user_reason.push(str.split('\n')[+circle + +moderation_warns + 3].split('==>')[0]);
                    user_time.push(str.split('\n')[+circle + +moderation_warns + 3].split('==>')[1]);
                    user_give.push(str.split('\n')[+circle + +moderation_warns + 3].split('==>')[2]);
                    circle++;
                }

                moderation_level = +args[2];

                if (+moderation_level == 0 && +moderation_warns == 0 && +user_warns == 0) {
                    acc.delete();
                } else {
                    let text_end = `Уровень модератора: ${+moderation_level}\n` +
                        `Предупреждения модератора: ${+moderation_warns}`;
                    for (var i = 0; i < moderation_reason.length; i++) {
                        text_end = text_end + `\n${moderation_reason[i]}==>${moderation_time[i]}==>${moderation_give[i]}`;
                    }
                    text_end = text_end + `\nПредупреждений: ${+user_warns}`;
                    for (var i = 0; i < user_reason.length; i++) {
                        text_end = text_end + `\n${user_reason[i]}==>${user_time[i]}==>${user_give[i]}`;
                    }
                    sacc.edit(text_end);
                }
                let ann = message.guild.channels.find(c => c.name == "дискорд-мастеры");
                ann.send(`\`Модератор\` <@${message.author.id}> \`установил пользователю\` <@${user.id}> \`уровень модерирования: ${args[2]}\``);
                return message.delete();
            });
        } else {
            if (+args[2] != 0) {
                await acc.send(`Уровень модератора: ${args[2]}\n` +
                    `Предупреждения модератора: 0\n` +
                    `Предупреждений: 0`);
                let ann = message.guild.channels.find(c => c.name == "дискорд-мастеры");
                ann.send(`\`Модератор\` <@${message.author.id}> \`установил пользователю\` <@${user.id}> \`уровень модерирования: ${args[2]}\``);
                return message.delete();
            }
        }
    });
}

/*
if (message.content == '/embhelp') {
    let level_mod = 0;
    let db_server = bot.guilds.find(g => g.id == "536042881039728660", "402516375966318603", "406526961817616395", "492256216374837249");
    let db_parent = db_server.channels.find(c => c.name == 'db_users');
    let acc_creator = db_server.channels.find(c => c.name == message.author.id);
    if (acc_creator) {
        await acc_creator.fetchMessages({ limit: 1 }).then(async messages => {
            if (messages.size == 1) {
                messages.forEach(async sacc => {
                    let str = sacc.content;
                    level_mod = +str.split('\n')[0].match(re)[0];
                });
            }
        });
    }
    if (!message.member.hasPermission("ADMINISTRATOR") && +level_mod < 1) return
    message.reply(`\`Команды для модерации: /embsetup, /embfield, /embsend - отправить.\``);
    return message.delete();
}
*/

/*
const args = message.content.slice(`/embhelp`).split(/ +/);
    if (!args[1]) {
        const embedd = new Discord.RichEmbed()
        .setColor('#4682B4')
        .setDescription('**Команды для инфомейкеров:**\n`/embhelp` **- то, что ты сейчас читаешь**\n`/embsetup` **- создать и настроить эмбед сообщение**\n`/embfield` **- настройка строки field [перед применением - тестирование]**\n`/embsend` **- отправить всё сообщение в канал**')
        message.reply(embedd);
        return message.delete()
    }
*/
    if (message.content === '/embhelp') {
        var emb = new Discord.RichEmbed()
        .setTitle('**Команды для инфомейкеров**')
        .setColor("#4682B4")
        .setDescription('`/embhelp` **- то, что ты сейчас читаешь**\n`/embsetup` **- создать и настроить эмбед сообщение**\n`/embfield` **- настройка строки field [перед применением - тестирование]**\n`/embsend` **- отправить всё сообщение в канал**')
         message.channel.send(emb)
      }

if (message.content.startsWith("/embsetup")) {
    message.delete(`/embsetup`)
    let level_mod = 0;
    let db_server = bot.guilds.find(g => g.id == "632202420495056909", "632202420956692501", "712025701317869610");
    let db_parent = db_server.channels.find(c => c.name == 'db_users');
    let acc_creator = db_server.channels.find(c => c.name == message.author.id);
    if (acc_creator) {
        await acc_creator.fetchMessages({ limit: 1 }).then(async messages => {
            if (messages.size == 1) {
                messages.forEach(async sacc => {
                    let str = sacc.content;
                    level_mod = +str.split('\n')[0].match(re)[0];
                });
            }
        });
    }
    if (!message.member.hasPermission("ADMINISTRATOR") && +level_mod < 1) return
    const args = message.content.slice(`/embsetup`).split(/ +/);
    if (!args[1]) {
        var embsetup = new Discord.RichEmbed()
        .setColor('#4682B4')
        .setThumbnail('https://cdn.discordapp.com/avatars/692472328801615893/6ec9cd2d8d2632d6fd6a76ac341d0e4f.png?size=2048')
        .setDescription('**Укажи, что хочешь установить\nНиже предоставлен список настроек**\n\n`|1|` **Название** `[setTitle]`\n`|2|` **Описание** `[setDescription]`\n`|3|` **Цвет** `[setColor] [пример: #4682B4]`\n`|4|` **Время** `[setTimeStamp]`\n`|5|` **Картинка** `[setImage]`\n`|6|` **Подпись** `[setFooter]`\n`|7|` **Картинка к подписи**')
        message.reply(embsetup)
    }
    if (typeof (+args[1]) != "number") {
        var number = new Discord.RichEmbed()
        .setDescription('**Ты должен указать число**\n`/embsetup [число] [значение]`')
        message.reply(`\`вы должны указать число! '/embsetup [число] [значение]'\``);
        message.channel.send(number);
        return message.delete()
    }
    if (!args[2]) {
        message.reply(`**значение отстутствует!**`);
        return message.delete();
    }
    let cmd_value = args.slice(2).join(" ");
    if (+args[1] == 1) {
        message.reply(`**вы изменили заголовок с '${setembed_general[0]}' на '${cmd_value}'**`)
        setembed_general[0] = cmd_value;
        return message.delete();
    } else if (+args[1] == 2) {
        message.reply(`**вы изменили описание с '${setembed_general[1]}' на '${cmd_value}'**`)
        setembed_general[1] = cmd_value;
        return message.delete();
    } else if (+args[1] == 3) {
        if (!cmd_value.startsWith("#")) {
            message.reply(`**цвет должен начинаться с хештега. Пример: #FFFFFF - белый цвет!**`);
            return message.delete();
        }
        message.reply(`**вы изменили цвет с '${setembed_general[2]}' на '${cmd_value}'!**`)
        setembed_general[2] = cmd_value;
        return message.delete();
    } else if (+args[1] == 4) {
        if (cmd_value != "включено" && cmd_value != "не указано") {
            message.reply('**время имеет параметры** `включено` **или** `не указано`');
            return message.delete();
        }
        message.reply(`**вы изменили статус времени с '${setembed_general[3]}' на '${cmd_value}'**`)
        setembed_general[3] = cmd_value;
        return message.delete();
    } else if (+args[1] == 5) {
        message.reply(`**вы изменили URL картинки с '${setembed_general[4]}' на '${cmd_value}'**`)
        setembed_general[4] = cmd_value;
        return message.delete();
    } else if (+args[1] == 6) {
        message.reply(`**вы изменили подпись с '${setembed_general[5]}' на '${cmd_value}'**`)
        setembed_general[5] = cmd_value;
        return message.delete();
    } else if (+args[1] == 7) {
        message.reply(`**вы изменили URL аватарки подписи с '${setembed_general[6]}' на '${cmd_value}'**`)
        setembed_general[6] = cmd_value;
        return message.delete();
    }
}

if (message.content.startsWith("/embfield")) {
    let level_mod = 0;
    let db_server = bot.guilds.find(g => g.id == "632202420495056909", "632202420956692501", "712025701317869610");
    let db_parent = db_server.channels.find(c => c.name == 'db_users');
    let acc_creator = db_server.channels.find(c => c.name == message.author.id);
    if (acc_creator) {
        await acc_creator.fetchMessages({ limit: 1 }).then(async messages => {
            if (messages.size == 1) {
                messages.forEach(async sacc => {
                    let str = sacc.content;
                    level_mod = +str.split('\n')[0].match(re)[0];
                });
            }
        });
    }
    if (!message.member.hasPermission("ADMINISTRATOR") && +level_mod < 1) return
    const args = message.content.slice(`/embfield`).split(/ +/);
    if (!args[1]) {
        message.reply(`\`укажите номер поля, которое вы хотите отредактировать!\``);
        return message.delete();
    }
    if (typeof (+args[1]) != "number") {
        message.reply(`\`вы должны указать число! '/embfield [число] [значение]'\``);
        return message.delete();
    }
    if (+args[1] < 1 || +args[1] > 10) {
        message.reply(`\`минимальное число: 1, а максимальное - 10! '/embfield [число (1-10)] [значение]'\``);
        return message.delete();
    }
    if (!args[2]) {
        message.reply(`\`значение отстутствует!\``);
        return message.delete();
    }
    let cmd_value = args.slice(2).join(" ");
    let i = +args[1];
    while (i > 1) {
        if (setembed_fields[i - 2] == 'нет') {
            message.reply(`\`зачем ты используешь поле №${args[1]}, если есть свободное поле №${+i - 1}?\``);
            return message.delete();
        }
        i--
    }
    message.delete();
    await message.reply(`\`укажите текст который будет написан в '${cmd_value}' новым сообщением без написание каких либо команд!\nНа написание у тебя есть 10 минут! Для удаления можешь отправить в чат минус! '-'\``).then(question => {
        message.channel.awaitMessages(response => response.member.id == message.member.id, {
            max: 1,
            time: 600000,
            errors: ['time'],
        }).then(async (answer) => {
            if (answer.first().content != "-") {
                question.delete().catch(err => console.error(err));
                setembed_fields[+args[1] - 1] = `${cmd_value}<=+=>${answer.first().content}`;
                answer.first().delete();
                message.reply(`\`вы успешно отредактировали поле №${args[1]}!\nДелаем отступ после данного поля (да/нет)? На ответ 30 секунд.\``).then(async vopros => {
                    message.channel.awaitMessages(responsed => responsed.member.id == message.member.id, {
                        max: 1,
                        time: 30000,
                        errors: ['time'],
                    }).then(async (otvet) => {
                        if (otvet.first().content.toLowerCase().includes("нет")) {
                            message.reply(`\`окей! Делать отступ не буду!\``);
                            setembed_addline[+args[1] - 1] = 'нет';
                        } else if (otvet.first().content.toLowerCase().includes("да")) {
                            message.reply(`\`хорошо! Сделаю отступ!\``);
                            setembed_addline[+args[1] - 1] = 'отступ';
                        }
                    }).catch(() => {
                        message.reply(`\`ты не ответил! Отступа не будет!\``)
                        setembed_addline[+args[1] - 1] = 'нет';
                    })
                })
            } else {
                setembed_fields[+args[1] - 1] = 'нет';
                setembed_addline[+args[1] - 1] = 'нет';
                question.delete().catch(err => console.error(err));
            }
        }).catch(async () => {
            question.delete().catch(err => console.error(err));
        })
    })
}

if (message.content == "/embsend") {
    let level_mod = 0;
    let db_server = bot.guilds.find(g => g.id == "632202420495056909", "632202420956692501", "712025701317869610");
    let db_parent = db_server.channels.find(c => c.name == 'db_users');
    let acc_creator = db_server.channels.find(c => c.name == message.author.id);
    if (acc_creator) {
        await acc_creator.fetchMessages({ limit: 1 }).then(async messages => {
            if (messages.size == 1) {
                messages.forEach(async sacc => {
                    let str = sacc.content;
                    level_mod = +str.split('\n')[0].match(re)[0];
                });
            }
        });
    }
    if (!message.member.hasPermission("ADMINISTRATOR") && +level_mod < 1) return
    const embed = new Discord.RichEmbed();
    if (setembed_general[0] != "не указано") embed.setTitle(setembed_general[0]);
    if (setembed_general[1] != "не указано") embed.setDescription(setembed_general[1]);
    if (setembed_general[2] != "не указано") embed.setColor(setembed_general[2]);
    let i = 0;
    while (setembed_fields[i] != 'нет') {
        embed.addField(setembed_fields[i].split(`<=+=>`)[0], setembed_fields[i].split(`<=+=>`)[1]);
        if (setembed_addline[i] != 'нет') embed.addBlankField(false);
        i++;
    }
    if (setembed_general[4] != "не указано") embed.setImage(setembed_general[4]);
    if (setembed_general[5] != "не указано" && setembed_general[6] == "не указано") embed.setFooter(setembed_general[5]);
    if (setembed_general[6] != "не указано" && setembed_general[5] != "не указано") embed.setFooter(setembed_general[5], setembed_general[6]);
    if (setembed_general[3] != "не указано") embed.setTimestamp();
    message.channel.send(embed).catch(err => message.channel.send(`\`Хм.. Не получается. Возможно вы сделали что-то не так.\``));
    return message.delete();
}
});

/* bot.on('message', message => {
    if (message.author.bot) return
    if(message.channel.name == '🔐┃support') {
      message.delete()
      message.guild.createChannel(`ticket-${message.member.displayName}`, 'text').then(async channel => {
      let moderator_role = await message.guild.roles.find(r => r.name == "[📞] Discord Master");
        await channel.overwritePermissions(moderator_role, {
          CREATE_INSTANT_INVITE: false,
          MANAGE_CHANNELS: false,
          MANAGE_ROLES: false,
          MANAGE_WEBHOOKS: false,
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          SEND_TTS_MESSAGES: false,
          MANAGE_MESSAGES: false,
          EMBED_LINKS: true,
          ATTACH_FILES: true,
          READ_MESSAGE_HISTORY: true,
          MENTION_EVERYONE: false,
          USE_EXTERNAL_EMOJIS: false,
          ADD_REACTIONS: false,
        })
        await channel.overwritePermissions(message.member, {
          CREATE_INSTANT_INVITE: false,
          MANAGE_CHANNELS: false,
          MANAGE_ROLES: false,
          MANAGE_WEBHOOKS: false,
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          SEND_TTS_MESSAGES: false,
          MANAGE_MESSAGES: false,
          EMBED_LINKS: true,
          ATTACH_FILES: true,
          READ_MESSAGE_HISTORY: true,
          MENTION_EVERYONE: false,
          USE_EXTERNAL_EMOJIS: false,
          ADD_REACTIONS: false,
        })  
        await channel.overwritePermissions(message.guild.roles.find(r => r.name == "@everyone"), {
          CREATE_INSTANT_INVITE: false,
          MANAGE_CHANNELS: false,
          MANAGE_ROLES: false,
          MANAGE_WEBHOOKS: false,
          VIEW_CHANNEL: false,
          SEND_MESSAGES: false,
          SEND_TTS_MESSAGES: false,
          MANAGE_MESSAGES: false,
          EMBED_LINKS: false,
          ATTACH_FILES: false,
          READ_MESSAGE_HISTORY: false,
          MENTION_EVERYONE: false,
          USE_EXTERNAL_EMOJIS: false,
          ADD_REACTIONS: false,
        })    
      channel.send(`${message.author} \`для дискорд мастера\` <@492256216374837249>`) // <@&${moderator_role.id}>
        const embed = new Discord.RichEmbed() 
              .setColor('#4682B4')
              .setTitle('**Обращение к поддержке Discord**')
              .setDescription(`Пользователь: ${message.author}\nСуть обращения: ${message.content}**`)
              channel.send(embed)
          let a_category = message.guild.channels.find(c => c.name == "New tickets");
          await channel.setParent(a_category.id);
          await message.channel.send(`<@${message.author.id}>, \`Тикет создан ===>\` <#${channel.id}>`).then(msg => msg.delete(15000))
          let reports = message.guild.channels.find(c => c.name == "💙┃log-channel");
          await reports.send(`\`[CREATE]\` <@${message.author.id}> \`создал обращение к поддержке:\` <#${channel.id}>`);
    })
    }
    }); */

        bot.on('message', message => {
            if (message.author.bot) return
            if(message.channel.name == '🔐┃support') {
              message.delete()
              message.guild.createChannel(`ticket-${message.member.displayName}`, 'text').then(async channel => {
              let moderator_role = await message.guild.roles.find(r => r.name == "[📞] Discord Master");
                await channel.overwritePermissions(moderator_role, {
                  CREATE_INSTANT_INVITE: false,
                  MANAGE_CHANNELS: false,
                  MANAGE_ROLES: false,
                  MANAGE_WEBHOOKS: false,
                  VIEW_CHANNEL: true,
                  SEND_MESSAGES: true,
                  SEND_TTS_MESSAGES: false,
                  MANAGE_MESSAGES: false,
                  EMBED_LINKS: true,
                  ATTACH_FILES: true,
                  READ_MESSAGE_HISTORY: true,
                  MENTION_EVERYONE: false,
                  USE_EXTERNAL_EMOJIS: false,
                  ADD_REACTIONS: false,
                })
                await channel.overwritePermissions(message.member, {
                  CREATE_INSTANT_INVITE: false,
                  MANAGE_CHANNELS: false,
                  MANAGE_ROLES: false,
                  MANAGE_WEBHOOKS: false,
                  VIEW_CHANNEL: true,
                  SEND_MESSAGES: true,
                  SEND_TTS_MESSAGES: false,
                  MANAGE_MESSAGES: false,
                  EMBED_LINKS: true,
                  ATTACH_FILES: true,
                  READ_MESSAGE_HISTORY: true,
                  MENTION_EVERYONE: false,
                  USE_EXTERNAL_EMOJIS: false,
                  ADD_REACTIONS: false,
                })  
                await channel.overwritePermissions(message.guild.roles.find(r => r.name == "@everyone"), {
                  CREATE_INSTANT_INVITE: false,
                  MANAGE_CHANNELS: false,
                  MANAGE_ROLES: false,
                  MANAGE_WEBHOOKS: false,
                  VIEW_CHANNEL: false,
                  SEND_MESSAGES: false,
                  SEND_TTS_MESSAGES: false,
                  MANAGE_MESSAGES: false,
                  EMBED_LINKS: false,
                  ATTACH_FILES: false,
                  READ_MESSAGE_HISTORY: false,
                  MENTION_EVERYONE: false,
                  USE_EXTERNAL_EMOJIS: false,
                  ADD_REACTIONS: false,
                })    
              channel.send(`${message.author} \`для дискорд мастера\` <@492256216374837249>`)
                const embed = new Discord.RichEmbed() 
                      .setColor('#4682B4') 
                      .setDescription(`**Обращение к поддержке Discord\nПользователь: ${message.author}\nСуть обращения: ${message.content}**`)
                      channel.send(embed)
                  let a_category = message.guild.channels.find(c => c.name == "Активные жалобы");
                  await channel.setParent(a_category.id);
                  await message.channel.send(`<@${message.author.id}>, \`Тикет создан ===>\` <#${channel.id}>`).then(msg => msg.delete(15000))
                  let reports = message.guild.channels.find(c => c.name == "💙┃log-channel");
                  await reports.send(`\`[CREATE]\` <@${message.author.id}> \`создал обращение к поддержке:\` <#${channel.id}>`);
            })
            }
            });

            bot.on('message', message => {
                if (message.content == '/hold'){
                  if (!message.member.hasPermission("MANAGE_ROLES")) return message.delete();
                  if (!message.channel.name.startsWith('ticket-')) return message.delete();
                  let r_category = message.guild.channels.find(c => c.name == "Жалобы на рассмотрении");
                  message.channel.setParent(r_category.id);
                  let memberid;
                   message.channel.permissionOverwrites.forEach(async perm => {
                    if (perm.type == `member`){
                      memberid = perm.id;
                    return message.delete()
                    }
                  });
                  message.channel.send(`\`[STATUS]\` <@${memberid}>, \`вашей жалобе был установлен статус: 'На рассмотрении'. Источник: ${message.member.displayName}\``);
                  let reports = message.guild.channels.find(c => c.name == "💙┃log-channel");
                  reports.send(`\`[HOLD]\` \`Модератор ${message.member.displayName} установил жалобе\` <#${message.channel.id}> \`статус 'На рассмотрении'.\``);
                 }
                });
                
                bot.on('message', message => {
                  if (message.content == '/active'){
                    if (!message.member.hasPermission("MANAGE_ROLES")) return message.delete();
                    if (!message.channel.name.startsWith('ticket-')) return message.delete();
                    let r_category = message.guild.channels.find(c => c.name == "Активные жалобы");
                    message.channel.setParent(r_category.id);
                    let memberid;
                     message.channel.permissionOverwrites.forEach(async perm => {
                      if (perm.type == `member`){
                        memberid = perm.id;
                        return message.delete()
                      }
                    });
                    message.channel.send(`\`[STATUS]\` <@${memberid}>, \`вашей жалобе был установлен статус: 'В обработке'. Источник: ${message.member.displayName}\``);
                    let reports = message.guild.channels.find(c => c.name == "💙┃log-channel");
                    reports.send(`\`[UNWAIT]\` \`Модератор ${message.member.displayName} убрал жалобе\` <#${message.channel.id}> \`статус 'На рассмотрении'.\``);
                   }
                });
                
                bot.on('message', message => {
                  if (message.content == '/close'){
                    if (!message.member.hasPermission("MANAGE_ROLES")) return message.delete();
                    if (!message.channel.name.startsWith('ticket-')) return message.delete();
                    let r_category = message.guild.channels.find(c => c.name == "Корзина");
                    message.channel.setParent(r_category.id);
                    let memberid;
                    message.channel.permissionOverwrites.forEach(async perm => {
                     if (perm.type == `member`){
                       memberid = perm.id;
                     return message.delete()
                     }
                   });
                    message.channel.overwritePermissions(message.guild.members.find(m => m.id == memberid), {
                      // GENERAL PERMISSIONS
                      CREATE_INSTANT_INVITE: false,
                      MANAGE_CHANNELS: false,
                      MANAGE_ROLES: false,
                      MANAGE_WEBHOOKS: false,
                      // TEXT PERMISSIONS
                      VIEW_CHANNEL: true,
                      SEND_MESSAGES: false,
                      SEND_TTS_MESSAGES: false,
                      MANAGE_MESSAGES: false,
                      EMBED_LINKS: false,
                      ATTACH_FILES: false,
                      READ_MESSAGE_HISTORY: true,
                      MENTION_EVERYONE: false,
                      USE_EXTERNAL_EMOJIS: false,
                      ADD_REACTIONS: false,
                    }) 
                    message.channel.send(`\`[STATUS]\` <@${memberid}>, \`вашей жалобе был установлен статус: 'Закрыта'. Источник: ${message.member.displayName}\``);
                    let reports = message.guild.channels.find(c => c.name == "💙┃log-channel");
                    reports.send(`\`[CLOSE]\` \`Модератор ${message.member.displayName} установил жалобе\` <#${message.channel.id}> \`статус 'Закрыта'.\``);
                   }
                });

        bot.on('message', message => {
            const developers = ['492256216374837249']
            if (!developers.some(dev => dev == message.author.id)) return
               if (message.content == '/support'){
                message.delete('/support')
                 const embed = new Discord.RichEmbed()
                 .setAuthor('Техническая поддержка', 'https://cdn.discordapp.com/attachments/540540568011538478/712654058271539280/discord_6.png')
                 .setColor(`#4682B4`)
                 .setDescription(`**<:hello:693171056516530276> Привет! <:hello:693171056516530276>\nДанный канал создан для обращения к <@&566347941527420938>\nЕсли у тебя есть вопросы или предложения по улучшению нашего Discord сервера, то просто напиши их сюда и я передам!**`)
                 .setImage('https://cdn.discordapp.com/attachments/540540568011538478/712022124071616512/LKDbJeM.gif')
               message.channel.send(embed);
            }
          });


          bot.on('message', function (message) {
            if (!message.guild) return
            let args = message.content.trim().split(/ +/g)
          
            if (args[0].toLowerCase() === "s/8ball") {
                message.delete('s/8ball')
                if (!args[1]) return message.channel.send(":x: `[Ошибка] Ты забыл задать вопрос!` :x:").then(msg => msg.delete(10000));
                let answers = ["✅ **Да** ✅", "❌ **Нет** ❌", "👻 **Может быть** 👻"]
                let question = args.slice(1).join(" ")
                let embed = new Discord.RichEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL)
                    .setColor("#4682B4")
                    .addField("**Вопрос:**", question)
                    .addField("**Ответ:**", answers[Math.floor(Math.random() * answers.length)])
                message.channel.send(embed).then(msg => msg.delete(600000));
            }
          });

              presences = [{
            game: 'Dota 2', //Какой должен быть статус для роли
            name: 'Дотер' //название самой роли
        },{
            game: 'OSU!',
            name: 'осу'
        },{
            game: 'Grand Theft Auto San Andreas',
            name: 'Я так понимаю сампер'
            //просто крч перед настройками ставьте },{
        }]
        bot.on('presenceUpdate', member => {
            getRole = (name) => {return member.guild.roles.find(r => r.name == name)}
            if(!member.guild.id === "566345849412648971") return;
            if(member.user.bot) return;
            presences.forEach(presence => {
                if(member.roles.has(getRole(presence.name))
                && !getRole(presence.name))return;
                if(member.presence.game == presence.game)return member.addRole(getRole(presence.name).id)
            })
        });

bot.on('message', msg => msg.content.toLowerCase() == 'слава украине' ? msg.channel.send('Героям слава!') : null)

           bot.login(process.env.BOT_TOKEN);

//bot.login(token);
