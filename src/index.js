require("dotenv").config();
const express = require("express");
const app = express();
//take care of content-type - application/json
app.use(express.json());

//initialise the cache
const cache = require("./cache");

//cache.sequelize.sync();
//for development
cache.sequelize.sync({force: true}).then(() => {
    console.log("Got the database")
}).catch(err => {
    console.log(err);
});
const port = process.env.NODE_DOCKER_PORT || 8080;

//routes
app.get('/', (_, res) => {
    res.send('Codeyoung Translation Api v1.0');
});

const controller = require("./controller");
app.post("/", controller.Translation);

app.listen(port, () => {
    console.log(`Started the server at http://localhost:${port}`);
})
