const Discord = require('discord.js');
module.exports.run = async (bot,message,args) => {
var role = message.mentions.roles.first();
var member = message.mentions.members.first();
var arg = new Array()
arg[0] = member
arg[1] = role
if(!arg[0]) return message.channel.send('Укажите участника')
if(!arg[1])return message.channel.send('Укажите роль')
member.addRole(role)
message.channel.send(`${member.user.username} получил роль ${role}`)
}
module.exports.help = {
    name: 'addrole'
}
