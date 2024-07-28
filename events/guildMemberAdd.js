const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const settingsPath = path.resolve(__dirname, '../data/settings.json');
        const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));

        const roleId = settings.autoRole;
        const logChannelId = settings.autoRoleLog;

        if (!roleId) return;

        const role = member.guild.roles.cache.get(roleId);
        if (!role) return;

        try {
            await member.roles.add(role);
            console.log(`Rol ${role.name} kullanıcı ${member.user.username}'a verildi.`);

            if (logChannelId) {
                const autoRoleLog = member.guild.channels.cache.get(logChannelId);
                if (autoRoleLog) {
                    const embed = new EmbedBuilder()
                        .setTitle('Otomatik Rol Verildi')
                        .setDescription(`Rol: <@&${role.id}>\nKullanıcı: <@${member.user.id}>`)
                        .setColor('#00FF00');
                        autoRoleLog.send({ embeds: [embed] }).catch(console.error);
                }
            }
        } catch (error) {
            console.error(`Rol verilirken hata oluştu: ${error}`);

            if (logChannelId) {
                const autoRoleLog = member.guild.channels.cache.get(logChannelId);
                if (autoRoleLog) {
                    autoRoleLog.send(`Rol verilirken hata oluştu: ${error}`).catch(console.error);
                }
            }
        }
    },
};