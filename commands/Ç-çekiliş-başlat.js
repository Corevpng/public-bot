const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const ms = require('ms'); // ms modülünü içe aktarın

module.exports = {
    data: new SlashCommandBuilder()
        .setName('çekiliş-başlat')
        .setDescription('Belirtilen süre sonunda bir çekiliş düzenler.')
        .addStringOption(option => option.setName('sure').setDescription('Çekiliş süresi (m: dakika, h: saat)').setRequired(true))
        .addStringOption(option => option.setName('odul').setDescription('Çekiliş ödülü').setRequired(true))
        .addIntegerOption(option => option.setName('kazanan-sayisi').setDescription('Çekilişte kaç kişi kazanacak?').setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply('Bu komutu kullanmak için yeterli izniniz yok.');
        }
        
        const duration = interaction.options.getString('sure');
        const prize = interaction.options.getString('odul');
        const numberOfWinners = interaction.options.getInteger('kazanan-sayisi');
        const giveawaysPath = path.resolve(__dirname, '../data/giveaways.json');
        let giveaways = JSON.parse(fs.readFileSync(giveawaysPath, 'utf-8'));

        const embed = new EmbedBuilder()
            .setTitle('🎉 Çekiliş Başladı! 🎉')
            .setDescription(`Ödül: **${prize}**
Çekiliş süresi: **${ms(ms(duration), { long: true })}**
Kazanan sayısı: **${numberOfWinners}**
Katılmak için bu mesaja 🎉 emojisiyle tepki verin!`)
            .setColor('#00FF00')
            .setTimestamp(Date.now() + ms(duration))

        const message = await interaction.reply({ embeds: [embed], fetchReply: true });
        message.react('🎉');

        giveaways.push({
            messageId: message.id,
            channelId: message.channel.id,
            guildId: message.guild.id,
            prize: prize,
            endTime: Date.now() + ms(duration),
            numberOfWinners: numberOfWinners,
            participants: []
        });

        fs.writeFileSync(giveawaysPath, JSON.stringify(giveaways, null, 2));

        setTimeout(async () => {
            const cachedMessage = await interaction.channel.messages.fetch(message.id);
            const reactions = cachedMessage.reactions.cache.get('🎉');

            if (!reactions) {
                return interaction.followUp('Yeterli katılım olmadığından çekiliş iptal edildi.');
            }

            const users = await reactions.users.fetch();
            const participants = users.filter(user => !user.bot);

            if (participants.size === 0) {
                return interaction.followUp('Yeterli katılım olmadığından çekiliş iptal edildi.');
            }

            const winners = [];
            for (let i = 0; i < numberOfWinners; i++) {
                const winner = participants.random();
                winners.push(winner);
                participants.delete(winner.id);
            }

            interaction.followUp(`🎉 Tebrikler ${winners.map(w => w.toString()).join(', ')}! **${prize}** ödülünü kazandınız! 🎉`);
        }, ms(duration));
    },
};