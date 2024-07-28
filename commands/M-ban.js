const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Belirtilen kullanıcıyı sunucudan banlar')
        .addUserOption(option => 
            option.setName('kullanici')
            .setDescription('Banlanacak kullanıcı')
            .setRequired(true))
        .addStringOption(option => 
            option.setName('sebep')
            .setDescription('Ban sebebi')
            .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('kullanici');
        const reason = interaction.options.getString('sebep') || 'Sebep belirtilmedi';

        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return interaction.reply('Bu komutu kullanmak için yeterli izniniz yok.');
        }

        const member = interaction.guild.members.cache.get(user.id);
        if (!member) {
            return interaction.reply('Bu kullanıcı sunucuda bulunamadı.');
        }

        await member.ban({ reason });
        await interaction.reply(`<@${user.id}> kullanıcısı banlandı. Sebep: ${reason}`);
    },
};