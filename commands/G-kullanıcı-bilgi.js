const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kullanıcı-bilgi')
        .setDescription('Kullanıcı hakkında bilgi verir')
        .addUserOption(option => 
            option.setName('kullanici')
            .setDescription('Bilgilerini görmek istediğiniz kullanıcı')),
    async execute(interaction) {
        const user = interaction.options.getUser('kullanici') || interaction.user;
        const member = interaction.guild.members.cache.get(user.id);

        const embed = new EmbedBuilder()
            .setTitle(`<@${user.id}> hakkında bilgi`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Kullanıcı Adı', value: user.tag, inline: true },
                { name: 'Kullanıcı ID', value: user.id, inline: true },
                { name: 'Katılma Tarihi', value: member.joinedAt.toDateString(), inline: true },
                { name: 'Hesap Oluşturma Tarihi', value: user.createdAt.toDateString(), inline: true }
            )
            .setColor('#00FF00');

        await interaction.reply({ embeds: [embed] });
    },
};