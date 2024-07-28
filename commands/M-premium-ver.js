const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('premium-ver')
        .setDescription('Bir kullanıcıya premium üyelik verir')
        .addUserOption(option =>
            option.setName('kullanıcı')
                .setDescription('Premium üyelik verilecek kullanıcı')
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

        if (!premiumUsers.includes(user.id)) {
            premiumUsers.push(user.id);
            fs.writeFileSync(premiumPath, JSON.stringify(premiumUsers, null, 2));

            // Log kanalına mesaj gönderme
            const logChannelId = settings.premiumLog;
            const logChannel = interaction.guild.channels.cache.get(logChannelId);
            if (logChannel) {
                logChannel.send(`${user} kullanıcısına premium üyelik verildi.`);
            }
            return interaction.reply(`${user} kullanıcısına premium üyelik verildi.`);
        } else {
            return interaction.reply(`${user} kullanıcısı zaten premium üye.`);
        }
    },
};