const fs = require('fs');
const path = require('path');
const { EmbedBuilder, PermissionsBitField, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Komutu çalıştırılamadı.', ephemeral: true });
            }
        } else if (interaction.isButton()) {
            if (interaction.customId === 'create_ticket') {
                const guild = interaction.guild;
                const settingsPath = path.resolve(__dirname, '../data/settings.json');
                const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));

                const category = guild.channels.cache.find(c => c.name === 'Tickets' && c.type === ChannelType.GuildCategory);
                const member = interaction.member;

                const ticketChannel = await guild.channels.create({
                    name: `ticket-${member.user.username}`,
                    type: ChannelType.GuildText,
                    parent: category ? category.id : null,
                    permissionOverwrites: [
                        {
                            id: guild.roles.everyone.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: member.user.id,
                            allow: [
                                PermissionsBitField.Flags.ViewChannel,
                                PermissionsBitField.Flags.SendMessages,
                            ],
                        },
                        ...(settings.ticketRole ? [{
                            id: settings.ticketRole,
                            allow: [
                                PermissionsBitField.Flags.ViewChannel,
                                PermissionsBitField.Flags.SendMessages,
                            ],
                        }] : [])
                    ],
                });

                const embed = new EmbedBuilder()
                    .setTitle('Ticket Kanalı')
                    .setDescription(`Bu kanal destek talepleriniz için oluşturulmuştur.Lütfen Etiket atarak yetkilileri rahatsız etmeyin.`)
                    .setColor('#00FF00');

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('close_ticket')
                            .setLabel('Ticket Kapat')
                            .setStyle(ButtonStyle.Danger)
                    );

                await ticketChannel.send({ embeds: [embed], components: [row] });
                await interaction.reply({ content: `Ticket kanalı oluşturuldu: ${ticketChannel}`, ephemeral: true });

                if (settings.logChannel) {
                    const logChannel = guild.channels.cache.get(settings.logChannel);
                    if (logChannel) {
                        const logEmbed = new EmbedBuilder()
                            .setTitle('Yeni Ticket Oluşturuldu')
                            .setDescription(`Ticket kanalı: ${ticketChannel}\nOluşturan: ${member.user.tag}`)
                            .setColor('#00FF00')
                            .setTimestamp();

                        logChannel.send({ embeds: [logEmbed] });
                    }
                }
            } else if (interaction.customId === 'close_ticket') {
                const guild = interaction.guild;
                const settingsPath = path.resolve(__dirname, '../data/settings.json');
                const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));

                if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) && !interaction.member.roles.cache.has(settings.ticketRole)) {
                    return interaction.reply({ content: 'Sadece Yetkililer Kapatabilir.', ephemeral: true });
                }

                const channel = interaction.channel;
                await channel.delete();
            }
        }
    },
};