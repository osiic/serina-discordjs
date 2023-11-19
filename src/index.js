require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const { CommandHandler } = require("djs-commander");
const { mongooseConnect } = require("./function/mongoose");
const path = require("path");

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds], // Your bot's intents
});

mongooseConnect();

new CommandHandler({
  client, // Discord.js client object | Required by default
  commandsPath: path.join(__dirname, "commands"), // The commands directory
  eventsPath: path.join(__dirname, "events"), // The events directory
  validationsPath: path.join(__dirname, "validations"), // Only works if commandsPath is provided
  testServer: process.env.SERVER_TEST, // To register guild-based commands (if it's not provided commands will be registered globally)
});

client.login(process.env.DISCORD_TOKEN);
