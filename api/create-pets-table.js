
const { sql } = require('@vercel/postgres');
require('dotenv').config({ path: '.env.development.local' });

module.exports = async function handler(req, res) {
  try {
    if (!process.env.POSTGRES_URL) {
      throw new Error('Missing POSTGRES_URL environment variable');
    }

    const result = await sql`CREATE TABLE Pets ( Name varchar(255), Owner varchar(255) );`;
    return res.status(200).json({ result });
  } catch (error) {
    console.error('Error creating table:', error);
    return res.status(500).json({ error });
  }
};