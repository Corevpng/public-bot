const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('destek-yetkili-belirle')
        .setDescription('Ticket yetkili rolü belirler.')
        .addRoleOption(option => option.setName('rol').setDescription('Yetkili rolü').setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply('Bu komutu kullanmak için yeterli izniniz yok.');
        }

        const role = interaction.options.getRole('rol');
        const settingsPath = path.resolve(__dirname, '../data/settings.json');
        let settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));

        settings.ticketRole = role.id;
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

        interaction.reply(`Ticket yetkili rolü ${role.name} olarak ayarlandı.`);
    },
};