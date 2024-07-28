const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('premium-listele')
        .setDescription('Premium üyelerin listesini gösterir'),
    async execute(interaction) {
        const premiumPath = path.resolve(__dirname, '../data/premium.json');
        
        let premiumUsers = JSON.parse(fs.readFileSync(premiumPath, 'utf-8'));

        if (premiumUsers.length > 0) {
            const userList = premiumUsers.map(id => `<@${id}>`).join(', ');
            return interaction.reply(`Premium üyeler:\n ${userList}`);
        } else {
            return interaction.reply('Hiç premium üye yok.');
        }
    },
};