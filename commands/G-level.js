// commands/level.js
const Database = require('better-sqlite3');
const db = new Database('./database/points.db');

module.exports = {
    data: {
        name: 'level',
        description: 'Belirtilen kullanıcının seviyesini görüntüler.',
        options: [
            {
                name: 'user',
                type: 6, // USER
                description: 'Seviyesi görüntülenecek kullanıcı',
                required: false,
            },
        ],
    },
    async execute(interaction) {
        const userId = interaction.options.getUser('user') ? interaction.options.getUser('user').id : interaction.user.id;
        const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);

        if (!user) {
            return interaction.reply('Kullanıcı bulunamadı.');
        }

        await interaction.reply(`<@${user.id}>: Seviye ${user.level}, Puan ${user.points}`);
    },
};