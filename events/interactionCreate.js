const { MessageActionRow, MessageButton, Message } = require('discord.js');

const handleModalSubmit = async(interaction) => {

  if (interaction.customId === 'meetupModal') {
    const date = interaction.fields.getTextInputValue('dateInput');
    const time = interaction.fields.getTextInputValue('timeInput');
    const location = interaction.fields.getTextInputValue('locationInput');
    const message = interaction.fields.getTextInputValue('messageInput');

    const meetingEmbed = {
      color: 0xb18f6a,
      title: 'New Coffee Chat Requested',
      author: {
        name: interaction.user.username,
        icon_url: interaction.user.avatarURL(),
      },
      description: `${interaction.user.username} would like to grab coffee with you! You can use the buttons below to respond to this request.`,
      image: {
        url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y29mZmVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700'
      },
      fields: [
        {
          name: 'Date',
          value: date,
          inline: true,
        },
        {
          name: 'Time',
          value: time,
          inline: true,
        },
        {
          name: 'Location',
          value: location,
          inline: true,
        },
        {
          name: 'Message',
          value: message,
        }
      ]
    }

    const buttons = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('Accept')
        .setLabel('Accept')
        .setStyle('SUCCESS')
        .setEmoji('✅'),

      new MessageButton()
        .setCustomId('Reject')
        .setLabel('Reject')
        .setStyle('DANGER')
        .setEmoji('✖️'),

      new MessageButton()
        .setCustomId('Edit')
        .setLabel('Edit')
        .setStyle('SECONDARY')
        .setEmoji('✏️'),
    )

    await interaction.channel.send({ embeds: [meetingEmbed], components: [buttons] });
    await interaction.reply('Thanks for booking a coffee chat!')

    const filter = i => ((i.customId === "Accept") || (i.customId === "Reject")) /*&& i.user.id === message.author.id */
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 })

    collector.on('collect', async (i) => {
      buttons.components[0].setDisabled(true);
      buttons.components[1].setDisabled(true);
      buttons.components[2].setDisabled(true);
      
      let update = '';
      if (i.customId === 'Accept') {
        update = 'Accepted!'
      } else if (i.customId === 'Reject') {
        update = 'Rejected :('
      }

      await i.update({ embeds: [meetingEmbed], components: [buttons], content: update })

    })

  }
}

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    console.log(
      `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
    );

    if (interaction.isModalSubmit()) {
      handleModalSubmit(interaction)
      return
    }
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
  
    if (!command) return;
  
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
