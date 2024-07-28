
const Database = require('better-sqlite3');
const db = new Database('./database/points.db');

db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        points INTEGER DEFAULT 0,
        level INTEGER DEFAULT 1
    )
`).run();

console.log('Database initialized.');
db.close();