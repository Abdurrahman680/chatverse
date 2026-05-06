const { Client } = require('pg');

const client = new Client({
  connectionString: "postgresql://neondb_owner:npg_jvEMqQG4dDW9@ep-polished-butterfly-ank8dh4p-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require",
});

client.connect()
  .then(() => {
    return client.query('SELECT id, title FROM "Chat"');
  })
  .then(res => {
    console.log('Chats in DB:', res.rows);
  })
  .catch(err => {
    console.error('Error:', err.message);
  })
  .finally(() => {
    client.end();
  });
