const moment = require('moment');
const Discord = require('discord.js');
function checkDays(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? " day" : " days") + " ago";
};
module.exports.run = async (client, message, args) => {
  let user = message.mentions.users.first();
  let muser = message.guild.member(message.mentions.users.first());
  if(!message.mentions.users.first() && args.lenth > 0){
    user = message.guild.member(args[0]).user
    muser = message.guild.member(args[0]);
  }
  if (!muser) muser = message.member;
  if(!user) user = message.author;

  let status = ""
  if(status === null) status = "Без игры"
  if(muser.presence.activities[0].type == 'CUSTOM_STATUS'){
    let cstatus = muser.presence.activities[0].state
    if(muser.presence.activities[0].emoji) {
      if(muser.presence.activities[0].emoji.animated == true){
        cstatus = `<a:${muser.presence.activities[0].emoji.name}:${muser.presence.activities[0].emoji.id}> ${cstatus}`
      }
      if(muser.presence.activities[0].emoji.animated !== true){
        cstatus = `<:${muser.presence.activities[0].emoji.name}:${muser.presence.activities[0].emoji.id}>${cstatus}`
      }
    }
    status = `Custom Status:\n${cstatus}\nApp:\n${muser.presence.activities[1].name}`
  }else{
    status = `${muser.presence.activities[0].type.toLowerCase()}: ${muser.presence.activities[0].name}`
  }

  const embed = new Discord.MessageEmbed();
  embed.addField("Имя", `${user.username}#${user.discriminator}`, true)
          .addField("ID", `${user.id}`, true)
          .setColor(3447003)
          .setThumbnail(`${user.avatarURL()}`)
          .setTimestamp()
          .setURL(`${user.avatarURL()}`)
          .addField('В настоящее время', `${muser.presence.status.toUpperCase()}`, true)
          .addField('Игра', status, true)
          .addField('Создал аккаунт', `${moment(user.createdAt).toString().substr(0, 15)}\n(${moment(user.createdAt).fromNow()})`, true)
          .addField('Зашёл на сервер', `${moment(muser.joinedAt).toString().substr(0, 15)}\n(${moment(muser.joinedAt).fromNow()})`, true)
          .addField('Роли', `${muser.roles.cache.array()}`, true)
          .addField('Это бот?', `${user.bot.toString().toUpperCase()}`, true)
      message.channel.send({embed});
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: 'user',
  description: 'Displays information about a user.',
  usage: 'user <@user>'
};
