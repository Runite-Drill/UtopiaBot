const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dm-me')
    .setDescription('CoffeeChatBot will send you a DM!'),
  async execute(interaction) {
    await interaction.user.send(`Hello ${interaction.user}! Let's go get some coffee sometime!`)
    await interaction.reply(`${interaction.user} check your DMs!`)
  }
}


