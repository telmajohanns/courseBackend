import express from 'express';
import pool from './lib/db.js';

const PORT = 4000;
const app = express();
//app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Get favorites
app.get('/favorites/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const getFavorites = await pool.query(
      `SELECT * FROM favorites WHERE user_name = $1`,
      [username]
    );
    console.log(username);
    res.json(getFavorites.rows);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

// Add to favorties
app.post('/favorites/:username&:acronym', async (req, res) => {
  const username = req.params.username;
  const acronym = req.params.acronym;
  try {
    const addFavorites = await pool.query(
      `INSERT INTO favorites(user_name, acronym) VALUES ($1, $2)`,
      [username, acronym]
    );
    res.json(addFavorites);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

app.get('/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const getUser = await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );
    res.json(getUser.rows);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

// Login
app.post('/login/:username&:password', async (req, res) => {
  const username = req.params.username;
  const password = req.params.password;

  try {
    const loginUser = await pool.query(
      `SELECT * FROM users WHERE username = $1 AND password = $2`,
      [username, password]
    );
    if (loginUser.rows.length < 1) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    } else {
      res.status(200).json({ message: 'Valid' });
      return;
    }
    res.json(loginUser.rows);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

// Signup
app.post('/signup/:username&:password', async (req, res) => {
  const username = req.params.username;
  const password = req.params.password;
  try {
    const signupUser = await pool.query(
      `INSERT INTO users(username, password) VALUES ($1, $2)`,
      [username, password]
    );
    res.json(signupUser);
  } catch (err) {
    console.error(err);
    res.json(-1);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
