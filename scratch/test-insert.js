const { Client } = require('pg');
const { v4: uuidv4 } = require('uuid');

const client = new Client({
  connectionString: "postgresql://neondb_owner:npg_jvEMqQG4dDW9@ep-polished-butterfly-ank8dh4p-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require",
});

async function test() {
  await client.connect();
  const userId = 'test-user'; // Just for test
  const chatId = uuidv4();
  
  try {
    // Ensure user exists
    await client.query('INSERT INTO "User" (id, email, password) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING', [userId, 'test@example.com', 'pass']);
    
    const res = await client.query(
      'INSERT INTO "Chat" (id, title, "userId", "updatedAt") VALUES ($1, $2, $3, NOW()) RETURNING *',
      [chatId, 'Test Chat', userId]
    );
    console.log('Inserted Chat:', res.rows[0]);
    
    const chats = await client.query('SELECT * FROM "Chat"');
    console.log('All Chats:', chats.rows);
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}

test();
