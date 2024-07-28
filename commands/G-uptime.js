const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Botun ne kadar süredir çalıştığını gösterir'),
    async execute(interaction) {
        const totalSeconds = Math.floor(process.uptime());
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        await interaction.reply(`Bot çalışıyor: ${days} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye`);
    },
};