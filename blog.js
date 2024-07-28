require('dotenv').config();
const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config/config.json');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

client.on('ready', () => {
    const channel = client.channels.cache.get('<KANAL_ID>'); // Kanal ID'sini buraya yaz
    channel.send({ embeds: [otom] });
})

const otom = new EmbedBuilder()

    .setColor("Green")
    .setDescription(`
\`\`\` Bütün Komutlar Çalışmaya Hazır ! \`\`\`
> Bot Aktif Oldu!`)

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    plugins: [new SpotifyPlugin(), new SoundCloudPlugin()],
});

const { joinVoiceChannel } = require('@discordjs/voice')
client.on('ready', () => {
    let channel = client.channels.cache.get("1256649242244808844")


    const VoiceConnection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator
    });
})

client.on('guildCreate', guild => {

    const Eklendim = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Bir sunucuya eklendim")
        .addFields({ name: `**Sunucu adı**`, value: `${guild}` })
        .addFields({ name: `**Sunucu id**`, value: `${guild.id}` })
        .addFields({ name: `**Toplam sunucu**`, value: `${client.guilds.cache.size}` })
        .addFields({ name: `**Toplam kullanıcı**`, value: `${client.users.cache.size}` })
    client.channels.cache.get("<KANAL_ID>").send({ embeds: [Eklendim] })
})

client.on('guildDelete', guild => {

    const Atıldım = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Bir sunucudan atıldım")
        .addFields({ name: `**Sunucu adı**`, value: `${guild}` })
        .addFields({ name: `**Sunucu id**`, value: `${guild.id}` })
        .addFields({ name: `**Toplam sunucu**`, value: `${client.guilds.cache.size}` })
        .addFields({ name: `**Toplam kullanıcı**`, value: `${client.users.cache.size}` })
    client.channels.cache.get('<KANAL_ID>').send({ embeds: [Atıldım] })
})

client.login(config.token);