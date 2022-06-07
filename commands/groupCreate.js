const { SlashCommandBuilder } = require("@discordjs/builders");
const { DiscordAPIError, MessageEmbed, Message } = require("discord.js");
const { min } = require("moment");
const moment = require("moment");
const { getRandomIceBreaker } = require("../api/index");

const colors = [
  "#006400",
  "#1E90FF",
  "#DC143C",
  "#FF4500",
  "#663399",
  "#FFFF00",
  "#006400",
  "#1E90FF",
  "#DC143C",
  "#FF4500",
  "#663399",
  "#FFFF00",
  "#006400",
  "#1E90FF",
  "#DC143C",
  "#FF4500",
  "#663399",
  "#FFFF00",
];

const teamNames = [
  "jScript",
  "Python",
  "C++",
  "Rust",
  "React",
  "Django",
  "Vim",
  "Solidity",
];

let channels = [];

function shuffle(arr) {
  var j, x, index;
  for (index = arr.length - 1; index > 0; index--) {
    j = Math.floor(Math.random() * (index + 1));
    x = arr[index];
    arr[index] = arr[j];
    arr[j] = x;
  }
  return arr;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("group-create")
    .setDescription("Choose a number of groups to create")
    .addIntegerOption((option) =>
      option.setName("amount").setDescription("Number of teams to create")
    ),
  async execute(interaction) {
    let endMessage = "Here is your Randomly Generated(soon) groups";
    await interaction.reply(endMessage);
    let membersList = [];
    let membersListNames = [];

    const amount = interaction.options.getInteger("amount");

    if (amount < 2) {
      return;
    }

    // Jons filtering of online users
    // const fetchedMembers = await interaction.guild.members.fetch({
    //   withPresences: true,
    // });
    // const totalOnline = fetchedMembers.filter(
    //   (member) => member.presence?.status === "online" && !member.user.bot
    // );
    // const membersOnline = totalOnline.map((member) => member);

    let members = await shuffle(interaction.channel.members);
    members.forEach((member, index) => {
      membersList.push(member.user);
      membersListNames.push(" " + member.user.username);
    });

    let teams = [];
    let teamsDisplay = [];

    for (i = 0; i < amount; i++) {
      teams.push([]);
      teamsDisplay.push([]);
    }

    const dynamicIndex = Math.floor(
      interaction.channel.members.size / teams.length
    );

    for (i = 0; i < teams.length; i++) {
      // console.log(teams[i]);
      let channelList = [];
      let channelId = "";
      teams[i] = membersList.splice(-dynamicIndex);
      teamsDisplay[i] = membersListNames.splice(-dynamicIndex);

      await interaction.channel.guild.channels
        .create(`Team ${teamNames[i]}`, { reason: "Group Creation" })
        .then((channelName) => {
          console.log("channelName", channelName.id);
          channelId = channelName.id;
        })
        .catch(console.error);

      const groupEmbed = new MessageEmbed()
        .setColor(colors[i])
        .setTitle(`Team ${teamNames[i]}`)
        .setDescription(`${teamsDisplay[i]}`)
        .addField("Team channel", `<#${channelId}>`, true);
      await interaction.channel.send({ embeds: [groupEmbed] });
      const channel = interaction.guild.channels.cache.find(
        (channel) => channel.name === `Team ${teamNames[i]}`
      );
      // console.log("channel test", channel);
      let key = teamNames[i];
      let teamObj = {};
      // teamObj[teamNames[i]] = `<#${}`
      channelList.push(teamObj);
      channelList.push(teamNames[i]);
      const thread = await interaction.channel.threads.create({
        name: `Team ${teamNames[i]}`,
        autoArchiveDuration: "MAX",
        reason: "For group chats",
      });
      for (j = 0; j < teams[i].length; j++) {
        await thread.members.add(teams[i][j]);
        // console.log("j test", teams[i][j].username);
      }
      const iceBreakerQuestion = getRandomIceBreaker();
      await thread.send(
        `Welcome Team ${teamNames[i]}! You have come to the right place to meet new people and expand your network!\n\nTo kick things off, feel free to introduce yourself and answer the following question:\n\n${iceBreakerQuestion}`
      );
    }
    // let embeds = [];

    // console.log("embeds", embeds);
  },
};
