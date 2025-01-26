const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve client1.html when accessing /client1
app.get('/client1', (req, res) => {
  res.sendFile(path.join(Simple-HTTP-Assignment, 'client1.html'));
});

// Serve client2.html when accessing /client2
app.get('/client2', (req, res) => {
  res.sendFile(path.join(Simple-HTTP-Assignment, 'client2.html'));
});

// Serve static files (like images, CSS, JS)
app.use(express.static(path.join(Simple-HTTP-Assignment, 'public')));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
