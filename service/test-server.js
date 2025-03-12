const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Test server running on port ${port}`);
}); 