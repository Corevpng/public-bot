const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('premium-al')
        .setDescription('Bir kullanıcının premium üyeliğini alır')
        .addUserOption(option => 
            option.setName('kullanıcı')
                .setDescription('Premium üyeliği alınacak kullanıcı')
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply('Bu komutu kullanmak için yeterli izniniz yok.');
        }

        const user = interaction.options.getUser('kullanıcı');
        const premiumPath = path.resolve(__dirname, '../data/premium.json');
        const settingsPath = path.resolve(__dirname, '../data/settings.json');
        
        let premiumUsers = JSON.parse(fs.readFileSync(premiumPath, 'utf-8'));
        let settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));

        if (premiumUsers.includes(user.id)) {
            premiumUsers = premiumUsers.filter(id => id !== user.id);
            fs.writeFileSync(premiumPath, JSON.stringify(premiumUsers, null, 2));

            // Log kanalına mesaj gönderme
            const logChannelId = settings.premiumLog;
            const logChannel = interaction.guild.channels.cache.get(logChannelId);
            if (logChannel) {
                logChannel.send(`${user} kullanıcısının premium üyeliği alındı.`);
            }

            return interaction.reply(`${user} kullanıcısının premium üyeliği alındı.`);
        } else {
            return interaction.reply(`${user} kullanıcısı zaten premium üye değil.`);
        }
    },
};