const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 8008;

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'Invalid or missing URLs' });
  }

  try {
    const uniqueNumbers = await fetchUniqueNumbersFromURLs(urls);
    res.json({ numbers: uniqueNumbers });
  } catch (error) {
    console.error('Error processing URLs:', error.message);
    res.status(500).json({ error: 'Error processing URLs' });
  }
});

async function fetchUniqueNumbersFromURLs(urls) {
  const uniqueNumbers = new Set();

  const requests = urls.map(async (url) => {
    try {
      const response = await axios.get(url, { timeout: 500 });
      const data = response.data.numbers;
      if (Array.isArray(data)) {
        data.forEach((number) => {
          uniqueNumbers.add(number);
        });
      }
    } catch (error) {
      console.error(`Error retrieving data from ${url}:`, error.message);
    }
  });

  await Promise.all(requests);

  return Array.from(uniqueNumbers).sort((a, b) => a - b);
}

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
