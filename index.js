const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send({ good: 'morning' });
});

app.listen(PORT, () => {
  console.log('Server has started on port:', PORT);
});
