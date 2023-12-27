import express, { Application, Express, Request, Response } from "express";
import { validateEnv } from "./config/config";
import { dbConnect } from "./config/db";
import cors from "cors";

const app: Application = express();
const port: number = 4000;


// Validating Environment Variable
validateEnv();

// db connection
dbConnect();

app.use(express.json());

app.use(cors());

app.get('/test', (req: Request, res: Response) => {
    res.send("Server is running!")
});

app.listen(port, () => {
    console.log(`Server is listening on ${port}!`);
});