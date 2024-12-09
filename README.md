Instructions to Set Up and Run the Project
1. Prerequisites

    Node.js installed on your system (recommended version: 16.x or higher).
    SQLite installed for database management (or you can use the sqlite3 Node.js package).
    A text editor or IDE (e.g., VS Code).

2. Backend Setup

    Navigate to the backend folder:

cd backend

Install dependencies:

npm install

Set up environment variables:

    Create a .env file in the backend directory.
    Add the following:

    PORT=5000
    JWT_SECRET=your_jwt_secret_key
    DB_FILE=library.sqlite

Migrate the database: Ensure the database file and schema are set up by running:

node scripts/migrate.js

Run the server:

node server.js

The backend will be available at http://localhost:5000


4. Example API Requests and Responses
Librarian APIs

    Create a new library user
        Request:

POST /api/users
Content-Type: application/json
Authorization: Bearer <admin_jwt_token>

{
  "email": "user1@example.com",
  "password": "password123",
  "role": "user"
}

Response:

    {
      "message": "User created successfully",
      "user": {
        "id": 1,
        "email": "user1@example.com",
        "role": "user"
      }
    }

View all book borrow requests

    Request:

GET /api/borrow-requests
Authorization: Bearer <admin_jwt_token>

Response:

    [
      {
        "id": 1,
        "user_id": 2,
        "book_id": 3,
        "start_date": "2024-12-10",
        "end_date": "2024-12-15",
        "status": "pending"
      }
    ]

Approve a borrow request

    Request:

PUT /api/borrow-requests/1/approve
Authorization: Bearer <admin_jwt_token>

Response:

    {
      "message": "Borrow request approved"
    }

View a user’s borrow history

    Request:

GET /api/users/2/history
Authorization: Bearer <admin_jwt_token>

Response:

        [
          {
            "id": 1,
            "book_id": 3,
            "borrowed_on": "2024-12-10",
            "returned_on": null
          }
        ]

Library User APIs

    Get list of books
        Request:

GET /api/books
Authorization: Bearer <user_jwt_token>

Response:

    [
      {
        "id": 1,
        "title": "1984",
        "author": "George Orwell",
        "quantity": 3
      },
      {
        "id": 2,
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "quantity": 1
      }
    ]

Submit a borrow request

    Request:

POST /api/borrow-requests
Content-Type: application/json
Authorization: Bearer <user_jwt_token>

{
  "book_id": 1,
  "start_date": "2024-12-20",
  "end_date": "2024-12-25"
}

Response:

    {
      "message": "Borrow request submitted successfully",
      "request_id": 5
    }

View personal borrow history

    Request:

GET /api/users/borrow-history
Authorization: Bearer <user_jwt_token>

Response:

        [
          {
            "id": 1,
            "book_id": 1,
            "borrowed_on": "2024-12-20",
            "returned_on": null
          }
        ]

5. Notes

    JWT Tokens: After login, include the token in the Authorization header of all subsequent API requests as Bearer <token>.
    Environment Variables: Adjust .env as per your environment, especially for sensitive data like JWT_SECRET.

6. Download Borrow History (Bonus Feature)

    Endpoint:

    GET /api/users/borrow-history/download
    Authorization: Bearer <user_jwt_token>

    Response: The server will send a CSV file (borrow_history.csv) containing the user’s borrowing history.

Testing the Application

    Login
        Use /api/auth/login to obtain tokens for both admin and user.

    Librarian Workflow
        Use the Admin Dashboard to create users, view and approve requests, and check user borrow histories.

    User Workflow
        Use the User Dashboard to view books, borrow them, and see their borrow history.
