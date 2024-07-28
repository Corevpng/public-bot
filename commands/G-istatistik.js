const { SlashCommandBuilder, Colors, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('istatistik')
        .setDescription('Botun istatistiklerini gösterir'),
    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setTitle('Nexis · İstatistik')
            .setThumbnail(interaction.client.user.avatarURL())
            .setDescription(`
> | Geliştiricilerim :     <@848526275059777566>     
> | Toplam Kullanıcı :     ${interaction.client.users.cache.size}      
> | Toplam Sunucu :     ${interaction.client.guilds.cache.size}      
> | Discord JS :     **v14.15.3**   
            `)
            .setFooter({ text: `${interaction.client.user.username}`, iconURL: interaction.client.user.avatarURL() })
            .setColor(Colors.White)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};