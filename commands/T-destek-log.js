const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('destek-log-kanali')
        .setDescription('Destek log kanalını belirler.')
        .addChannelOption(option => option.setName('kanal').setDescription('Destek log kanalı').setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply('Bu komutu kullanmak için yeterli izniniz yok.');
        }

        const channel = interaction.options.getChannel('kanal');
        const settingsPath = path.resolve(__dirname, '../data/settings.json');
        let settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));

        settings.logChannel = channel.id;
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

        interaction.reply(`Destek log kanalı ${channel.name} olarak ayarlandı`);
    },
};