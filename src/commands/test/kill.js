const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  devOnly: true,
  data: new SlashCommandBuilder().setName("kill").setDescription("I kill you!"),

  run: ({ interaction, client, handler }) => {
    interaction.reply(`kill`);
  },
};
