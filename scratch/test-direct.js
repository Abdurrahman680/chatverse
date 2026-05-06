const { Client } = require('pg');

const client = new Client({
  connectionString: "postgresql://neondb_owner:npg_jvEMqQG4dDW9@ep-polished-butterfly-ank8dh4p.us-east-1.aws.neon.tech/neondb?sslmode=require",
});

client.connect()
  .then(() => {
    console.log('Direct connection successful');
  })
  .catch(err => {
    console.error('Direct connection failed:', err.message);
  })
  .finally(() => {
    client.end();
  });
