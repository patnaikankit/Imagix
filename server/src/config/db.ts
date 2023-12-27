import mongoose from "mongoose";
import { config } from "./config";

export const dbConnect = (): void => {
    mongoose.connect(config.dbUrl, {})
        .then(() => console.log("Database Successfully Connected!"))
        .catch((err) => {console.log(`Database Connection Error -> ${err}`);
        process.exit();
    });
}