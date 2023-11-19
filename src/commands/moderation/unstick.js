const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChannelType,
  PermissionFlagsBits,
} = require("discord.js");
const { stickySchema } = require("../../schemas/stickySchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unstick")
    .setDescription("Remove a stick message!")
    // .addChannelOption((option) =>
    //   option
    //     .setName("channel")
    //     .setDescription("Set Channel to sticky message")
    //     .addChannelTypes(ChannelType.GuildText)
    //     .setRequired(false),
    // )
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  run: async ({ interaction, client, handler }) => {
    await interaction.deferReply({ ephemeral: true });

    let channel = interaction.channel;

    try {
      const dataSticky = await stickySchema.findOne({ ChannelID: channel.id });

      if (!dataSticky) {
        await interaction.editReply({
          content: "This channel not has sticky massage!!",
        });
      } else {
        interaction.client.channels.cache
          .get(dataSticky.ChannelID)
          .messages.fetch(dataSticky.LastMessageID)
          .then(async (m) => {
            await m.delete();
            stickySchema.deleteMany({ ChannelID: channel.id }).then(
              await interaction.editReply({
                content: "Sticky Message has been deleted",
              }),
            );
          });
      }
    } catch (error) {
      console.error(error);
      await interaction.editReply(
        "An error occurred while processing the command.",
      );
    }
  },
};
