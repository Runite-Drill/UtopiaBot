const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRandomIceBreaker } = require('../api/index')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ice')
		.setDescription('Provides a great ice breaker question for your coffee chat'),
	async execute(interaction) {
		const iceBreakerQuestion = getRandomIceBreaker();
    await interaction.reply(`${interaction.user} is wondering:\n\n${iceBreakerQuestion}`)
	},
};
