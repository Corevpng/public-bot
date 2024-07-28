const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('destek-sifirla')
        .setDescription('Tüm ticket ayarlarını sıfırlar.'),
    async execute(interaction) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply('Bu komutu kullanmak için yeterli izniniz yok.');
        }

        const settingsPath = path.resolve(__dirname, '../data/settings.json');
        const defaultSettings = {
            ticketRole: null,
            logChannel: null
        };

        fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings, null, 2));

        interaction.reply('Tüm ticket ayarları sıfırlandı.');
    },
};