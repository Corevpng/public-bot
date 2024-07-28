const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('oto-rol')
        .setDescription('Yeni katılan kullanıcılara otomatik olarak verilecek rolü ayarlar')
        .addRoleOption(option => 
            option.setName('rol')
            .setDescription('Otomatik olarak verilecek rol')
            .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has('MANAGE_ROLE')) {
            return interaction.reply('Bu komutu kullanmak için yeterli izniniz yok.');
        }

        const role = interaction.options.getRole('rol');
        const settingsPath = path.resolve(__dirname, '../data/settings.json');
        let settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));

        settings.autoRole = role.id;

        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

        interaction.reply(`Otomatik rol <@&${role.id}> olarak ayarlandı.`);
    },
};