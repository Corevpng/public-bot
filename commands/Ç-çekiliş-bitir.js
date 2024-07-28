const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('çekiliş-bitir')
        .setDescription('Devam eden bir çekilişi bitirir.')
        .addStringOption(option => option.setName('mesaj-id').setDescription('Çekiliş mesajının ID\'si').setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply('Bu komutu kullanmak için yeterli izniniz yok.');
        }
        
        const messageId = interaction.options.getString('mesaj-id');
        const giveawaysPath = path.resolve(__dirname, '../data/giveaways.json');
        let giveaways = JSON.parse(fs.readFileSync(giveawaysPath, 'utf-8'));
        const giveaway = giveaways.find(g => g.messageId === messageId);

        if (!giveaway) {
            return interaction.reply('Bu ID\'ye sahip bir çekiliş bulunamadı.');
        }

        const channel = interaction.guild.channels.cache.get(giveaway.channelId);
        const message = await channel.messages.fetch(giveaway.messageId);
        const reactions = message.reactions.cache.get('🎉');

        if (!reactions) {
            return interaction.reply('Çekiliş reaksiyonu bulunamadı.');
        }

        const users = await reactions.users.fetch();
        const participants = users.filter(user => !user.bot);

        if (participants.size === 0) {
            return interaction.reply('Yeterli katılım olmadığından çekiliş iptal edildi.');
        }

        const winner = participants.random();
        interaction.reply(`🎉 Tebrikler ${winner}! **${giveaway.prize}** ödülünü kazandın! 🎉`);

        giveaways = giveaways.filter(g => g.messageId !== messageId);
        fs.writeFileSync(giveawaysPath, JSON.stringify(giveaways, null, 2));
    },
};