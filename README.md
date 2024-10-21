# Users API

Welcome to the Users API! This API allows you to manage user data using a simple RESTful interface. It stores user information in a JSON file (`data/users.json`).

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [File Structure](#file-structure)

## Features

- Create, read, update, and delete user profiles
- User data is stored persistently in a JSON file
- Simple and intuitive RESTful API design

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/users-api.git
   cd users-api
   ```

2. Install the necessary packages:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

   The server will run on [http://localhost:4400](http://localhost:4400).

## Usage

You can interact with the API using tools like [Postman](https://www.postman.com/) or `curl`. 

## API Endpoints

### Base URL
```
http://localhost:4400/people
```

### Endpoints

- **GET /people**: Retrieve a list of all users.
- **POST /people**: Create a new user.  
  **Request Body**:
  ```json
  {
      "username": "string",
      "age": "number"
  }
  ```
- **GET /people/:id**: Retrieve a specific user by ID.
- **DELETE /people/:id**: Delete a user by ID.
- **PATCH /people/:id**: Update a user by ID.  
  **Request Body**:
  ```json
  {
      "username": "string",
      "age": "number"
  }
  ```

## File Structure

```
/users-api
├── data
│   └── users.json        # Stores user data
├── routes
│   └── users.js          # Defines user-related routes
├── controllers
│   └── users.js          # Contains logic for handling requests
├── index.js              # Main entry point of the API
├── package.json           # Project metadata and dependencies
├── package-lock.json      # Automatically generated for any operations where npm modifies either the node_modules directory, or package.json
└── README.md              # Documentation for the API
```
