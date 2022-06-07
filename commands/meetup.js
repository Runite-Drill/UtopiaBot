const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, MessageActionRow, TextInputComponent } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('meetup')
    .setDescription('Propose a time and a place to meetup with another user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user you want to meet with')
        .setRequired(true)),
  async execute(interaction) {
    const modal = new Modal()
      .setCustomId('meetupModal')
      .setTitle(`Propose a Meeting with ${interaction.options.getUser('user').username}`);

    const dateInput = new TextInputComponent()
      .setCustomId('dateInput')
      .setLabel('When would you like to meet?')
      .setStyle('SHORT')
      .setRequired(true)

    const timeInput = new TextInputComponent()
      .setCustomId('timeInput')
      .setLabel('At what time?')
      .setStyle('SHORT')
      .setRequired(true)

    const locationInput = new TextInputComponent()
      .setCustomId('locationInput')
      .setLabel('Which coffee shop?')
      .setStyle('SHORT')
      .setRequired(false)

    const messageInput = new TextInputComponent()
      .setCustomId('messageInput')
      .setLabel('Include a message (Optional)')
      .setStyle('PARAGRAPH')
      .setRequired(false)
      .setValue('hello!')

    const firstActionRow = new MessageActionRow().addComponents(dateInput)
    const secondActionRow = new MessageActionRow().addComponents(timeInput)
    const thirdActionRow = new MessageActionRow().addComponents(locationInput)
    const fourthActionRow = new MessageActionRow().addComponents(messageInput)

    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);

    await interaction.showModal(modal);
  }
} 

