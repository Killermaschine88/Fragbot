const Discord = require('discord.js')
const { blacklisted_words } = require('../../constants/bot/words.js')

module.exports = {
  name: "message",
  async execute(message, bot, client) {
    //skipping blacklisted words
    for(const word of blacklisted_words) {
      if(message.toString().includes(word)) return
    }
    
    //sending to discord
    client.channels.cache.get('954359553842098196').send({embeds: [new Discord.MessageEmbed().setDescription(`${message.toString()}`).setTimeStamp()]})
  }
}