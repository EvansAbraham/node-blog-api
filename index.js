import express from "express";
import bodyParser from "body-parser";
import usersRoute from "./routes/users.js"

const app = express();
const PORT = 4400;

app.use(bodyParser.json());

app.use('/users', usersRoute);

app.get('/', (req, res)=>{
    res.send("The server is working!");
});

app.listen(PORT, ()=>{console.log(`Server started running at port ${PORT}: http://localhost:${PORT}`)});