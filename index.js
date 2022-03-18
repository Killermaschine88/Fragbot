//Global Stuff
const { globalStart } = require("./global/start.js");
globalStart();

//Discord Bot
const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
client.login(process.env.DISCORD_TOKEN);

//Imports
const fs = require("fs");

//Catch errors that might slip
try {
  process.on("uncaughtException", (error) => console.log(error));
  process.on("unhandledRejection", (error) => console.log(error));
} catch (e) {
  console.log(e);
}

//Event Handler
const eventFiles = fs.readdirSync(__dirname + "/discord/events").filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./discord/events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

//Loading Commands
loadCommands(client);

//Functions
function loadCommands(client) {
  client.messageCommands = new Discord.Collection();
  client.slashCommands = new Discord.Collection();

  if (fs.existsSync(__dirname + "/discord/messageCommands")) {
    const folder = fs.readdirSync(__dirname + "/discord/messageCommands");

    for (const file of folder) {
      const command = require(`./discord/messageCommands/${file}`);
      client.messageCommands.set(command.name.toLowerCase(), command);
    }
    log(`Loaded Message Commands`);
  }

  if (fs.existsSync(__dirname + "/discord/slashCommands")) {
    const folder = fs.readdirSync(__dirname + "/discord/slashCommands");

    for (const file of folder) {
      const command = require(`./discord/slashCommands/${file}`);
      client.slashCommands.set(command.name.toLowerCase(), command);
    }
    log(`Loaded Slash Commands`);
  }
}

client.reload = loadCommands;
