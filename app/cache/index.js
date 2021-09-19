const { Sequelize } = require('sequelize');

// Initialise the sequelize instance
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: process.env.DB_PORT,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging: false
    }
);

// Initialise the cache with the sequelize instance and the database models
const cache = {};
cache.Sequelize = Sequelize;
cache.sequelize = sequelize;

const {Input, Translation} = require("./cache.model.js")(sequelize);
cache.input = Input;
cache.translation = Translation;

// Create the database connection
const connect_cache = async (options) => {
    function sleep(time) {
        return new Promise((resolve) => {
            setTimeout(resolve, time);
        })
    }

    while(true) {
        try {
            await sequelize.sync(options);
            break;
        } catch(err) {
            await sleep(1000);
        }
    }
}

module.exports = { cache, connect_cache };
