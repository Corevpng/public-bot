const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('davet')
        .setDescription('Botu sunucunuza davet etmenizi sağlar'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('White')
            .setAuthor({ name: `${interaction.client.user.username} • Sunucuya Ekle`, iconURL: interaction.client.user.avatarURL() })
            .setDescription(`<@${interaction.user.id}> Beni Sunucuna Eklemek İçin Alttaki Butona Tıklayabilirsin.`)
            .setFooter({ text: `${interaction.user.username}`, iconURL: interaction.user.avatarURL() })
            .setTimestamp();
        
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Beni Davet Et!')
                    .setURL('https://discord.com/oauth2/authorize?client_id=1256273257435238473&scope=bot%20applications.commands&permissions=2146958847')
                    .setEmoji('🎉')
                    .setStyle(ButtonStyle.Link),
            );
        
        await interaction.reply({ embeds: [embed], components: [row] });
    },
};