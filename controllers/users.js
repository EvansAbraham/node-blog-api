import { v4 as uuid } from 'uuid';

let users = [];

export const getUsers = (req, res) => {
    console.log(`Users in the database: ${users}`);

    res.send(users);
}

export const createUser = (req, res) => {   
    const user = req.body;

    users.push({...user, id: uuid()});
    
    console.log(`User [${user.username}] added to the database.`);
    console.log(users);
    
    res.status(201).send({ message: "User created", user });
};

export const getUser = (req, res) => {
    const user = users.find((user) => user.id === req.params.id);
    
    if (user) {
        res.send({id: user.id, username: user.username, age: user.age });
        console.log(`Users in the database: ${users}`);
    } else {
        res.status(404).send({ message: "User not found" });
    }
};

export const deleteUser = (req, res) => { 
    console.log(`user with id ${req.params.id} has been deleted`);
    
    users = users.filter((user) => user.id !== req.params.id);
    res.send({ message: "User deleted successfully" });
};

export const updateUser = (req, res) => {
    const user = users.find((user) => user.id === req.params.id);
    
    if (user) {
        user.username = req.body.username;
        user.age = req.body.age;

        console.log(`Username has been updated to ${req.body.username}. Age has been updated to ${req.body.age}.`);
        
        res.send({ message: "User updated", user });
    } else {
        res.status(404).send({ message: "User not found" });
    }
};
