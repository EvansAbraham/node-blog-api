import express from "express";
import bodyParser from "body-parser";
import usersRoutes from "./routes/users.js";

const app = express();
const PORT = 4400;

app.use(bodyParser.json());

app.use("/people", usersRoutes);
app.get("/", (req, res) => res.send("Welcome to the Users API!"));
app.all("*", (req, res) => res.send("You've tried reaching a route that doesn't exist."));

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
}

export default app;
