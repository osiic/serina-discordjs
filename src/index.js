require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const { CommandHandler } = require("djs-commander");
const { mongoConnect } = require("./module/mongoConnect.js");
const path = require("path");

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds],
});

new CommandHandler({
  client,
  commandsPath: path.join(__dirname, "commands"),
  eventsPath: path.join(__dirname, "events"),
  validationsPath: path.join(__dirname, "validations"),
  testServer: process.env.SERVER_TEST,
});

mongoConnect();
client.login(process.env.DISCORD_TOKEN);
