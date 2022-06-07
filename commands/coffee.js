const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRandomIceBreaker } = require('../api/index')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coffee')
    .setDescription('Starts a coffee chat with another online user in this server'),
  async execute(interaction) {
    // Get online members
    const fetchedMembers = await interaction.guild.members.fetch({ withPresences: true })
    const totalOnline = fetchedMembers.filter(member => member.presence?.status === 'online' && !member.user.bot);
    const membersOnline = totalOnline.map(member => member)

    // set user1 to current user
    const user1 = interaction.user
    
    // remove current user to avoid matching with themselves
    membersOnline.splice(membersOnline.findIndex(member => member.id === user1.id), 1)

    // randomly select user2
    const user2 = membersOnline.splice(Math.floor(Math.random() * membersOnline.length), 1)[0]
    console.log(user2.presence?.status)

    // Create new thread
    const thread = await interaction.channel.threads.create({
      name: `${user1.username} - ${user2.displayName}`,
      autoArchiveDuration: 'MAX',
      reason: 'For quick coffee chats',
    });

    // Add each member
    await thread.members.add(user1.id);
    await thread.members.add(user2.id);

    // Send welcome message and ice breaker question to thread
    const iceBreakerQuestion = getRandomIceBreaker();
    console.log(iceBreakerQuestion)
    await thread.send(`Welcome ${user1} & ${user2}! You have come to the right place to meet new people and expand your network!\n\nTo kick things off, feel free to introduce yourself and answer the following question:\n\n${iceBreakerQuestion}`)

    await interaction.reply(`Created thread '${thread.name}' for ${user1} and ${user2.user}`);
  }
} 
