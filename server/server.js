const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(helmet());

app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'", 'http://127.0.0.1:5000'], // Add your local server URL
        // ... other directives
      },
    })
  );

// Create a new database connection
const db = new sqlite3.Database(':memory:');

// Create an expenses table in the database
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, amount REAL)');
});

// API route to get all expenses
app.get('/api/expenses', (req, res) => {
  db.all('SELECT * FROM expenses', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'An error occurred while fetching expenses' });
    } else {
      res.json(rows);
    }
  });
});

// API route to add a new expense
app.post('/api/expenses', (req, res) => {
  const { title, amount } = req.body;

  if (!title || !amount) {
    res.status(400).json({ error: 'Title and amount are required' });
    return;
  }

  db.run('INSERT INTO expenses (title, amount) VALUES (?, ?)', [title, amount], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'An error occurred while adding the expense' });
    } else {
      res.json({ success: true });
    }
  });
});
app.use(express.static('public'));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});