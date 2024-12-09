const db = require('../models/database');

exports.createBorrowRequest = (req, res) => {
    const { userId, bookId, startDate, endDate } = req.body;

    // Check if book is available in the given period
    db.all(
        `SELECT * FROM borrow_requests WHERE book_id = ? AND status = 'Approved' 
         AND (start_date <= ? AND end_date >= ?)`,
        [bookId, endDate, startDate],
        (err, rows) => {
            if (err) return res.status(500).json({ error: 'Error checking book availability' });
            if (rows.length > 0) {
                return res.status(400).json({ error: 'Book already borrowed during this period' });
            }

            // Create borrow request
            db.run(
                'INSERT INTO borrow_requests (user_id, book_id, start_date, end_date) VALUES (?, ?, ?, ?)',
                [userId, bookId, startDate, endDate],
                function (err) {
                    if (err) return res.status(500).json({ error: 'Failed to create borrow request' });
                    res.status(201).json({ requestId: this.lastID });
                }
            );
        }
    );
};
