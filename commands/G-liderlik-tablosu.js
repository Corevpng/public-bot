// commands/points-leaderboard.js
const Database = require('better-sqlite3');
const db = new Database('./database/points.db');

module.exports = {
    data: {
        name: 'liderlik-tablosu',
        description: 'Sunucudaki en yüksek puana sahip kullanıcıları listeler.',
    },
    async execute(interaction) {
        const leaderboard = db.prepare('SELECT * FROM users ORDER BY points DESC LIMIT 10').all();

        if (leaderboard.length === 0) {
            return interaction.reply('Henüz kimse puan kazanmamış.');
        }

        const leaderboardMessage = leaderboard.map((user, index) => `${index + 1}. <@${user.id}>: ${user.points} puan`).join('\n');
        await interaction.reply(`🏆 **Puan Lider Tablosu** 🏆\n\n${leaderboardMessage}`);
    },
};