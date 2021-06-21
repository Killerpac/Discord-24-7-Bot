const { Client, Intents} = require("discord.js");
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES,Intents.FLAGS.GUILDS] });
client.config = require('./config');
const CHANNEL = client.config.secret.CHANNEL
const TOKEN = client.config.secret.TOKEN
const LINKS = client.config.secret.LINKS.split(',')
const ytdl = require('discord-ytdl-core');
const { joinVoiceChannel,createAudioPlayer,
	createAudioResource,
	entersState,
  getVoiceConnection,
  AudioPlayerState,
	StreamType,
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
  

  async function playSong(url)
  {
	const resource = createAudioResource(await ytdl(url, {
    filter: "audioonly",
    opusEncoded: true,
    encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200']
}), {
		inputType: StreamType.Opus,
	});

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
		await channel.guild.me.voice.setSuppressed(false);
    channel.setTopic('Lo-Fi Vibes 24/7');
      return connection
	} catch (error) {
		connection.destroy();
		throw error;
	}
  }


client.on('ready', async () => {
client.user.setPresence({ activities: [{ name: 'Music 24/7',type:'STREAMING' }] });
  let channel = client.channels.cache.get(CHANNEL) || await client.channels.fetch(CHANNEL)

  if (!channel) {
    console.error("The provided channel ID doesn't exist, or I don't have permission to view that channel. Because of that, I'm aborting now.");
    return process.exit(1);
  } else if (channel.type !== "stage") {
    console.error("The provided channel ID is NOT stage channel. Because of that, I'm aborting now.");
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

client.login(TOKEN) //Login
console.log('Logged in as Nino')
process.on('unhandledRejection', console.error);
require("./server.js")