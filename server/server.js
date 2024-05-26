import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./src/routes";
// const si = require('systeminformation'); // Uncomment if systeminformation is needed

config();

const app = express();
const port = process.env.PORT || 8000;

// [DB Config]
// PostgreSQL 연결 구성

app.use(bodyParser.json());

// Third-Party Middleware
app.use(cors());

// Routes
app.use("/status", routes.status);
app.use("/servers", routes.servers);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
