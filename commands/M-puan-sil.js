// commands/points-remove.js
const Database = require('better-sqlite3');
const db = new Database('./database/points.db');

module.exports = {
    data: {
        name: 'puan-sil',
        description: 'Belirtilen kullanıcının puanını azaltır.',
        options: [
            {
                name: 'user',
                type: 6, // USER
                description: 'Puanı azaltılacak kullanıcı',
                required: true,
            },
            {
                name: 'amount',
                type: 4, // INTEGER
                description: 'Azaltılacak puan miktarı',
                required: true,
            },
        ],
    },
    async execute(interaction) {
        const userId = interaction.options.getUser('user').id;
        const amount = interaction.options.getInteger('amount');

        const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
        if (user) {
            db.prepare('UPDATE users SET points = points - ? WHERE id = ?').run(amount, userId);
        } else {
            return interaction.reply('Kullanıcı bulunamadı.');
        }

        await interaction.reply(`Kullanıcının puanı ${amount} azaltıldı.`);
    },
};