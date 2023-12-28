import express, { Application, Express, Request, Response } from "express";
import { validateEnv } from "./config/config";
import { dbConnect } from "./config/db";
import path from "path";
import cors from "cors";
import { imageRouter } from "./routes/image.route";

const app: Application = express();
const port: number = 4000;


// Validating Environment Variable
validateEnv();

// db connection
dbConnect();

app.use(express.json());

app.use(cors());

app.use("/api/image", imageRouter)

app.get('/test', (req: Request, res: Response) => {
    res.send("Server is running!")
});

app.listen(port, () => {
    console.log(`Server is listening on ${port}!`);
});