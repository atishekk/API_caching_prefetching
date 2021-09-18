const express = require("express");
const app = express();

//take care of content-type - application/json
app.use(express.json());

const { connect_cache } = require("./cache");

//routes
app.get('/', (_, res) => {
    res.send('Codeyoung Translation Api v1.0');
});

const controller = require("./controller");
app.post("/", controller.Translation);


module.exports = { app, connect_cache };
