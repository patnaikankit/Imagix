import express, { Express, Request, Response } from "express";

const app: Express = express();
const port: number = 4000;

app.get('/', (req: Request, res: Response) => {
    res.send("Setup complete!")
});

app.listen(port, () => {
    console.log(`Server is listening on ${port}!`);
});