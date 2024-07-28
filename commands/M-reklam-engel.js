const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reklam-engel')
        .setDescription('Link engelleme sistemini açar veya kapatır')
        .addBooleanOption(option =>
            option.setName('durum')
                .setDescription('Link engelleme sistemini açmak veya kapatmak için true/false')
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply('Bu komutu kullanmak için yeterli izniniz yok.');
        }

        const durum = interaction.options.getBoolean('durum');
        const settingsPath = path.resolve(__dirname, '../data/settings.json');
        let settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));

        settings.linkEngel = durum;

        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

        interaction.reply(`Reklam engelleme sistemi ${durum ? 'açıldı' : 'kapandı'}.`);
    },
};