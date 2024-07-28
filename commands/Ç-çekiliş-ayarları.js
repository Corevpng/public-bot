const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('çekiliş-ayarları')
        .setDescription('Çekiliş ayarlarını değiştirir.')
        .addStringOption(option => option.setName('mesaj-id').setDescription('Çekiliş mesajının ID\'si').setRequired(true))
        .addStringOption(option => option.setName('odul').setDescription('Yeni çekiliş ödülü').setRequired(false))
        .addIntegerOption(option => option.setName('kazanan-sayisi').setDescription('Yeni kazanan sayısı').setRequired(false)),
    async execute(interaction) {
        // Yönetici yetkisi kontrolü
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply('Bu komutu kullanmak için yeterli izniniz yok.');
        }

        // Gerekli verileri al
        const messageId = interaction.options.getString('mesaj-id');
        const newPrize = interaction.options.getString('odul');
        const newNumberOfWinners = interaction.options.getInteger('kazanan-sayisi');

        // Çekiliş verilerini oku
        const giveawaysPath = path.resolve(__dirname, '../data/giveaways.json');
        let giveaways = JSON.parse(fs.readFileSync(giveawaysPath, 'utf-8'));
        const giveaway = giveaways.find(g => g.messageId === messageId);

        // Çekiliş bulunamadıysa hata mesajı gönder
        if (!giveaway) {
            return interaction.reply('Bu ID\'ye sahip bir çekiliş bulunamadı.');
        }

        // Ödül ve kazanan sayısını güncelle
        if (newPrize) {
            giveaway.prize = newPrize;
        }
        if (newNumberOfWinners) {
            giveaway.numberOfWinners = newNumberOfWinners;
        }

        // Güncellenmiş verileri yaz
        fs.writeFileSync(giveawaysPath, JSON.stringify(giveaways, null, 2));
        interaction.reply('Çekiliş ayarları başarıyla güncellendi.');
    },
};