
const express = require('express');
const dotenv = require('dotenv');
const createCoworkingManager = require('./api/createCoworkingManager');

dotenv.config({ path: '.env.development.local' });

console.log('POSTGRES_URL:', process.env.POSTGRES_URL);

const app = express();
const port = 3000;

app.get('/api/createCoworkingManager', createCoworkingManager);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});