const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('premium-kontrol')
        .setDescription('Bir kullanıcının premium üyeliğini kontrol eder')
        .addUserOption(option => 
            option.setName('kullanıcı')
                .setDescription('Premium üyeliği kontrol edilecek kullanıcı')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('kullanıcı');
        const premiumPath = path.resolve(__dirname, '../data/premium.json');
        
        let premiumUsers = JSON.parse(fs.readFileSync(premiumPath, 'utf-8'));

        if (premiumUsers.includes(user.id)) {
            return interaction.reply(`${user} kullanıcısı premium üye.`);
        } else {
            return interaction.reply(`${user} kullanıcısı premium üye değil.`);
        }
    },
};