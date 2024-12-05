const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../../public')));

app.get('*', (req, res) => {
  console.log(`Request received for: ${req.url}`);
  const filePath = path.join(__dirname, '../../public/index.html');
  console.log(`Serving file: ${filePath}`);
  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
