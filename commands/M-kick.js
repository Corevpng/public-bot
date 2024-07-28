const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Belirtilen kullanıcıyı sunucudan atar')
        .addUserOption(option => option.setName('kullanici').setDescription('Atılacak kullanıcı').setRequired(true))
        .addStringOption(option => option.setName('sebep').setDescription('Atılma sebebi').setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('kullanici');
        const reason = interaction.options.getString('sebep') || 'Sebep belirtilmedi';

        if (!interaction.member.permissions.has('KICK_MEMBERS')) {
            return interaction.reply('Bu komutu kullanmak için yeterli izniniz yok.');
        }

        const member = interaction.guild.members.cache.get(user.id);
        if (!member) {
            return interaction.reply('Bu kullanıcı sunucuda bulunamadı.');
        }

        await member.kick(reason);
        await interaction.reply(`<@${user.id}> kullanıcısı atıldı. Sebep: ${reason}`);
    },
};