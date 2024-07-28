const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('destek-kur')
        .setDescription('Ticket sistemi başlatır')
        .addStringOption(option => option.setName('mesaj').setDescription('Ticket mesajı').setRequired(true))
        .addStringOption(option => option.setName('emoji').setDescription('Ticket buton emojisi').setRequired(true)),
    async execute(interaction) {
        const ticketMessage = interaction.options.getString('mesaj');
        const ticketEmoji = interaction.options.getString('emoji');
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply('Bu komutu kullanmak için yeterli izniniz yok.');
        }

        const embed = new EmbedBuilder()
            .setTitle('Destek Talebi')
            .setDescription(ticketMessage)
            .setColor('#00FF00');

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('create_ticket')
                    .setLabel('Ticket Oluştur')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(ticketEmoji)
            );

        await interaction.reply({ embeds: [embed], components: [row] });
    },
};