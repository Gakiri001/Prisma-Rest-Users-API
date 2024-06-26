import express from "express";
import usersRouter from "./routes/users.route.js";
const app = express();
app.use(express.json());
app.use("/users", usersRouter);

app.listen(3000, () => {
  console.log("App running on port 3000");
});
