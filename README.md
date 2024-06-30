# Todo List Backend Application

This is a backend application developed using Node.js and Express.js to manage a todo list. Users can perform CRUD operations on todo items, upload todo items from a CSV file, 
download the todo list in CSV format, and set a status flag for each todo item.

## Features

- CRUD operations on todo items.
- Upload todo items from a CSV file.
- Download the todo list in CSV format.
- Set and update the status flag for todo items.
- Filter todo list items based on their status.


## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- body-parser
- bcrypt
- jsonwebtoken
- dotenv
- csv-parser
- json2csv

### Project Setup

1. Initialize a new Node.js project:

   npm init -y
   nodemon index.js
   Add a dotenv file, for smooth running of this Application

## API ENDPOINT

Authentication
POST /users/register: Register a new user.
POST /users/login: Login and get a token.

Todo Operations
GET /todos: Fetch all todo items (protected).
GET /todos/:id: Fetch a single todo item by ID (protected).
POST /todos: Add a new todo item (protected).
PUT /todos/:id: Update an existing todo item (protected).
DELETE /todos/:id: Delete a todo item (protected).
POST /todos/upload: Upload todo items from a CSV file (protected).
GET /todos/download: Download the todo list in CSV format (protected).
GET /todos/filter?status=:status: Filter todo list items based on status (protected).

### Additional Tips

- Make sure to replace `your_token_here` with the actual token received after login.
- Customize the README to fit any additional specifics or customization in your project.
