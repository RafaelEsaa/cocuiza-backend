const config = {
    SERVER: {
        PORT: process.env.PORT || "4000"
    },
    VERSION: {
        API: "v1",
        PREFIX: "api"
    },
    MONGO: {
        URI: process.env.MONGO_URI || "mongodb://localhost:27017/cocuiza"
    },
    JWT: {
        SECRET: process.env.JWT_SECRET || "cocuiza"
    }
};

module.exports = config;