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

    
bot.on('ready', () => {
    console.log(`Выполнен вход как ${bot.user.username}`);
    bot.generateInvite(["ADMINISTRATOR"]).then(link =>{
        console.log(link);
        setInterval(() => {
      bot.user.setActivity(`за Стиллерами\n                        👀`, { type: "WATCHING" });
      bot.user.setActivity('инструкции и приказы\n               (╯°□°）╯', { type: "LISTENING" });
    }, 5000)


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


  bot.on('guildMemberAdd', async member => { 
    let role = member.guild.roles.find(r => r.name == '[💖] New user')
    await member.addRole(role.id)
  })

var mysql = require('mysql');
console.log('[MYSQL] Подключение...');
var conn = mysql.createConnection({ 
database: 'stealer', 
host: "db4free.net", 
user: "oliverstealer", 
password: "qaz12345"

conn.connect(function(err) { 
if (err) throw err; 
console.log("[MYSQL] База данных подключена!");

  
bot.on("message", (message) => { 
    if (message.channel.id == '566345849412648971' || message.channel.id == '649274423605723163') {
    if(message.content == "s/test1")
    { 
    message.reply('**❓ привет! Первый вопрос: что написано в правилах "Общие правила" под пунктом 8? ❓**');
    } 
    }

    bot.on("message", (message) => { 
        if(message.content == "t1 8. Токсики, можете выходить из сервера сразу")
    { 
    message.reply("**✅ молодец, правильно! Переходи к следующему вопросу при помощи команды** `s/test2` ✅");
    } 

  
    bot.on("message", (message) => { 
        if (message.channel.id == '566345849412648971' || message.channel.id == '649274423605723163') {
      if(message.content == "s/test2")
      { 
      message.reply('**❓ разрешено ли флудить сообщениями? ❓**');
      } 
    }

      bot.on("message", (message) => { 
      if(message.content == "t2 нет")
      { 
      message.reply("**✅ правильно! Переходи к следующему вопросу при помощи команды** `s/test3` ✅");
      } 
      });       bot.on("message", (message) => { 
        if(message.content == "t2 да")
        { 
        message.reply("**фу, флудер** 😢");
        } 

        
    bot.on("message", (message) => { 
    if (message.channel.id == '566345849412648971' || message.channel.id == '649274423605723163') {
    if(message.content == "s/test3")
    { 
    message.reply('**❓ разрешено ли пиарить другие Discord сервера? ❓**');
    } 
      }

    bot.on("message", (message) => { 
    if(message.content == "t3 нет")
    { 
    message.reply("✅ **правильно! А теперь пропиши последнюю команду** `s/test4` ✅");
    } 
    bot.on("message", (message) => { 
      if(message.content == "t3 запрещено")
      { 
      message.reply("✅ **правильно! А теперь пропиши последнюю команду** `s/test4` ✅");
      } 

    bot.on("message", (message) => { 
    if(message.content == "t3 да")
    { 
    message.reply("**эй...пиар запрещён** ⛔");
    } 

  
   bot.on("message", (message) => { 
    if (message.channel.id == '566345849412648971' || message.channel.id == '649274423605723163') {
    if(message.content == "s/test4")
    { 
    message.reply('**📨 молодец, все вопросы пройдены! Ожидай пока <@&566347941527420938> выдаст тебе доступ в остальным каналам 📨**');
    } 
      }

  
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

    
      bot.on('message', message => {
        if (!message.guild) return;
        if (message.content.startsWith(`s/timer`)) {
        setInterval(() => {
            message.channel.send('```asciidoc\n= Привет! =\n```\n`Мы старались и написали` <#586643283862749212> `для дискорд сервера! Так же всю полезную информацию ты можешь найти в канале` <#613499980497551370> 🧸')
        return message.delete()
             }, 43200000)
           }


        bot.on('message', message => {
            if (!message.guild) return;
            if (message.content.startsWith(`s/timer`)) {
            setInterval(() => {
            message.channel.send('```asciidoc\n= Привет! =\n```\n`Если у тебя есть вопросы по дискорд серверу или же предложения по тому, как улучшить его, то можешь их написать в канал` <#630149890089025536>\n`Нужно просто нажать на реакцию и перейти в созданный канал` 🎈');
            return message.delete()
                 }, 86400000)
               }


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
bot.login(process.env.BOT_TOKEN);
