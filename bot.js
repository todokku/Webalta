const Discord = require('discord.js');
const bot = new Discord.Client();
bot.on('ready', () => {
    console.log('I am ready!');
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
    if(jsfiles.length <=0) console.log("Коктейля намешай! У меня кончился, как и команды...");
    console.log(`Многовато ты коктейля намешал! Я выпил ${jsfiles.length} бочек!`);
    jsfiles.forEach((f,i) =>{
        let props = require(`./cmds/${f}`);
        console.log(`Я выпил: ${i+1}.${f}`);
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
    
bot.on('ready', () => {
    console.log(`Выполнен вход как ${bot.user.username}`);
    bot.generateInvite(["ADMINISTRATOR"]).then(link =>{
        console.log(link);
        setInterval(() => {
      bot.user.setActivity(`за Стиллерами 👀`, { type: "WATCHING" });
      bot.user.setActivity('инструкции и приказы\n               (╯°□°）╯', { type: "LISTENING" });
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

                     bot.on('message', message => {
                     if (!message.guild) return;
                     if (message.content.startsWith(`<@692472328801615893> тест`)) {
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

           bot.login(process.env.BOT_TOKEN);

//bot.login(token);
