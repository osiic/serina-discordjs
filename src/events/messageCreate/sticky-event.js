const { EmbedBuilder } = require("discord.js");
const { stickySchema } = require("../../schemas/stickySchema");

module.exports = async (message, client, handler) => {
  if (message.author.bot) return;

  const stickyData = await stickySchema.findOne({
    ChannelID: message.channel.id,
  });

  try {
    if (!stickyData) return;
    console.log(stickyData);
    let cacheChannel = client.channels.cache.get(stickyData.ChannelID);
    const stickyEmbed = new EmbedBuilder().setDescription(stickyData.Message);

    if (message.channel.id == stickyData.ChannelID) {
      stickyData.CurrentCount += 1;
      await stickyData.save();

      if (stickyData.CurrentCount > stickyData.MaxCount) {
        try {
          await client.channels.cache
            .get(stickyData.ChannelID)
            .messages.fetch(stickyData.LastMessageID)
            .then(async (m) => {
              await m.delete();
            });

          const newMessage = await cacheChannel.send({ embeds: [stickyEmbed] });

          stickyData.LastMessageID = newMessage.id;
          stickyData.CurrentCount = 0;
          await stickyData.save();
        } catch (error) {
          console.error(error);
          return;
        }
      }
    }
  } catch (error) {
    console.error(error);
    return;
  }
};
