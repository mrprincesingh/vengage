import express from "express";
import { config } from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import contact from "./routes/contactRoute.js";
import { ErrorMiddleware } from "./middleware/Error.js";

config({
  path: "./config/config.env",
});

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) =>
  res.send(
    `<h1>Site is Working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
  )
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/v1/", contact);
app.use(ErrorMiddleware);

export default app;
