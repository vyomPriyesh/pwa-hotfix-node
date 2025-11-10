import express from "express";
import connectDB from "./db/Connectdb.js";
import api from "./routes/api.js";
import cors from "cors";
import { sendResponse } from "./utils/response.js";

const app = express();
const port = 3000;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";
app.use(express.json());
app.use(cors());
connectDB(DATABASE_URL);

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
app.use("/api", api);
app.use((err, req, res, next) => {
  console.error(err); // log it
  return sendResponse(res, 500, {
    message: 'Something went wrong.',
    error_message: err.message
  }, false);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
