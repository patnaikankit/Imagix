// types for env configuration

type EnvConfig = {
    dbUrl: string,
    gptKey: string,
    cloudinary: {
        name: string,
        apiKey: string,
        apiSecret: string
    };
};

export default EnvConfig;