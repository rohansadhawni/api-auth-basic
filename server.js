require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const os = require('os'); // Import the os module

const app = express();
const port = process.env.PORT || 3000; // Take port from .env

// Middleware to parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection setup using environment variables
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + db.threadId);
});

// Registration route
app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    // Check if username or email already exists
    db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Server error', hostname: os.hostname() });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists', hostname: os.hostname() });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        const newUser = { username, password: hashedPassword, email };
        db.query('INSERT INTO users SET ?', newUser, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Server error', hostname: os.hostname() });
            }
            res.status(201).json({ message: 'User registered successfully', hostname: os.hostname() });
        });
    });
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Server error', hostname: os.hostname() });
        }
        if (results.length === 0) {
            return res.status(400).json({ message: 'Username or password is incorrect', hostname: os.hostname() });
        }

        const user = results[0];

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Username or password is incorrect', hostname: os.hostname() });
        }

        res.status(200).json({ message: 'Login successful', hostname: os.hostname() });
    });
});

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
