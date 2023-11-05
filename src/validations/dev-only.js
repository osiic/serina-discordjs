const { toArray } = require("../module/toArray");

const developerId = toArray(process.env.DEVELOPER_ID);

module.exports = (interaction, commandObj, handler, client) => {
  if (commandObj.devOnly) {
    if (interaction.member.id in developerId === false) {
      interaction.reply("This command is for the developer only");
      return true; // This must be added to stop the command from being executed.
    }
  }
};
