const { Client, Intents} = require("discord.js");
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES,Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MEMBERS] });
client.config = require('./config');
const CHANNEL = client.config.secret.CHANNEL
const TOKEN = client.config.secret.TOKEN
const LINKS = client.config.secret.LINKS.split(',')
const ytdl = require('youtube-dl-exec').raw;
const yt = require("ytdl-core");
const { joinVoiceChannel,createAudioPlayer,
	entersState,
  getVoiceConnection,
  createAudioResource,
	AudioPlayerStatus,
	VoiceConnectionStatus } = require('@discordjs/voice');
if (!TOKEN) {
  console.error("Press provide a valid Discord Bot Token.");
  return process.exit(1);
} else if (!CHANNEL || Number(CHANNEL) == NaN) {
  console.log("Please provide a valid channel ID.");
  return process.exit(1);
} else if (!LINKS) {
  console.log("Please provide a valid Youtube URL.");
  return process.exit(1);
}
 const player = createAudioPlayer();

 function stream(url)
 {
  if (!url || typeof url !== "string") throw new Error("Invalid url");

  const ytdlProcess = ytdl(url, {
          o: '-',
          q: '',
          f: 'bestaudio[ext=webm+acodec=opus+asr=48000]/bestaudio',
          r: '100K',
      },
      {
          stdio: ['ignore', 'pipe', 'ignore']
      }
  );

  if (!ytdlProcess.stdout) throw new Error('No stdout');
  const stream = ytdlProcess.stdout;

  stream.on("error", () => {
      if (!ytdlProcess.killed) ytdlProcess.kill();
      stream.resume();
  });

  return stream;
}

  async function playSong(url)
  {

  const resource = createAudioResource(stream(url))

	player.play(resource);
	return entersState(player, AudioPlayerStatus.Playing, 10e3);
}


  async function connectToChannel(channel) {
	const connection = joinVoiceChannel({
		channelId: channel.id,
		guildId: channel.guild.id,
		adapterCreator:channel.guild.voiceAdapterCreator
	});

	try {
		await entersState(connection,VoiceConnectionStatus.Ready, 10e3);
		if(channel.type == "stage")
    {
    await channel.guild.me.voice.setSuppressed(false);
    await channel.setTopic(`${client.config.secret.TOPIC}`);
    }
      return connection
	} catch (error) {
		connection.destroy();
		throw error;
	}
  }


client.on('ready', async () => {
client.user.setPresence({ activities: [{ name: `${client.config.secret.STATUS}`,type:'STREAMING' }] });
  let channel = client.channels.cache.get(CHANNEL) || await client.channels.fetch(CHANNEL)

  if (!channel) {
    console.error("The provided channel ID doesn't exist, or I don't have permission to view that channel. Because of that, I'm aborting now.");
    return process.exit(1);
  } else if (!(channel.type == "voice" || channel.type == "stage")) {
    console.error("The provided channel ID is neither stage channel Nor A Voice Channel. Because of that, I'm aborting now.");
    return process.exit(1);
  }
  const random = LINKS[Math.floor(Math.random() * LINKS.length)]
    const connection = await connectToChannel(channel);
    await connection.subscribe(player);
    await playSong(random);


player.on(AudioPlayerStatus.Idle, async () =>{
 const random = LINKS[Math.floor(Math.random() * LINKS.length)]
     await playSong(random)
    })

const voiceConnection = getVoiceConnection(channel.guild.id)
  voiceConnection.on(VoiceConnectionStatus.Disconnected,async  () => {
    const random = LINKS[Math.floor(Math.random() * LINKS.length)]
    const conne = await connectToChannel(channel);
    await conne.subscribe(player);
    await playSong(random);

  })
  });
  client.on('message', async (message) => {
    if (!message.guild) return;
    if (!client.application?.owner) await client.application?.fetch();
  
    if (message.content.toLowerCase() === '!deploy' && message.author.id === client.application?.owner?.id) {
      await message.guild.commands.set([
        {
          name: 'play',
          description: 'Plays a song',
          options: [
            {
              name: 'song',
              type: 'STRING',
              description: 'The URL of the song to play',
              required: true,
            },
          ],
        },
      ]);

      await message.reply('Deployed!');
    }
  });

  client.on('interaction', async (interaction) => {
    if (!interaction.isCommand() || !interaction.guildID) return;
  
    if (interaction.commandName === 'play') {
      await interaction.defer();
      // Extract the video URL from the command
      const url = interaction.options.get('song').value;
      if(!interaction.member.roles.cache.some(r=>["Moderator", "Admin","👨‍💻 Dave","Founder"].includes(r.name))) return interaction.followUp({ content: "You Don't Have The Permisssion to Change Music:[Dave,Mod,Admin,Founder]", ephemeral: true }).catch(console.warn);
      else if(!yt.validateURL(url)) return interaction.followUp({ content: 'Invalid URL or a Playlist', ephemeral: true }).catch(console.warn);
        await playSong(url)
      interaction.followUp({ content: 'Playing The Requested Song', ephemeral: true }).catch(console.warn);
    }
  });
    
client.login(TOKEN) //Login
console.log('Logged in Successfully')
process.on('unhandledRejection', console.error);