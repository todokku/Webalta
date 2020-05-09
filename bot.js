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
      bot.user.setActivity(`за Стиллерами\n                        👀`, { type: "WATCHING" });
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
