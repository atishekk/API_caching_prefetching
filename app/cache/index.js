const { Sequelize } = require('sequelize');


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
        }
    }
);

const cache = {};
cache.Sequelize = Sequelize;
cache.sequelize = sequelize;

const {Input, Translation} = require("./cache.model.js")(sequelize);
cache.input = Input;
cache.translation = Translation;

const connect_cache = async (options) => {
    function sleep(time) {
        return new Promise((resolve) => {
            setTimeout(resolve, time);
        })
    }

    while(true) {
        try {
            await sequelize.sync(options);
            console.log("Connected with the cache");
            break;
        } catch(err) {
            await sleep(1000);
        }
    }
}

module.exports = { cache, connect_cache };
