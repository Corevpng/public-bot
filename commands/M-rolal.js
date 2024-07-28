const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rolal')
    .setDescription('Belirtilen kullanıcıdan rol alır')
    .addUserOption(option => 
        option.setName('kullanici')
        .setDescription('Rol alınacak kullanıcı')
        .setRequired(true))
    .addRoleOption(option => 
        option.setName('rol')
        .setDescription('Alınacak rol')
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

    await member.roles.remove(role);
    await interaction.reply(`<@${user.id}> kullanıcısından ${role.name} rolü alındı.`);
},
};