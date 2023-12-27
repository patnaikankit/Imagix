// Setting up, configuring and validating common services and env variables.

import { config as conf } from "dotenv";
import Joi from "joi";
import path from "path";
import EnvConfig from "../types/EnvConfig";
import { OpenAI } from "openai";
import { v2 as cloudinarySetup } from "cloudinary";

conf({path: path.join(__dirname, "../../.env")});

// defining joi schema for validating the data the passed in env file along with custom messages if any of the following data is missing 
const envVarSchema = Joi.object()
    .keys({
        MONGO_URL: Joi.string().required().messages({"any.required": "Provide Mongodb Url"}),
        GPT_KEY: Joi.string().required().messages({"any.required": "Provide OpenAI API Key" }),
        CLOUDINARY_CLOUD_NAME: Joi.string().required().messages({"any.required": "Provide Cloudinaty Cloud Name"}),
        CLOUDINARY_API_KEY: Joi.string().required().messages({"any.required": "Provide Cloudinaty Cloud API Key"}),
        CLOUDINARY_API_SECRET: Joi.string().required().messages({"any.required": "Provide Cloudinaty Cloud API Secret"}),
    })
    .unknown();

// prefs will validate the data in env file against the schema above
// if everything is correct it will destructure the data in envvars and if not an error messages will use "key" as the label for the environment variables.
const { value: envVars, error } = envVarSchema.prefs({errors: {label: "key"}}).validate(process.env)

if(error){
    throw new Error(`ENV SETUP Error ${error.message}`);
}

export const config: EnvConfig = {
    dbUrl: envVars.MONGO_URL,
    gptKey: envVars.GPT_KEY,
    cloudinary: {
        name: envVars.CLOUDINARY_CLOUD_NAME,
        apiKey: envVars.CLOUDINARY_API_KEY,
        apiSecret: envVars.CLOUDINARY_API_SECRET
    },
};


// wrapping the validated data in a function for ease of use
export const validateEnv = (): void => {
    const { error } = envVarSchema.prefs({errors: {label: "key"}}).validate(process.env);
    if(error){
        throw new Error(`ENV SETUP Error ${error.message}`);
    }    
}


// OpenAI configuration
export const gpt = new OpenAI({
    apiKey: config.gptKey,
});


// Cloudinary configuration
cloudinarySetup.config({
    cloud_name: config.cloudinary.name,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
});

export const cloudinary = cloudinarySetup;