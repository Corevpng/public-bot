const { SlashCommandBuilder, EmbedBuilder, Colors } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Botun gecikmesini gösterir'),
    async execute(interaction) {
        const ms = interaction.client.ws.ping;

        const embed = new EmbedBuilder()
            .setTitle('Nexis · Ping')
            .addFields(
                {
                    name: '<:istatistik:1182991697823678465> | Bot gecikmesi:',
                    value: `\`${ms}ms\``
                }
            )
            .setFooter({ text: `${interaction.client.user.username}`, iconURL: interaction.client.user.avatarURL() })
            .setColor(Colors.Green);

        await interaction.reply({ embeds: [embed] });
    },
};