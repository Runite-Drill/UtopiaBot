const { SlashCommandBuilder } = require('@discordjs/builders');
const moment = require('moment')

module.exports = {
  data: new SlashCommandBuilder()
  .setName('server')
  .setDescription('Replies with server info!'),
  async execute(interaction) {
    await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}\nCreated on: ${moment(interaction.guild.createdAt).format('ddd, MMM Do YYYY, h:mm:ss a')}`)
  }
}