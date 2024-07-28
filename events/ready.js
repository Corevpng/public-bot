const ActivityType = require('discord.js')

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Bot ${client.user.username} olarak giriş yaptı!`);

        client.user.setPresence({
            activities: [{ name: '.gg/codeblog'}],
            status: 'dnd',
            type: 'WATCHING'
        });

        const guild = client.guilds.cache.get('<SUNUCU_ID>'); // Sunucu ID'sini buraya girin
        if (guild) {
            guild.commands.set(client.commands.map(command => command.data));
        } else {
            console.error('Sunucu bulunamadı');
        }
    },
};