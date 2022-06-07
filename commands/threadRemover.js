const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove-threads")
    .setDescription("Prune all threads"),
  async execute(interaction) {
    const thread1 = interaction.channel.threads.cache.find(
      (x) => x.name === "Team Python"
    );
    if (thread1) {
      await thread1.delete();
    }
    const thread2 = interaction.channel.threads.cache.find(
      (x) => x.name === "Team jScript"
    );
    if (thread2) {
      await thread2.delete();
    }
    const thread3 = interaction.channel.threads.cache.find(
      (x) => x.name === "Team C++"
    );
    if (thread3) {
      await thread3.delete();
    }
    const thread4 = interaction.channel.threads.cache.find(
      (x) => x.name === "Team Rust"
    );
    if (thread4) {
      await thread4.delete();
    }
    const thread5 = interaction.channel.threads.cache.find(
      (x) => x.name === "Team React"
    );
    if (thread5) {
      await thread5.delete();
    }
    const thread6 = interaction.channel.threads.cache.find(
      (x) => x.name === "Team Django"
    );
    if (thread6) {
      await thread6.delete();
    }
    const thread7 = interaction.channel.threads.cache.find(
      (x) => x.name === "Team Vim"
    );
    if (thread7) {
      await thread7.delete();
    }
    const thread8 = interaction.channel.threads.cache.find(
      (x) => x.name === "Team Solidity"
    );
    if (thread8) {
      await thread8.delete();
    }

    return interaction.reply({
      content: `Successfully removed threads`,
      ephemeral: true,
    });
  },
};
