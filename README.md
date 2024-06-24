# Express Auth API

A simple authentication API built with Express and MySQL.

## Features

- User registration with hashed passwords
- User login with password verification
- Basic error handling

## Requirements

- Node.js
- npm (Node Package Manager)
- MySQL

## Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/rohansadhawni/api-auth-basic.git
    cd api-auth-basic
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure the environment variables**:
    - Copy the `.env.example` file to create a new `.env` file:
        ```bash
        cp .env.example .env
        ```
    - Update the `.env` file with your database credentials and desired port:
        ```plaintext
        DB_HOST=your_database_host
        DB_USER=your_database_user
        DB_PASSWORD=your_database_password
        DB_NAME=your_database_name
        PORT=3000
        ```

4. **Set up the MySQL database**:
    - Create a new MySQL database and user, and grant the user access to the database.
    - Create the `users` table with the following structure:
        ```sql
        CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        ```

## Running the Application

- **Start the server**:
    ```bash
    npm start
    ```
    The server will start and run on the port specified in your `.env` file (default is 3000).

- **Development mode**:
    ```bash
    npm run dev
    ```
    This will start the server with `nodemon` which will automatically restart the server on file changes.

## API Endpoints

### Register a new user

- **URL**: `/register`
- **Method**: `POST`
- **Body Parameters**:
    - `username`: string (required)
    - `password`: string (required)
    - `email`: string (required)
- **Success Response**:
    - **Code**: `201 Created`
    - **Content**: `{ "message": "User registered successfully", "hostname": "your_hostname" }`
- **Error Responses**:
    - **Code**: `400 Bad Request`
    - **Content**: `{ "message": "Username or email already exists", "hostname": "your_hostname" }`
    - **Code**: `500 Internal Server Error`
    - **Content**: `{ "message": "Server error", "hostname": "your_hostname" }`

### Login a user

- **URL**: `/login`
- **Method**: `POST`
- **Body Parameters**:
    - `username`: string (required)
    - `password`: string (required)
- **Success Response**:
    - **Code**: `200 OK`
    - **Content**: `{ "message": "Login successful", "hostname": "your_hostname" }`
- **Error Responses**:
    - **Code**: `400 Bad Request`
    - **Content**: `{ "message": "Username or password is incorrect", "hostname": "your_hostname" }`
    - **Code**: `500 Internal Server Error`
    - **Content**: `{ "message": "Server error", "hostname": "your_hostname" }`

## License

This project is licensed under the ISC License.
