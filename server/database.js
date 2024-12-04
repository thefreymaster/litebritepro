import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open the database connection
const dbPromise = open({
    filename: './litebrite.db',
    driver: sqlite3.Database,
});

// Initialize the database
const initDB = async () => {
    const db = await dbPromise;
    await db.exec(`
        CREATE TABLE IF NOT EXISTS sessions (
            session_id TEXT PRIMARY KEY,
            grid TEXT
        )
    `);
    console.log('Database initialized.');
};

await initDB();

export default dbPromise;
