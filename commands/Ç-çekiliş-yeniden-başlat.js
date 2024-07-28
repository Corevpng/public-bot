const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');
const ms = require('ms'); // ms modülünü içe aktarın

module.exports = {
    data: new SlashCommandBuilder()
    .setName('çekiliş-yeniden-başlat')
    .setDescription('Devam eden bir çekilişi yeniden başlatır.')
    .addStringOption(option => option.setName('mesaj-id').setDescription('Çekiliş mesajının ID\'si').setRequired(true))
    .addStringOption(option => option.setName('sure').setDescription('Yeni çekiliş süresi (m: dakika, h: saat)').setRequired(true))
    .addIntegerOption(option => option.setName('kazanan-sayisi').setDescription('Çekilişte kaç kişi kazanacak?').setRequired(true)),
async execute(interaction) {
    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
        return interaction.reply('Bu komutu kullanmak için yeterli izniniz yok.');
    }
    
    const messageId = interaction.options.getString('mesaj-id');
    const newDuration = interaction.options.getString('sure');
    const newNumberOfWinners = interaction.options.getInteger('kazanan-sayisi');

    if (!newDuration) {
        return interaction.reply('Geçerli bir süre sağlamalısınız.');
    }

    const giveawaysPath = path.resolve(__dirname, '../data/giveaways.json');
    let giveaways = JSON.parse(fs.readFileSync(giveawaysPath, 'utf-8'));
    const giveaway = giveaways.find(g => g.messageId === messageId);

    if (!giveaway) {
        return interaction.reply('Bu ID\'ye sahip bir çekiliş bulunamadı.');
    }

    giveaway.endTime = Date.now() + ms(newDuration);
    giveaway.duration = newDuration;
    giveaway.numberOfWinners = newNumberOfWinners;

    fs.writeFileSync(giveawaysPath, JSON.stringify(giveaways, null, 2));
    interaction.reply('Çekiliş başarıyla yeniden başlatıldı.');
},
};