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
