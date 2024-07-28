const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('destek-ayarlari')
        .setDescription('Mevcut destek ayarlarını gösterir.'),
    async execute(interaction) {
        const settingsPath = path.resolve(__dirname, '../data/settings.json');
        const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply('Bu komutu kullanmak için yeterli izniniz yok.');
        }

        const embed = new EmbedBuilder()
            .setTitle('Destek Ayarları')
            .setColor('#00FF00')
            .addFields(
                { name: 'Ticket Yetkili Rolü', value: settings.ticketRole ? `<@&${settings.ticketRole}>` : 'Yok', inline: true },
                { name: 'Destek Log Kanalı', value: settings.logChannel ? `<#${settings.logChannel}>` : 'Yok', inline: true }
            );

        interaction.reply({ embeds: [embed] });
    },
};