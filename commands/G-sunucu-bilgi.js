const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sunucu-bilgi')
        .setDescription('Sunucu hakkında bilgi verir'),
    async execute(interaction,client) {
        const { guild } = interaction;
        const { name, memberCount, ownerId, createdAt, roles, channels, emojis } = guild;
        const owner = await guild.members.fetch(ownerId);

        const embed = new EmbedBuilder()
            .setTitle(`${name}・Sunucu Bilgisi`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: 'Sunucu Adı', value: name, inline: true },
                { name: 'Sunucu Sahibi', value: owner.user.username, inline: true },
                { name: 'Üye Sayısı', value: `${memberCount}`, inline: true },
                { name: 'Oluşturulma Tarihi', value: createdAt.toDateString(), inline: true },
                { name: 'Rol Sayısı', value: `${roles.cache.size}`, inline: true },
                { name: 'Emoji Sayısı', value: `${emojis.cache.size}`, inline: true },
                { name: 'Kanal Sayısı', value: `${channels.cache.size}`, inline: true }
            )
            .setColor('#00FF00');

        await interaction.reply({ embeds: [embed] });
    },
};