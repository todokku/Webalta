const Discord  = require('discord.js');

const agree    = "✅";
const disagree = "❎";

module.exports.run = async (bot, message, args) => {
  if(!args || args[0] === 'help') return message.reply('`Используй: s/votes <опрос>` <:err:715285004657229896>')
  let question = message.content.split(" ").splice(1).join(" ")
  if(question.length < 1){
    let msg = await message.channel.send('`Голосуйте! Время голосования: 2 минуты`');
    await msg.react(agree);
    await msg.react(disagree);

    const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 120000});
    msg.delete();

    var NO_Count = reactions.get(disagree).count;
    var YES_Count = reactions.get(agree);

    if(YES_Count == undefined){
      var YES_Count = 1;
    }else{
      var YES_Count = reactions.get(agree).count;
    }

    var sumsum = new Discord.MessageEmbed()

              .addField("Голосование закончилось:", "----------------------------------------\n" +
                                            "Общее число голосов (Yes): " + `${YES_Count-1}\n` +
                                            "Общее число голосов (NO): " + `${NO_Count-1}\n` +
                                            "----------------------------------------", true)

              .setColor("#4682B4")
    await message.channel.send({embed: sumsum});
  }else if(question.length > 1){
    let msg = await message.channel.send(`Question: ${question} \nVote now! (Vote time: 2min)`);
    await msg.react(agree);
    await msg.react(disagree);
    
    const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 120000});
    msg.delete();
    
    var NO_Count = reactions.get(disagree).count;
    var YES_Count = reactions.get(agree);
    
    if(YES_Count == undefined){
      var YES_Count = 1;
    }else{
      var YES_Count = reactions.get(agree).count;
    }
  
    var sumsum = new Discord.MessageEmbed()
    
              .addField("Голосование закончилось:", "----------------------------------------\n" +
                                            "Опрос: " + question + "\n" +
                                            "Общее число голосов (Yes): " + `${YES_Count-1}\n` +
                                            "Общее число голосов (NO): " + `${NO_Count-1}\n` +
                                            "----------------------------------------", true)
  
              .setColor("#4682B4")
    await message.channel.send({embed: sumsum});
  }
  

}

module.exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  module.exports.help = {
    name: 'votes',
    description: 'Vote for the message above.',
    usage: 'votes'
  };
  
