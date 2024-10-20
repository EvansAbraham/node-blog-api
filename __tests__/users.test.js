import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from '../routes/users.js';

const app = express();
app.use(bodyParser.json());
app.use('/people', usersRoutes);

describe('Users API', () => {
    it('should create a new user', async () => {
        const response = await request(app)
            .post('/people')
            .send({ username: 'newUser', age: 25 });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User created');
        expect(response.body.user.username).toBe('newUser');
        expect(response.body.user.age).toBe(25);
    });

    it('should get all users', async () => {
        const response = await request(app).get('/people');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should delete a user by ID', async () => {
        const createResponse = await request(app)
            .post('/people')
            .send({ username: 'deleteUser', age: 30 });
        
        const userId = createResponse.body.user.id;

        const response = await request(app).delete(`/people/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User deleted successfully');
    });

    it('should return 404 for a non-existent user', async () => {
        const response = await request(app).get(`/people/someNonExistentId`);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
    });
});
