const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("stick").setDescription("stick!"),

  run: ({ interaction, client, handler }) => {
    interaction.reply(`Pong! ${client.ws.ping}ms`);
  },
};
