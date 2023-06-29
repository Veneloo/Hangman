// server.js
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.get('/getword', async (req, res) => {
  try {
    const response = await fetch('https://api.api-ninjas.com/v1/randomword', {
      method: 'GET',
      headers: {
        'X-Api-Key': process.env.API_KEY
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching the word' });
  }
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
