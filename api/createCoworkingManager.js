const { sql } = require('@vercel/postgres');
require('dotenv').config({ path: '.env.development.local' });

module.exports = async function handler(req, res) {
  try {
    if (!process.env.POSTGRES_URL) {
      throw new Error('Missing POSTGRES_URL environment variable');
    }

    // Crear tabla sites
    await sql`CREATE TABLE IF NOT EXISTS sites (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      capacity INTEGER NOT NULL
    );`;

    // Crear tabla rooms
    await sql`CREATE TABLE IF NOT EXISTS rooms (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      capacity INTEGER NOT NULL,
      site_id INTEGER NOT NULL,
      FOREIGN KEY (site_id) REFERENCES sites(id)
    );`;

    // Crear tabla workspaces
    await sql`CREATE TABLE IF NOT EXISTS workspaces (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      type VARCHAR(255) NOT NULL,
      capacity INTEGER NOT NULL,
      room_id INTEGER NOT NULL,
      FOREIGN KEY (room_id) REFERENCES rooms(id)
    );`;

    // Crear tabla users
    await sql`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(255) NOT NULL
    );`;

    // Crear tabla sessions
    await sql`CREATE TABLE IF NOT EXISTS sessions (
      id SERIAL PRIMARY KEY,
      start_date_time TIMESTAMP NOT NULL,
      end_date_time TIMESTAMP NOT NULL,
      capacity INTEGER NOT NULL,
      description VARCHAR(255) NOT NULL,
      workspace_id INTEGER NOT NULL,
      FOREIGN KEY (workspace_id) REFERENCES workspaces(id)
    );`;

    // Crear tabla reservations
    await sql`CREATE TABLE IF NOT EXISTS reservations (
      id SERIAL PRIMARY KEY,
      workspace_id INTEGER NOT NULL,
      session_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      start_date_time TIMESTAMP NOT NULL,
      end_date_time TIMESTAMP NOT NULL,
      FOREIGN KEY (workspace_id) REFERENCES workspaces(id),
      FOREIGN KEY (session_id) REFERENCES sessions(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );`;

    return res.status(200).json({ message : 'Tables created successfully' });
  } catch (error) {
    console.error('Error creating table:', error);
    return res.status(500).json({ error });
  }
};