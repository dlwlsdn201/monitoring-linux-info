import express from "express";
import { config } from "dotenv";
import cors from "cors";
import routes from "./src/routes";
// const si = require('systeminformation'); // Uncomment if systeminformation is needed

config();

const app = express();
const port = process.env.PORT || 8000;

// Third-Party Middleware
app.use(cors());

// Routes
app.use("/status", routes.status);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
