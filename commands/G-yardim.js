const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yardım')
        .setDescription('Botun mevcut komutlarını kategorilere göre gösterir'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setThumbnail('')
            .setTitle('')
            .setDescription(`Hoşgeldin <@${interaction.user.id}>`)
            .setColor('')
            .setFooter({ text: ``, iconURL: `${interaction.client.avatarURL()}` })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select-category')
                    .setPlaceholder('Bir kategori seçin...')
                    .addOptions(
                        new StringSelectMenuOptionBuilder()
                            .setLabel('Ana Sayfa')
                            .setValue('main')
                            .setDescription('Ana Sayfaya Yönlendirir.'),
                        new StringSelectMenuOptionBuilder()
                            .setLabel('Genel Komutlar')
                            .setValue('genel')
                            .setDescription('Herkesin Kullanabileceği Komutları Gösterir.'),
                        new StringSelectMenuOptionBuilder()
                            .setLabel('Yapımcı')
                            .setValue('producer')
                            .setDescription('Yapımcıyı gösterir.'),
                    ),
            );

        await interaction.reply({ embeds: [embed], components: [row] });

        const filter = i => i.customId === 'select-category' && i.user.id === interaction.user.id;

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            let categoryEmbed;

            if (i.values[0] === 'main') {
                categoryEmbed = new EmbedBuilder()
                    .setThumbnail('')
                    .setTitle('')
                    .setDescription(`Hoşgeldin <@${interaction.user.id}>`)
                    .setColor('')
                    .setFooter({ text: ``, iconURL: `` });
            } else if (i.values[0] === 'genel') {
                categoryEmbed = new EmbedBuilder()
                    .setTitle('')
                    .setDescription(``)
                    .setColor('');
            } else if (i.values[0] === 'producer') {
                categoryEmbed = new EmbedBuilder()
                    .setTitle('')
                    .setDescription(``)
                    .setColor('')
                    .setImage('')
                    .setFooter({text : ``, iconURL : ``})
                    .setTimestamp();
            }

            await i.update({ embeds: [categoryEmbed] });
        });
    },
};
