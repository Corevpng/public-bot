// commands/points-add.js
const Database = require('better-sqlite3');
const db = new Database('./database/points.db');

module.exports = {
    data: {
        name: 'puan-ekle',
        description: 'Belirtilen kullanıcıya puan ekler.',
        options: [
            {
                name: 'user',
                type: 6, // USER
                description: 'Puan eklenecek kullanıcı',
                required: true,
            },
            {
                name: 'amount',
                type: 4, // INTEGER
                description: 'Eklenecek puan miktarı',
                required: true,
            },
        ],
    },
    async execute(interaction) {
        const userId = interaction.options.getUser('user').id;
        const amount = interaction.options.getInteger('amount');

        const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
        if (user) {
            db.prepare('UPDATE users SET points = points + ? WHERE id = ?').run(amount, userId);
        } else {
            db.prepare('INSERT INTO users (id, points) VALUES (?, ?)').run(userId, amount);
        }

        await interaction.reply(`Kullanıcıya ${amount} puan eklendi.`);
    },
};