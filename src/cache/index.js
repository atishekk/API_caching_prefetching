const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: process.env.DB_PORT
    }
);

const cache = {};
cache.Sequelize = Sequelize;
cache.sequelize = sequelize;

const {Input, Translation} = require("./cache.model.js")(sequelize);
cache.input = Input;
cache.translation = Translation;

module.exports = cache;
