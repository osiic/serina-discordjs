const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { stickySchema } = require("../../schemas/stickySchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stick")
    .setDescription("Create a stick message!")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message you want to stick to the chat!")
        .setRequired(true),
    )
    .addNumberOption((option) =>
      option
        .setName("count")
        .setDescription("How frequently you want!")
        .setRequired(false),
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Set Channel to sticky message")
        .setRequired(false),
    )
    .setDMPermission(false),
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages);

  run: async ({ interaction, client, handler }) => {
    await interaction.deferReply({ ephemeral: true });

    let string = interaction.options.getString("message");
    let amount = interaction.options.getNumber("count");
    let channel =
      interaction.options.getChannel("channel") || interaction.channel;

    const embedSticky = new EmbedBuilder().setDescription(string);

    try {
      const dataSticky = await stickySchema.findOne({ ChannelID: channel.id });

      console.log(dataSticky);

      if (!dataSticky) {
        let msg = await channel.send({ embeds: [embedSticky] });

        await stickySchema.create({
          ChannelID: channel.id,
          Message: string,
          MaxCount: amount,
          LastMessageID: msg.id,
        });

        return await interaction.editReply({
          content: "The sticky message has been set up",
        });
      } else {
        await interaction.editReply({
          content:
            "You already have a sticky message set up in the channel. Please use /unstick to remove it and try again.",
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
