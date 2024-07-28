const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sil')
        .setDescription('Belirli sayıda mesajı siler')
        .addIntegerOption(option =>
            option.setName('sayi')
                .setDescription('Silinecek mesaj sayısı')
                .setRequired(true)),
    async execute(interaction) {
        const count = interaction.options.getInteger('sayi');
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
            return interaction.reply('Bu komutu kullanmak için yeterli izniniz yok.');
        }

        if (count < 1 || count > 500) {
            return interaction.reply('Lütfen 1 ile 500 arasında bir sayı girin.');
        }

        const messages = await interaction.channel.bulkDelete(count, true);
        interaction.reply(`${messages.size} mesaj başarıyla silindi.`);
    },
};