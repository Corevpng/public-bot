const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Bir anket oluşturur.')
        .addStringOption(option => option.setName('soru').setDescription('Anket sorusu').setRequired(true))
        .addStringOption(option => option.setName('secenekler').setDescription('Anket seçenekleri, virgülle ayrılmış').setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('soru');
        const options = interaction.options.getString('secenekler').split(',');

        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply('Bu komutu kullanmak için yeterli izniniz yok.');
        }

        if (options.length > 10) {
            return interaction.reply('En fazla 10 seçenek girebilirsiniz.');
        }

        const embed = new EmbedBuilder()
            .setTitle('Anket')
            .setDescription(question)
            .setColor('#00FF00');

        const fields = options.map((option, index) => ({
            name: `Seçenek ${index + 1}`,
            value: option.trim(),
            inline: true
        }));

        embed.addFields(fields);

        const message = await interaction.reply({ embeds: [embed], fetchReply: true });

        const reactions = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
        for (let i = 0; i < options.length; i++) {
            await message.react(reactions[i]);
        }
    },
};