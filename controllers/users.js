import { v4 as uuid } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataFilePath = path.join(__dirname, '../data/users.json');

// Utility function to read users from the JSON file
const readUsersFromFile = () => {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};

// Utility function to write users to the JSON file
const writeUsersToFile = (users) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
};

export const getUsers = (req, res) => {
    const users = readUsersFromFile();
    console.log(`Users in the database: ${users}`);
    res.send(users);
};

export const createUser = (req, res) => {   
    const user = req.body;
    const users = readUsersFromFile();
    
    const newUser = { ...user, id: uuid() };
    users.push(newUser);
    
    writeUsersToFile(users);
    
    console.log(`User [${user.username}] added to the database.`);
    res.status(201).send({ message: "User created", user: newUser });
};

export const getUser = (req, res) => {
    const users = readUsersFromFile();
    const user = users.find((user) => user.id === req.params.id);
    
    if (user) {
        res.send({ id: user.id, username: user.username, age: user.age });
        console.log(`Users in the database: ${users}`);
    } else {
        res.status(404).send({ message: "User not found" });
    }
};

export const deleteUser = (req, res) => { 
    const users = readUsersFromFile();
    const updatedUsers = users.filter((user) => user.id !== req.params.id);
    
    if (updatedUsers.length === users.length) {
        return res.status(404).send({ message: "User not found" });
    }
    
    writeUsersToFile(updatedUsers);
    console.log(`User with id ${req.params.id} has been deleted`);
    
    res.send({ message: "User deleted successfully" });
};

export const updateUser = (req, res) => {
    const users = readUsersFromFile();
    const user = users.find((user) => user.id === req.params.id);
    
    if (user) {
        user.username = req.body.username;
        user.age = req.body.age;

        writeUsersToFile(users);
        
        console.log(`Username has been updated to ${req.body.username}. Age has been updated to ${req.body.age}.`);
        res.send({ message: "User updated", user });
    } else {
        res.status(404).send({ message: "User not found" });
    }
};
