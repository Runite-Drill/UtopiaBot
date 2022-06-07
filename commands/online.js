const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('online')
    .setDescription('Shows whos currently online!'),
  async execute(interaction) {
    // First use guild.members.fetch to make sure all members are cached
    const fetchedMembers = await interaction.guild.members.fetch({ withPresences: true })
    const totalOnline = fetchedMembers.filter(member => member.presence?.status === 'online');

    const membersOnline = totalOnline.map(member => member.user)
    await interaction.reply(`Currently online:\n${membersOnline}`)
  }
}







