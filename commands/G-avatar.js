const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Kullanıcının avatarını gösterir.')
        .addUserOption(option => 
            option.setName('kullanici')
            .setDescription('Avatarını görmek istediğiniz kullanıcı')),
    async execute(interaction) {
        const user = interaction.options.getUser('kullanici') || interaction.user;
        const embed = new EmbedBuilder()
            .setTitle(`${user.username}'nin Avatarı`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor('#00FF00');

        await interaction.reply({ embeds: [embed] });
    },
};