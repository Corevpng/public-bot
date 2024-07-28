const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rolver')
        .setDescription('Belirtilen kullanıcıya rol verir')
        .addUserOption(option => 
            option.setName('kullanici')
            .setDescription('Rol verilecek kullanıcı')
            .setRequired(true))
        .addRoleOption(option => 
            option.setName('rol')
            .setDescription('Verilecek rol')
            .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('kullanici');
        const role = interaction.options.getRole('rol');

        if (!interaction.member.permissions.has('MANAGE_ROLES')) {
            return interaction.reply('Bu komutu kullanmak için yeterli izniniz yok.');
        }

        const member = interaction.guild.members.cache.get(user.id);
        if (!member) {
            return interaction.reply('Bu kullanıcı sunucuda bulunamadı.');
        }

        await member.roles.add(role);
        await interaction.reply(`<@${user.id}> kullanıcısına ${role.id} rolü verildi.`);
    },
};