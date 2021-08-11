const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const commands = [{
    name: "play",
    description: "Plays a song",
    options: [
        {
            type: 3,
            name: "song",
            description: "The song you want to play",
            required: true
        }
    ]
},]; 

const rest = new REST({ version: "9" }).setToken(process.env['TOKEN']);

(async () => {
  try {
    console.log("Started refreshing application [/] commands.");

    await rest.put(
        Routes.applicationCommands(process.env['ID_CLIENT'],"874148548340506644"),
        { body: commands },
      );

    console.log("Successfully reloaded application [/] commands.");
  } catch (error) {
    console.error(error);
  }
})();
