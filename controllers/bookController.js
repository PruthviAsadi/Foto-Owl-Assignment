const db = require('../models/database');

exports.getBooks = (req, res) => {
    db.all('SELECT * FROM books', (err, rows) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch books' });
        res.status(200).json(rows);
    });
};
