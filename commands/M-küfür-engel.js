const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('küfür-engel')
        .setDescription('Küfür engelleme sistemini açar veya kapatır')
        .addBooleanOption(option => 
            option.setName('durum')
                .setDescription('Küfür engelleme sistemini açmak veya kapatmak için true/false')
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply('Bu komutu kullanmak için yeterli izniniz yok.');
        }

        const durum = interaction.options.getBoolean('durum');
        const settingsPath = path.resolve(__dirname, '../data/settings.json');
        let settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));

        settings.kufurEngel = durum;

        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

        interaction.reply(`Küfür engelleme sistemi ${durum ? 'açıldı' : 'kapandı'}.`);
    },
};